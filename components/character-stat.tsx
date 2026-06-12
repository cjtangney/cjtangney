"use client"

import { useEffect, useState } from "react"

type FillColor = "red" | "orange" | "yellow" | "green" | "blue" | "purple"

const FILL: Record<FillColor, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
}

export function CharacterStat({
  label,
  value,
  fillColor = "green",
}: {
  label: string
  value: number
  fillColor?: FillColor
}) {
  const [width, setWidth] = useState(0)

  // Animate the fill from 0 to value once mounted.
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(value))
    return () => cancelAnimationFrame(id)
  }, [value])

  return (
    <div className="grid grid-cols-[40px_1fr] items-center gap-3">
      <span className="font-mono text-sm font-medium">{label}</span>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${FILL[fillColor]}`}
          style={{ width: `${width}%` }}
          role="presentation"
        />
        <span className="sr-only">{value}%</span>
      </div>
    </div>
  )
}
