"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme, type Theme } from "@/hooks/use-theme"
import { useBackgroundAnimationPaused } from "@/hooks/use-bg-animation"
import { cn } from "@/lib/utils"

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
]

export function SettingsApp() {
  const { theme, setTheme } = useTheme()
  const { paused, setPaused } = useBackgroundAnimationPaused()

  return (
    <div className="flex flex-col gap-4 p-6">
      <div>
        <h2 className="text-lg font-semibold">System Preferences</h2>
        <p className="text-sm text-muted-foreground">Choose how couchOS looks.</p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3">
        <div>
          <div className="text-sm font-medium">Appearance</div>
          <div className="font-mono text-xs text-muted-foreground">
            Light or dark theme
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Theme"
          className="flex items-center gap-1 rounded-lg border border-border bg-background/60 p-1"
        >
          {OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              role="radio"
              aria-checked={theme === value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                theme === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3">
        <div>
          <div className="text-sm font-medium">Pause background animation</div>
          <div className="font-mono text-xs text-muted-foreground">
            Stop the moving gradient
          </div>
        </div>

        <button
          role="switch"
          aria-checked={paused}
          aria-label="Pause background animation"
          onClick={() => setPaused(!paused)}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors",
            paused ? "bg-primary" : "bg-border",
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 size-5 rounded-full bg-background transition-transform",
              paused ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
      </div>
    </div>
  )
}
