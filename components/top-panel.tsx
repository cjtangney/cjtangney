"use client"

import { useEffect, useState } from "react"
import type { WindowManager } from "@/hooks/use-window-manager"
import { getApp } from "@/lib/apps"
import { cn } from "@/lib/utils"

export function TopPanel({ manager }: { manager: WindowManager }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const openWindows = manager.windows

  return (
    <header className="absolute inset-x-0 top-0 z-[9999] flex h-9 items-center gap-2 border-b border-border bg-background/70 px-3 text-xs backdrop-blur-xl">
      <span className="flex items-center gap-2 font-mono font-medium">
        <span className="size-4 rounded-sm eos-gradient" aria-hidden />
        <span className="hidden sm:inline">couchOS</span>
      </span>

      {/* open window pills (workspace indicator) */}
      <div className="ml-2 hidden items-center gap-1 sm:flex">
        {openWindows.map((w) => {
          const app = getApp(w.appId)
          const active = manager.activeId === w.id && !w.minimized
          return (
            <button
              key={w.id}
              onClick={() => manager.open(w.appId)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60",
                w.minimized && "opacity-50",
              )}
            >
              <app.Icon className="size-3" />
              {app.label}
            </button>
          )
        })}
      </div>

      <div className="ml-auto flex items-center font-mono text-muted-foreground">
        <time className="tabular-nums text-foreground" suppressHydrationWarning>
          {now
            ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "--:--"}
        </time>
      </div>
    </header>
  )
}
