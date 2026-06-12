"use client"

import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "nyxos-theme"

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored
  // Fall back to whatever is already applied to <html>.
  return document.documentElement.classList.contains("light") ? "light" : "dark"
}

/** Global light/dark theme, persisted to localStorage and applied to <html>. */
export function useTheme() {
  // Initialize from the persisted value so the first render already matches the
  // current theme — otherwise the apply effect below would clobber it on mount.
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light")
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
