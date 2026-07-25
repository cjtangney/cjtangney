"use client"

import { useEffect, useRef, useState } from "react"
import { Minus, Square, X, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { getApp } from "@/lib/apps"
import { useViewportSize } from "@/hooks/use-viewport-size"
import type { WindowState, WindowManager } from "@/hooks/use-window-manager"
import { StyledString } from "next/dist/build/swc/types"

type Props = {
  win: WindowState
  manager: WindowManager
  active: boolean
}

const MIN_W = 320
const MIN_H = 220
/** height of the fixed TopPanel (h-9 = 36px); maximized windows sit below it */
const TOP_BAR = 36
/** height of the window's own title bar (h-9) */
const TITLE_BAR = 36

export function Window({ win, manager, active }: Props) {
  const app = getApp(win.appId)
  const { Component, Icon } = app
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)
  const resizeRef = useRef<{
    startX: number
    startY: number
    w: number
    h: number
    axis: "x" | "y" | "xy"
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [overflow, setOverflow] = useState({ top: false, bottom: false })
  const [minWidth, setMinwidth] = useState('');
  const viewport = useViewportSize()

  useEffect(() => {
    if (win.minWidth) {
      setMinwidth(`md:min-w-[var(--min-width)]`);
    }
  }, [win.minWidth])

  // Track vertical scroll position so we can fade the content edges when there's
  // off-screen content above/below.
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      setOverflow({
        top: scrollTop > 1,
        bottom: scrollTop + clientHeight < scrollHeight - 1,
      })
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [win.minimized, win.maximized, win.width, win.height])

  // For fit-to-content apps (e.g. About), grow the window's height to show all
  // of its content. We track the content's natural scrollHeight (independent of
  // the window's current height) and resize only when that content height
  // actually changes — so it recalculates on reflow but won't fight a manual
  // resize.
  const { resize } = manager
  const lastContentHeight = useRef(0)
  useEffect(() => {
    if (!app.fitContent || win.maximized) return
    // Measure the inner content's intrinsic height (the child isn't height-
    // constrained inside the overflow-auto wrapper), independent of the
    // window's own height — so this won't feed back on itself.
    const wrapper = contentRef.current
    const child = wrapper?.firstElementChild as HTMLElement | null
    if (!wrapper || !child) return
    const measure = () => {
      const content = child.offsetHeight
      // Ignore 0 — that happens when the content is detached (e.g. the window is
      // minimized), and we must not collapse the stored height to nothing.
      if (content === 0 || content === lastContentHeight.current) return
      lastContentHeight.current = content
      // Derive the real chrome height (title bar + all borders) by comparing the
      // rendered window box to its inner content area, so the content fits with
      // no leftover scrollbar regardless of border widths.
      const container = containerRef.current
      const chrome = container ? container.offsetHeight - wrapper.clientHeight : TITLE_BAR
      resize(win.id, win.width, Math.ceil(chrome + content) + 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(child)
    return () => ro.disconnect()
  }, [app.fitContent, win.maximized, win.minimized, win.id, win.width, resize])

  // Move keyboard focus into a window when it's opened/raised, so keyboard
  // users don't get left behind on the launcher.
  const { pendingFocusId, clearPendingFocus } = manager
  useEffect(() => {
    if (pendingFocusId === win.id) {
      containerRef.current?.focus()
      clearPendingFocus()
    }
  }, [pendingFocusId, win.id, clearPendingFocus])

  // dragging via title bar
  useEffect(() => {
    if (!dragging) return
    // Prevent accidental text selection across the page while dragging/resizing.
    const prevUserSelect = document.body.style.userSelect
    document.body.style.userSelect = "none"
    function onMove(e: PointerEvent) {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        const nextX = dragRef.current.winX + dx
        const nextY = Math.max(0, dragRef.current.winY + dy)
        manager.move(win.id, nextX, nextY)
      } else if (resizeRef.current) {
        const r = resizeRef.current
        const dw = e.clientX - r.startX
        const dh = e.clientY - r.startY
        const width = r.axis === "y" ? r.w : Math.max(MIN_W, r.w + dw)
        const height = r.axis === "x" ? r.h : Math.max(MIN_H, r.h + dh)
        manager.resize(win.id, width, height)
      }
    }
    function onUp() {
      dragRef.current = null
      resizeRef.current = null
      setDragging(false)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      document.body.style.userSelect = prevUserSelect
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [dragging, manager, win.id])

  if (win.minimized) return null

  const maximized = win.maximized

  // Clamp the rendered geometry to the viewport so a window stays fully visible
  // (and its content remains scrollable) when the viewport shrinks — especially
  // vertically. This is non-destructive: win.x/y/width/height are untouched, so
  // the window springs back to its real size when the viewport grows again.
  const M = 8
  // The usable area is bounded by the top panel above and the dock below.
  const bottomBound = viewport.height
  const maxW = Math.max(MIN_W, viewport.width - M * 2)
  const maxH = Math.max(MIN_H, bottomBound - TOP_BAR - M)
  const dispW = Math.min(win.width, maxW)
  const dispH = Math.min(win.height, maxH)
  const dispX = Math.min(Math.max(win.x, M), Math.max(M, viewport.width - dispW - M))
  const dispY = Math.min(
    Math.max(win.y, TOP_BAR + M),
    Math.max(TOP_BAR + M, bottomBound - dispH),
  )

  const geometry = maximized
    ? {
      left: 0,
      top: TOP_BAR,
      width: "100%",
      height: `calc(100% - ${TOP_BAR}px)`,
    }
    : { left: dispX, top: dispY, width: dispW, height: dispH }
  
  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label={app.title}
      tabIndex={-1}
      onPointerDown={() => manager.focus(win.id)}
      className={cn(
        "absolute flex flex-col overflow-hidden border border-border bg-card/95 shadow-2xl outline-none backdrop-blur-xl",
        minWidth,
        maximized ? "rounded-none" : "rounded-xl",
        active ? "ring-1 ring-primary/40" : "opacity-[0.98]",
      )}
      style={{
        ...geometry,
        zIndex: win.z,
        '--min-width': `${win.minWidth}px`,
      } as React.CSSProperties | Record<string, string>}
    >
      {/* title bar */}
      <div
        onPointerDown={(e) => {
          if (e.button !== 0 || maximized) return
          manager.focus(win.id)
          dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            winX: dispX,
            winY: dispY,
          }
          setDragging(true)
        }}
        onDoubleClick={() => manager.toggleMaximize(win.id)}
        className={cn(
          "no-select flex h-9 shrink-0 items-center gap-2 border-b border-border px-3",
          maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing",
          active ? "bg-secondary/80" : "bg-secondary/40",
        )}
      >
        <span
          className="grid size-5 place-items-center rounded-md"
          style={{ backgroundColor: `color-mix(in oklch, ${app.accent} 30%, transparent)` }}
        >
          <Icon className="size-3.5" />
        </span>
        <span className="truncate font-mono text-xs text-muted-foreground">
          {app.title}
        </span>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            aria-label="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => manager.minimize(win.id)}
            className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            aria-label={maximized ? "Restore" : "Maximize"}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => manager.toggleMaximize(win.id)}
            className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            {maximized ? <Copy className="size-3" /> : <Square className="size-3" />}
          </button>
          <button
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => manager.close(win.id)}
            className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* content */}
      <div className="relative min-h-0 flex-1">
        <div ref={contentRef} className="h-full overflow-auto scroll-pb-6 scroll-pt-2">
          <Component />
        </div>
        {overflow.top && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-card to-transparent"
            aria-hidden
          />
        )}
        {overflow.bottom && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent"
            aria-hidden
          />
        )}
      </div>

      {/* resize handles: right edge (X), bottom edge (Y), corner (both) */}
      {!maximized &&
        (["x", "y", "xy"] as const).map((axis) => (
          <div
            key={axis}
            onPointerDown={(e) => {
              if (e.button !== 0) return
              e.stopPropagation()
              manager.focus(win.id)
              resizeRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                w: dispW,
                h: dispH,
                axis,
              }
              setDragging(true)
            }}
            className={cn(
              "absolute",
              axis === "x" && "right-0 top-9 bottom-2 w-1.5 cursor-ew-resize",
              axis === "y" && "bottom-0 left-2 right-2 h-1.5 cursor-ns-resize",
              axis === "xy" && "bottom-0 right-0 size-3 cursor-nwse-resize",
            )}
            aria-hidden
          />
        ))}
    </div>
  )
}
