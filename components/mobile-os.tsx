"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { APPS, getApp } from "@/lib/apps";
import type { WindowManager } from "@/hooks/use-window-manager";

export function MobileOS({ manager }: { manager: WindowManager }) {
  const [now, setNow] = useState<Date | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  // The foreground app is the top-most window that isn't minimized. This is the
  // same state the desktop uses, so opening "projects" here keeps it open after
  // a resize to desktop (and vice versa).
  const foreground = manager.windows
    .filter((w) => !w.minimized)
    .reduce<
      (typeof manager.windows)[number] | null
    >((top, w) => (top === null || w.z > top.z ? w : top), null);

  // Move keyboard focus into the app that was just opened.
  const { pendingFocusId, clearPendingFocus } = manager;
  useEffect(() => {
    if (foreground && pendingFocusId === foreground.id) {
      contentRef.current?.focus();
      clearPendingFocus();
    }
  }, [foreground, pendingFocusId, clearPendingFocus]);

  if (foreground) {
    const app = getApp(foreground.appId);
    const { Component } = app;
    return (
      <div className="flex h-dvh flex-col bg-background">
        <div
          ref={contentRef}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-auto outline-none"
        >
          <Component />
        </div>

        {/* bottom navigation */}
        <div className="flex h-14 shrink-0 items-center gap-2 border-t border-border bg-secondary/60 px-3 backdrop-blur-xl">
          <button
            onClick={() => manager.minimize(foreground.id)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-primary"
            aria-label="Back to home screen"
          >
            <ChevronLeft className="size-4" />
            Home
          </button>
          <span className="mx-auto pr-12 font-mono text-xs text-muted-foreground">
            {app.title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate flex h-dvh flex-col">
      <div className="wallpaper absolute inset-0 -z-10" aria-hidden />

      {/* status bar */}
      <div className="flex h-8 items-center justify-between px-4 pt-2 font-mono text-xs">
        <span
          className="rounded bg-background/70 px-2 py-0.5 text-foreground backdrop-blur-sm"
          suppressHydrationWarning
        >
          {time}
        </span>
        <span className="flex items-center gap-1.5 rounded bg-background/70 px-2 py-0.5 text-foreground backdrop-blur-sm">
          <span className="size-3 rounded-sm eos-gradient" aria-hidden />
          couchOS
        </span>
      </div>

      {/* clock widget */}
      <div className="px-6 pt-10 text-center">
        <div className="mx-auto inline-block rounded-2xl bg-background/60 px-6 py-4 text-foreground backdrop-blur-md">
          <div
            className="text-6xl font-light tabular-nums"
            suppressHydrationWarning
          >
            {time}
          </div>
          <div
            className="mt-1 text-sm text-foreground/80"
            suppressHydrationWarning
          >
            {now?.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* app grid — bottom navigation */}
      <div className="mt-auto px-4 pb-10">
        <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-x-[12px] gap-y-6 rounded-2xl border border-border bg-card/70 p-4 shadow-2xl backdrop-blur-xl">
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => manager.open(app.id)}
              className="flex flex-col items-center gap-1.5"
              aria-label={`Open ${app.label}`}
            >
              <span
                className="grid size-12 place-items-center rounded-2xl border border-border shadow-lg"
                style={{
                  backgroundColor: `color-mix(in oklch, ${app.accent} 26%, var(--card))`,
                }}
              >
                <app.Icon className="size-5 text-foreground" />
              </span>
              <span className="text-[11px] font-medium text-foreground drop-shadow-sm">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
