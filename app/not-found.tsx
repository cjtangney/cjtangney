import Link from "next/link"
import { Minus, Square, X } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative isolate grid h-dvh w-full place-items-center overflow-hidden p-4">
      <div className="wallpaper absolute inset-0 -z-10" aria-hidden />

      {/* faux desktop window */}
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl">
        {/* title bar */}
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-secondary/80 px-3">
          <span className="grid size-5 place-items-center rounded-md eos-gradient" aria-hidden />
          <span className="truncate font-mono text-xs text-muted-foreground">
            404 — not found
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-muted-foreground" aria-hidden>
            <Minus className="size-3.5" />
            <Square className="size-3" />
            <X className="size-3.5" />
          </div>
        </div>

        {/* body */}
        <div className="grid place-items-center gap-4 px-6 py-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="112"
            height="117"
            viewBox="0 0 127.433 132.743"
            className="animate-float"
            aria-hidden
          >
            <path
              fill="#FFF6F4"
              d="M116.223,125.064c1.032-1.183,1.323-2.73,1.391-3.747V54.76c0,0-4.625-34.875-36.125-44.375 s-66,6.625-72.125,44l-0.781,63.219c0.062,4.197,1.105,6.177,1.808,7.006c1.94,1.811,5.408,3.465,10.099-0.6 c7.5-6.5,8.375-10,12.75-6.875s5.875,9.75,13.625,9.25s12.75-9,13.75-9.625s4.375-1.875,7,1.25s5.375,8.25,12.875,7.875 s12.625-8.375,12.625-8.375s2.25-3.875,7.25,0.375s7.625,9.75,14.375,8.125C114.739,126.01,115.412,125.902,116.223,125.064z"
            />
            <circle fill="#013E51" cx="86.238" cy="57.885" r="6.667" />
            <circle fill="#013E51" cx="40.072" cy="57.885" r="6.667" />
            <path
              fill="#013E51"
              d="M71.916,62.782c0.05-1.108-0.809-2.046-1.917-2.095c-0.673-0.03-1.28,0.279-1.667,0.771 c-0.758,0.766-2.483,2.235-4.696,2.358c-1.696,0.094-3.438-0.625-5.191-2.137c-0.003-0.003-0.007-0.006-0.011-0.009l0.002,0.005 c-0.332-0.294-0.757-0.488-1.235-0.509c-1.108-0.049-2.046,0.809-2.095,1.917c-0.032,0.724,0.327,1.37,0.887,1.749 c-0.001,0-0.002-0.001-0.003-0.001c2.221,1.871,4.536,2.88,6.912,2.986c0.333,0.014,0.67,0.012,1.007-0.01 c3.163-0.191,5.572-1.942,6.888-3.166l0.452-0.453c0.021-0.019,0.04-0.041,0.06-0.061l0.034-0.034 c-0.007,0.007-0.015,0.014-0.021,0.02C71.666,63.771,71.892,63.307,71.916,62.782z"
            />
          </svg>

          <h1 className="text-2xl font-semibold">Ohno!</h1>
          <p className="text-muted-foreground">You&apos;ve made a wrong turn!</p>

          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg eos-gradient px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Go Home&nbsp;&nbsp;🏠
          </Link>

          <p className="mt-2 font-mono text-xs text-muted-foreground">
            © Connor Tangney
          </p>
        </div>
      </div>
    </main>
  )
}
