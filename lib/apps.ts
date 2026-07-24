import type { ComponentType } from "react"
import {
  User,
  FolderGit2,
  TerminalSquare,
  Mail,
  Images,
  Settings,
  Route,
} from "lucide-react"
import { AboutApp } from "@/components/apps/about-app"
import { ProjectsApp } from "@/components/apps/projects-app"
import { TerminalApp } from "@/components/apps/terminal-app"
import { ContactApp } from "@/components/apps/contact-app"
import { GalleryApp } from "@/components/apps/gallery-app"
import { SettingsApp } from "@/components/apps/settings-app"
import { TimelineApp } from "@/components/apps/timeline-app"

export type AppId =
  | "about"
  | "timeline"
  | "projects"
  | "terminal"
  | "contact"
  | "gallery"
  | "settings"

export type AppDef = {
  id: AppId
  title: string
  /** short label shown under icons */
  label: string
  Icon: ComponentType<{ className?: string }>
  Component: ComponentType
  /** default window size in px */
  defaultSize: { width: number; height: number }
  maxWidth?: number
  minWidth?: number
  /** accent hue for the icon tile */
  accent: string
  /** auto-size the window height to fit all of its content (desktop) */
  fitContent?: boolean
}

export const APPS: AppDef[] = [
  {
    id: "about",
    title: "About — whoami",
    label: "About",
    Icon: User,
    Component: AboutApp,
    defaultSize: { width: 850, height: 560 },
    minWidth: 700,
    accent: "oklch(0.62 0.21 275)",
  },
  {
    id: "timeline",
    title: "Timeline — history",
    label: "Timeline",
    Icon: Route,
    Component: TimelineApp,
    defaultSize: { width: 650, height: 480 },
    minWidth: 550,
    accent: "oklch(0.66 0.17 250)",
  },
  {
    id: "gallery",
    title: "Gallery — ~/photos",
    label: "Gallery",
    Icon: Images,
    Component: GalleryApp,
    defaultSize: { width: 700, height: 520 },
    minWidth: 350,
    accent: "oklch(0.65 0.16 230)",
  },
  {
    id: "contact",
    title: "Contact — reach out",
    label: "Contact",
    Icon: Mail,
    Component: ContactApp,
    defaultSize: { width: 450, height: 460 },
    minWidth: 350,
    accent: "oklch(0.68 0.16 300)",
  },
  {
    id: "terminal",
    title: "Terminal — zsh",
    label: "Terminal",
    Icon: TerminalSquare,
    Component: TerminalApp,
    defaultSize: { width: 750, height: 528 },
    minWidth: 350,
    accent: "oklch(0.7 0.16 140)",
  },
  {
    id: "settings",
    title: "Settings — preferences",
    label: "Settings",
    Icon: Settings,
    Component: SettingsApp,
    defaultSize: { width: 500, height: 420 },
    minWidth: 350,
    accent: "oklch(0.7 0.02 285)",
  },
]

export function getApp(id: AppId): AppDef {
  const app = APPS.find((a) => a.id === id)
  if (!app) throw new Error(`Unknown app: ${id}`)
  return app
}
