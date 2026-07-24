"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useWindowManager } from "@/hooks/use-window-manager"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { useViewportSize } from "@/hooks/use-viewport-size"
import { useTheme } from "@/hooks/use-theme"
import { useBackgroundAnimationPaused } from "@/hooks/use-bg-animation"
import { cn } from "@/lib/utils"
import { TopPanel } from "@/components/top-panel"
import { Dock } from "@/components/dock"
import { Window } from "@/components/window"
import { MobileOS } from "@/components/mobile-os"
import { APPS } from "@/lib/apps"

export function Desktop() {
  const manager = useWindowManager()
  const isMobile = useIsMobile()
  const { height: viewportHeight } = useViewportSize()
  // Apply the persisted light/dark theme and background-animation preference at
  // the app root so they're active on load — not only once Settings mounts.
  useTheme()
  useBackgroundAnimationPaused()

  // Hide the desktop icon column when the viewport is too short to fit it. We
  // measure the column's real rendered bottom rather than estimating pixel
  // heights, so this stays correct regardless of styling/app count.
  const iconColumnRef = useRef<HTMLDivElement>(null)
  const [iconsFit, setIconsFit] = useState(true)
  useLayoutEffect(() => {
    const el = iconColumnRef.current
    if (!el) return
    const bottom = el.offsetTop + el.offsetHeight
    setIconsFit(bottom + 12 <= viewportHeight)
  }, [viewportHeight])

  // Greet with the About window only on the very first load, and only when we
  // land directly on a desktop-sized viewport. Resizing between mobile and
  // desktop must preserve whatever was already open, so the intro is guarded by
  // a ref that survives the layout switch.
  const introDone = useRef(false)
  useEffect(() => {
    if (isMobile === null || introDone.current) return
    introDone.current = true
    if (!isMobile && manager.windows.length === 0) {
      manager.open("about")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  // Avoid layout flash before we know the viewport.
  if (isMobile === null) {
    return <div className="h-dvh bg-background" />
  }

  if (isMobile) {
    return <MobileOS manager={manager} />
  }

  console.log(manager.windows);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <div className="wallpaper absolute inset-0" aria-hidden />
      <TopPanel manager={manager} />

      {/* desktop icons (top-left). Hidden when the viewport is too short to fit
          them — the dock provides the same apps. */}
      <div
        ref={iconColumnRef}
        className={cn(
          "absolute left-4 top-12 z-0 flex flex-col gap-4 transition-opacity",
          iconsFit ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!iconsFit}
      >
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              const win = manager.windows.find((w) => w.appId === app.id)
              if (!win || win.minimized) manager.open(app.id)
              else if (manager.activeId === win.id) manager.minimize(win.id)
              else manager.focus(win.id)
            }}
            className="group flex w-20 flex-col items-center gap-1 rounded-lg p-1.5 text-center transition-colors hover:bg-foreground/15"
            aria-label={`Open ${app.label}`}
          >
            <span
              className="grid size-12 place-items-center rounded-xl border border-border"
              style={{
                backgroundColor: `color-mix(in oklch, ${app.accent} 22%, var(--card))`,
              }}
            >
              <app.Icon className="size-6 text-foreground" />
            </span>
            <span className="rounded bg-background/75 px-1.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-sm">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* windows */}
      {manager.windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          manager={manager}
          active={manager.activeId === win.id}
        />
      ))}
    </main>
  )
}
