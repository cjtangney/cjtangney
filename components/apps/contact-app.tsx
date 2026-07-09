import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa6"

const SOCIALS = [
  {
    label: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5 text-muted-foreground" />,
    href: "https://www.linkedin.com/in/connor-tangney-69aa8666/",
  },
  { label: "GitHub - Personal", icon: <FaGithub className="w-5 h-5 text-muted-foreground" />, href: "https://github.com/cjtangney" },
  { label: "GitHub - Work", icon: <FaGithub className="w-5 h-5 text-muted-foreground" />, href: "https://github.com/ctangney-tulip" },
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
            <div className="flex items-center gap-2">
              {s.icon}
              <span className="text-muted-foreground">{s.label}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  )
}
