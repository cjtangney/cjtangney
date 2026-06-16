"use client"

import { APPS } from "@/lib/apps"
import type { WindowManager } from "@/hooks/use-window-manager"
import { cn } from "@/lib/utils"

export function Dock({ manager }: { manager: WindowManager }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9998] flex justify-center px-3">
      <div className="pointer-events-auto flex items-end gap-1.5 rounded-2xl border border-border bg-card/70 p-2 shadow-2xl backdrop-blur-xl">
        {APPS.map((app) => {
          const win = manager.windows.find((w) => w.appId === app.id)
          const isOpen = Boolean(win)
          return (
            <button
              key={app.id}
              onClick={() => {
                if (!win || win.minimized) manager.open(app.id)
                else if (manager.activeId === win.id) manager.minimize(win.id)
                else manager.focus(win.id)
              }}
              title={app.label}
              aria-label={`Open ${app.label}`}
              className="group relative flex flex-col items-center"
            >
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl border border-border transition-all duration-150 group-hover:-translate-y-1 group-hover:border-primary/50",
                )}
                style={{
                  backgroundColor: `color-mix(in oklch, ${app.accent} 22%, var(--card))`,
                }}
              >
                <app.Icon className="size-5 text-foreground" />
              </span>
              <span
                className={cn(
                  "absolute -bottom-1.5 size-1 rounded-full transition-opacity",
                  isOpen ? "bg-primary opacity-100" : "opacity-0",
                )}
                aria-hidden
              />
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 font-mono text-[11px] text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {app.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
