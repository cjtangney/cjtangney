"use client"

import { useEffect, useState } from "react"

function read() {
  if (typeof window === "undefined") return { width: 1200, height: 800 }
  return { width: window.innerWidth, height: window.innerHeight }
}

/** Tracks the current viewport size, updating on resize. */
export function useViewportSize() {
  const [size, setSize] = useState(read)

  useEffect(() => {
    const onResize = () => setSize(read())
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return size
}
