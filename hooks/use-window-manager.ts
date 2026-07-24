"use client"

import { useCallback, useRef, useState } from "react"
import type { AppId } from "@/lib/apps"
import { getApp } from "@/lib/apps"

export type WindowState = {
  id: string
  appId: AppId
  x: number
  y: number
  width: number
  height: number
  minWidth?: number
  z: number
  minimized: boolean
  maximized: boolean
  /** stored geometry to restore from a maximized state */
  restore?: { x: number; y: number; width: number; height: number }
}

let counter = 0

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  // Id of a window that should receive keyboard focus (set when a program is
  // opened so keyboard users land inside the thing they just opened).
  const [pendingFocusId, setPendingFocusId] = useState<string | null>(null)
  const topZ = useRef(10)

  const clearPendingFocus = useCallback(() => setPendingFocusId(null), [])

  const focus = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: ++topZ.current } : w)),
    )
    setActiveId(id)
  }, [])

  const open = useCallback(
    (appId: AppId) => {
      // If an instance already exists, just focus / un-minimize it.
      let existingId: string | null = null
      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId)
        if (existing) {
          existingId = existing.id
          return prev.map((w) =>
            w.id === existing.id
              ? { ...w, minimized: false, z: ++topZ.current }
              : w,
          )
        }
        const app = getApp(appId)
        const id = `win-${++counter}`
        existingId = id
        // Always create windows with normal (non-maximized) desktop geometry.
        // The mobile view renders the foreground app fullscreen via its own
        // layout, so it doesn't rely on these values — baking a maximized/mobile
        // size in here would otherwise leak into the desktop layout on resize.
        const vw = typeof window !== "undefined" ? window.innerWidth : 1200
        const width = Math.min(app.defaultSize.width, vw - 40)
        const height = app.defaultSize.height
        const minWidth = app.minWidth;
        // cascade new windows
        const offset = (prev.length % 6) * 28
        const baseX = 120 + offset
        const baseY = 80 + offset
        return [
          ...prev,
          {
            id,
            appId,
            x: baseX,
            y: baseY,
            width,
            height,
            minWidth,
            z: ++topZ.current,
            minimized: false,
            maximized: false,
          },
        ]
      })
      if (existingId) {
        setActiveId(existingId)
        setPendingFocusId(existingId)
      }
    },
    [],
  )

  const close = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const minimize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    )
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            ...(w.restore ?? {}),
            z: ++topZ.current,
          }
        }
        return {
          ...w,
          maximized: true,
          restore: { x: w.x, y: w.y, width: w.width, height: w.height },
          z: ++topZ.current,
        }
      }),
    )
    setActiveId(id)
  }, [])

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w)),
    )
  }, [])

  const resize = useCallback(
    (id: string, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, width, height } : w)),
      )
    },
    [],
  )

  return {
    windows,
    activeId,
    pendingFocusId,
    clearPendingFocus,
    open,
    close,
    minimize,
    toggleMaximize,
    focus,
    move,
    resize,
  }
}

export type WindowManager = ReturnType<typeof useWindowManager>
