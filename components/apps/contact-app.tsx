const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "in/connor-tangney",
    href: "https://www.linkedin.com/in/connor-tangney-69aa8666/",
  },
  { label: "GitHub", handle: "github.com/ctangney-tulip", href: "https://github.com/ctangney-tulip" },
]

export function ContactApp() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h2 className="text-lg font-semibold">Get in touch</h2>
        <p className="text-sm text-muted-foreground">
          Reach me on any of these channels.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm transition-colors hover:bg-secondary/60"
          >
            <span className="text-muted-foreground">{s.label}</span>
            <span className="font-mono">{s.handle}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
