"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

const PHOTOS = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(4, "0")
  return { src: `/img/japan/${n}.jpg`, label: `Japan ${String(i + 1).padStart(2, "0")}` }
})

export function GalleryApp() {
  const [open, setOpen] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir: number) =>
      setOpen((cur) => (cur === null ? cur : (cur + dir + PHOTOS.length) % PHOTOS.length)),
    [],
  )

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close, step])

  return (
    <div className="p-5">
      <p className="mb-4 font-mono text-xs text-muted-foreground">
        ~/photos/japan — photos from my trips to Japan
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpen(i)}
            className="group overflow-hidden rounded-xl border border-border bg-secondary/30 text-left transition-colors hover:border-primary/50"
            aria-label={`Open ${photo.label} in lightbox`}
          >
            <img
              src={photo.src}
              alt={`Photograph taken in Japan (${photo.label})`}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="flex items-center justify-between px-3 py-2 font-mono text-xs">
              {photo.label}
            </span>
          </button>
        ))}
      </div>
      <ScrollToTop />

      {mounted &&
        open !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${PHOTOS[open].label} — image viewer`}
            onClick={close}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Previous image"
              className="absolute left-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-6" />
            </button>

            <figure className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <img
                src={PHOTOS[open].src}
                alt={`Photograph taken in Japan (${PHOTOS[open].label})`}
                className="max-h-[82vh] max-w-[88vw] rounded-lg object-contain shadow-2xl"
              />
              <figcaption className="font-mono text-xs text-white/70">
                {PHOTOS[open].label} · {open + 1} / {PHOTOS.length}
              </figcaption>
            </figure>

            <button
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Next image"
              className="absolute right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>,
          document.body,
        )}
    </div>
  )
}
