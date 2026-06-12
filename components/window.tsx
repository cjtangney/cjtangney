"use client"

import { useEffect, useRef, useState } from "react"
import { Minus, Square, X, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { getApp } from "@/lib/apps"
import { useViewportSize } from "@/hooks/use-viewport-size"
import type { WindowState, WindowManager } from "@/hooks/use-window-manager"

type Props = {
  win: WindowState
  manager: WindowManager
  active: boolean
}

const MIN_W = 320
const MIN_H = 220
/** height of the fixed TopPanel (h-9 = 36px); maximized windows sit below it */
const TOP_BAR = 36
/** space reserved at the bottom for the dock; windows act like they have a
 *  taskbar there and never extend below it */
const DOCK_RESERVE = 80
/** height of the window's own title bar (h-9) */
const TITLE_BAR = 36

export function Window({ win, manager, active }: Props) {
  const app = getApp(win.appId)
  const { Component, Icon } = app
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)
  const resizeRef = useRef<{ startX: number; startY: number; w: number; h: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const viewport = useViewportSize()

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
      if (content === lastContentHeight.current) return
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
  }, [app.fitContent, win.maximized, win.id, win.width, resize])

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
    function onMove(e: PointerEvent) {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        const nextX = dragRef.current.winX + dx
        const nextY = Math.max(0, dragRef.current.winY + dy)
        manager.move(win.id, nextX, nextY)
      } else if (resizeRef.current) {
        const dw = e.clientX - resizeRef.current.startX
        const dh = e.clientY - resizeRef.current.startY
        manager.resize(
          win.id,
          Math.max(MIN_W, resizeRef.current.w + dw),
          Math.max(MIN_H, resizeRef.current.h + dh),
        )
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
  const bottomBound = viewport.height - DOCK_RESERVE
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
        height: `calc(100% - ${TOP_BAR + DOCK_RESERVE}px)`,
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
        maximized ? "rounded-none" : "rounded-xl",
        active ? "ring-1 ring-primary/40" : "opacity-[0.98]",
      )}
      style={{ ...geometry, zIndex: win.z }}
    >
      {/* title bar */}
      <div
        onPointerDown={(e) => {
          if (maximized) return
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
      <div ref={contentRef} className="min-h-0 flex-1 overflow-auto">
        <Component />
      </div>

      {/* resize handle */}
      {!maximized && (
        <div
          onPointerDown={(e) => {
            e.stopPropagation()
            manager.focus(win.id)
            resizeRef.current = {
              startX: e.clientX,
              startY: e.clientY,
              w: dispW,
              h: dispH,
            }
            setDragging(true)
          }}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          aria-hidden
        >
          <span className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-muted-foreground/50" />
        </div>
      )}
    </div>
  )
}
