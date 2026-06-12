import type { ComponentType } from "react"
import {
  User,
  FolderGit2,
  TerminalSquare,
  Mail,
  Images,
  Settings,
} from "lucide-react"
import { AboutApp } from "@/components/apps/about-app"
import { ProjectsApp } from "@/components/apps/projects-app"
import { TerminalApp } from "@/components/apps/terminal-app"
import { ContactApp } from "@/components/apps/contact-app"
import { GalleryApp } from "@/components/apps/gallery-app"
import { SettingsApp } from "@/components/apps/settings-app"

export type AppId =
  | "about"
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
    accent: "oklch(0.62 0.21 275)",
    fitContent: true,
  },
  {
    id: "projects",
    title: "Projects — ~/work",
    label: "Projects",
    Icon: FolderGit2,
    Component: ProjectsApp,
    defaultSize: { width: 680, height: 520 },
    accent: "oklch(0.6 0.18 260)",
  },
  {
    id: "gallery",
    title: "Gallery — ~/Pictures",
    label: "Gallery",
    Icon: Images,
    Component: GalleryApp,
    defaultSize: { width: 700, height: 520 },
    accent: "oklch(0.65 0.16 230)",
  },
  {
    id: "contact",
    title: "Contact — send mail",
    label: "Contact",
    Icon: Mail,
    Component: ContactApp,
    defaultSize: { width: 520, height: 460 },
    accent: "oklch(0.68 0.16 300)",
  },
  {
    id: "terminal",
    title: "Terminal — zsh",
    label: "Terminal",
    Icon: TerminalSquare,
    Component: TerminalApp,
    defaultSize: { width: 750, height: 528 },
    accent: "oklch(0.7 0.16 140)",
  },
  {
    id: "settings",
    title: "Settings — preferences",
    label: "Settings",
    Icon: Settings,
    Component: SettingsApp,
    defaultSize: { width: 560, height: 420 },
    accent: "oklch(0.7 0.02 285)",
  },
]

export function getApp(id: AppId): AppDef {
  const app = APPS.find((a) => a.id === id)
  if (!app) throw new Error(`Unknown app: ${id}`)
  return app
}
