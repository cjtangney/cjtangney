"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

/** Walk up the DOM to the nearest vertically-scrollable ancestor. Components
 *  render inside different scroll containers (desktop window vs. mobile view),
 *  so we can't hardcode one — we find it at runtime. */
function scrollParentOf(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null
  while (node) {
    const oy = getComputedStyle(node).overflowY
    if (oy === "auto" || oy === "scroll" || oy === "overlay") return node
    node = node.parentElement
  }
  return null
}

type ScrollToTopProps = {
  /** how far (px) the user must scroll before the button appears */
  threshold?: number
  /** extra classes for the floating button */
  className?: string
}

/**
 * Reusable floating "scroll to top" button. Drop it as the LAST child of any
 * scrollable content — it discovers its own scroll parent, pins to the
 * bottom-right of the scroll viewport, and appears once scrolled past
 * `threshold`. Clicking smoothly scrolls that container back to the top.
 */
export function ScrollToTop({ threshold = 100, className }: ScrollToTopProps) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = scrollParentOf(anchorRef.current)
    scrollerRef.current = root
    if (!root) return
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(root.scrollTop > threshold)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    root.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      root.removeEventListener("scroll", onScroll)
    }
  }, [threshold])

  const scrollToTop = () => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      ref={anchorRef}
      aria-hidden={!visible}
      className="pointer-events-none absolute bottom-18 md:bottom-4 right-8 z-1"
    >
      <button
        type="button"
        onClick={scrollToTop}
        tabIndex={visible ? 0 : -1}
        aria-label="Scroll to top"
        className={cn(
          "pointer-events-auto grid size-9 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-md backdrop-blur transition-all hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0",
          className,
        )}
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  )
}
