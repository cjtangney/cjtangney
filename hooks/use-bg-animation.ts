"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "couchos-bg-anim-paused"

function readPaused(): boolean {
  if (typeof window === "undefined") return false
  if (localStorage.getItem(STORAGE_KEY) === "true") return true
  return document.documentElement.classList.contains("bg-anim-paused")
}

/** Whether the animated gradient background is paused, persisted + applied to <html>. */
export function useBackgroundAnimationPaused() {
  const [paused, setPaused] = useState<boolean>(readPaused)

  useEffect(() => {
    document.documentElement.classList.toggle("bg-anim-paused", paused)
    localStorage.setItem(STORAGE_KEY, String(paused))
  }, [paused])

  return { paused, setPaused }
}
