"use client"

import { useEffect, useRef, useState } from "react"

type Line = { type: "in" | "out"; text: string }

const BANNER = `couchOS — connor@desktop`

const HELP = `available commands:
  help        show this message
  about       a quick whoami
  bio         backstory + character sheet
  stats       core stats
  skills      proficiency breakdown
  social      where to find me
  clear       clear the screen`

const BIO = `Race:  Human (Couch)
Class: Software Developer

Born and raised in New England, learned and schooled in New York.
Three decades of being a person, one decade slinging code. Passionate
about accessibility and intuitive interfaces. Lifelong ski bum and
hobby photographer.`

const STATS = `core stats:
  INT  90
  DEX  85
  STR  65
  LUK  25   * yes, i am chronically unlucky.`

const SKILLS = `skills (proficiency):
  JS   95     HTML  95
  CSS  90     TS    80
  PHP  65     AWS   60
  SQL  50     PY    45`

function run(cmd: string): string {
  const c = cmd.trim().toLowerCase()
  switch (c) {
    case "help":
      return HELP
    case "about":
      return "Connor Tangney — software engineer based in Boston, MA. Open the About app for more."
    case "bio":
      return BIO
    case "stats":
      return STATS
    case "skills":
      return SKILLS
    case "social":
      return "linkedin.com/in/connor-tangney-69aa8666 · github.com/ctangney-tulip"
    case "":
      return ""
    default:
      return `zsh: command not found: ${cmd}  (try 'help')`
  }
}

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: BANNER },
    { type: "out", text: "Type 'help' to get started." },
  ])
  const [value, setValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const cmd = value
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([])
      setValue("")
      return
    }
    const output = run(cmd)
    setLines((prev) => [
      ...prev,
      { type: "in", text: cmd },
      ...(output ? [{ type: "out" as const, text: output }] : []),
    ])
    setValue("")
  }

  return (
    <div
      className="h-full cursor-text overflow-auto bg-background/80 p-4 font-mono text-[13px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
      ref={scrollRef}
    >
      {lines.map((line, i) =>
        line.type === "in" ? (
          <div key={i} className="flex gap-2">
            <span className="text-primary">❯</span>
            <span className="text-foreground">{line.text}</span>
          </div>
        ) : (
          <pre
            key={i}
            className="whitespace-pre-wrap break-words text-muted-foreground"
          >
            {line.text}
          </pre>
        ),
      )}

      <form onSubmit={submit} className="flex gap-2">
        <span className="text-primary">❯</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          className="flex-1 bg-transparent text-foreground caret-primary outline-none"
        />
      </form>
    </div>
  )
}
