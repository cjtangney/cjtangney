"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react"
import { GraduationCap, Briefcase, Flag } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

type MilestoneType = "education" | "work" | "milestone"

type Milestone = {
  /** stable key */
  id: string
  /** numeric anchor year — drives sorting + the year navigator */
  year: number
  /** human-readable period, e.g. "2012 — 2016" or "2020 — Present" */
  period: string
  /** role, degree, or headline */
  title: string
  /** company, school, or place */
  org: string
  location?: string
  type: MilestoneType
  /** short blurb — a sentence or two */
  description: string
  /** optional skills / tech / focus areas */
  tags?: string[]
  /** highlight the node as the current chapter */
  current?: boolean
}

/**
 * ── Edit "my path" here ──────────────────────────────────────────────
 * Add, remove, or reorder milestones by editing this array. Newest first.
 * `year` is the numeric anchor used for the year navigator + scrollspy.
 * `type` controls the icon + accent color (education / work / milestone).
 * Everything below the array is generic and renders whatever you put here.
 * ─────────────────────────────────────────────────────────────────────
 */
const TIMELINE: Milestone[] = [
  {
    id: "baby-arrives",
    year: 2026,
    period: "2026",
    title: "A baby arrives!",
    org: "Personal",
    type: "milestone",
    description:
      "Our daughter, Penny was born in March of 2026! Her arrival meant our family had grown to include a little Peanut Butter and Jelly Sandwich. We were incredibly excited to meet our daughter, if not also terrified by the responsibility of raising a person!",
  },
  {
    id: "move-to-pepperell",
    year: 2023,
    period: "2023",
    title: "Moved to Pepperell, MA",
    org: "Personal",
    type: "milestone",
    description:
      "After around 5 years living in Manchester, and probably one too many drive-by shootings, we decided it was time to look for someplace a little less urban. Pepperell, a quaint little farming town on the border of NH and MA, reminded us both of the kinds of small towns we grew up in. After moving in, we quickly felt right at home!",
  },
  {
    id: "present",
    year: 2022,
    period: "2022 - Present",
    title: "Software Engineer",
    org: "Tulip",
    location: "Somerville, MA",
    type: "work",
    description:
      "Somewhere along the lines, I received a LinkedIn message from a person who worked for a startup in Somerville, called Tulip. I had never worked for a startup before, but after a little research and a few interview rounds, I was confident that this was someplace I would be able to level up. I took the leap, and have been leveling up ever since!",
    tags: ["TypeScript", "JavaScript", "React", "AWS", "Claude"]
  },
  {
    id: "snhu",
    year: 2021,
    period: "2021 - 2022",
    title: "Frontend Web Developer",
    org: "Southern New Hampshire University",
    location: "Manchester, NH",
    type: "work",
    description:
      "Through my work at SilverTech (and through a few of my wife's connections), I was able to establish a few contacts at the Southern New Hampshire University. I learned that they were planning to do a complete rebuild of their component design system, and given my desire to create user-friendly interfaces, I was keen to hop on to the greenfield project!",
    tags: ["JavaScript", "HTML", "CSS", "Web Components"]
  },
  {
    id: "silvertech",
    year: 2019,
    period: "2019 - 2021",
    title: "Frontend Developer",
    org: "SilverTech",
    location: "Manchester, NH",
    type: "work",
    description:
      "After working with P&R for a short while, I decided I wanted to expose myself to a wider number of user interfaces. Additionally, I wanted to explore newer JavaScript technologies that we did not have the runway to support. SilverTech, a marketing agency located right in Manchester, seemed like a great candidate. Coincidentally, it was also in an old school building -- just like our loft!",
      tags: ["JavaScript", "HTML", "CSS", "CMS", "Web Components"]
  },
  {
    id: "move-to-manch",
    year: 2018,
    period: "2018",
    title: "Moved to Manchester, NH",
    org: "Personal",
    type: "milestone",
    description:
      "In order to be closer to both work and school (my wife had started a second master's program), we opted to move to Manchester, NH! We were both familiar with the city, and after moving in, we quickly fell in love. The city was full of old mill buildings, and we even lived in an old schoolhouse!",
  },
  {
    id: "pr-dental",
    year: 2018,
    period: "2018 - 2019",
    title: "Frontend Developer",
    org: "P&R Dental Strategies",
    location: "Nashua, NH",
    type: "work",
    description:
      "I spent a fair bit of my time here helping to maintain legacy code bases while also upgrading them to leverage modern JavaScript features. After a few years out of tech, this was a great introduction back into the \"scene\" and it also helped to rekindle my passion for creating user interfaces!",
      tags: ["JavaScript", ".NET", "C#", "IIS"]
  },
  {
    id: "married",
    year: 2018,
    period: "2018",
    title: "I got married!",
    org: "Personal",
    type: "milestone",
    description:
      "As any good ski bum, my wife and I tied the knot on top of Ragged Mountain in the middle of winter! I was the coldest day of the season, and it was a miracle we did not all get worse frost bite. After saying our \"I do's\" we both took our first run down the mountain together as a married couple. Years later, as a coach, athletes would excitedly tell me about how they still remembered our first run together!",
  },
  {
    id: "ski-coach",
    year: 2017,
    period: "2017 — 2023",
    title: "L100 Alpine Race Instructor",
    org: "Ragged Mountain Ski Team",
    location: "Danbury, NH",
    type: "work",
    description:
      "Since I was already \"in the neighborhood\" so to speak, I thought it would be nice to delve back into alpine ski racing. This was something I took semi-seriously as a kid in high school. Primarily, I helped youth athletes develop the skills they need to become strong skiers, good athletes, and even better people.",
      tags: ["More Shreddin' Pow", "First Aid"]
  },
  {
    id: "ragged-mountain",
    year: 2016,
    period: "2016 — 2018",
    title: "Webmaster",
    org: "Pacific Group Resorts",
    type: "work",
    description:
      "After moving back from VA, I took a job with Pacific Group Resorts managing websites for their 3 ski resorts located in the contigual US. I was \"stationed\" at Ragged Mountain Resort, in Danbury, New Hampshire, which meant my lunch break often included making quite a few turns. There was even the odd occassion that I had to ski for the camera! Aaaah, the memories...",
    tags: ["HTML", "CSS", "CMS", "JavaScript", "Java", "Shreddin' Pow"],
  },
  {
    id: "move-to-fremont",
    year: 2016,
    period: "2016",
    title: "Moved to Fremont, NH",
    org: "Personal",
    type: "milestone",
    description:
      "After a few years in the area, we quickly began to realize we were not fit to live near the Beltway. Once my wife (fiancé at the time) graduated from George Washington University, we decided it was time to move back home to Fremont, NH, in order to be closer to family!",
  },
  {
    id: "global-printing",
    year: 2014,
    period: "2014 — 2016",
    title: "JavaScript Workflow Automation",
    org: "Global Printing",
    type: "work",
    description:
      "After graduation, I began working for a company based in Alexandria, VA. My primary role was to transform lagre datasets to be used in various ways. I predominantly used JavaScript to manipulate the data and export it in whatever format the spec required, though occassionally it was necessary to build a small Java application to bridge some gaps.",
    tags: ["JavaScript", "Java"],
  },
  {
    id: "graduation",
    year: 2014,
    period: "2014",
    title: "I graduate!",
    org: "Personal",
    type: "milestone",
    description:
      "In 2014, I graduated from the Rochseter Institute of Technology with a B.S. in Media Arts and Technologies -- a major with a focus on digital distribution of content. It included classes with a focus on Web Development, Digital Asset Managment, and Color Theory, in addition to things like Print Production and Management. I additionally supplemented this with Computer Science and Database Management courses.",
  }
]

const TYPE_META: Record<
  MilestoneType,
  { Icon: ComponentType<{ className?: string }>; accent: string; label: string }
> = {
  education: { Icon: GraduationCap, accent: "oklch(0.65 0.16 230)", label: "Education" },
  work: { Icon: Briefcase, accent: "oklch(0.62 0.21 275)", label: "Work" },
  milestone: { Icon: Flag, accent: "oklch(0.7 0.16 140)", label: "Milestone" },
}

/** Walk up the DOM to the nearest vertically-scrollable ancestor. The timeline
 *  renders inside different scroll containers on desktop vs. mobile, so we can't
 *  hardcode one — we find it at runtime for the scrollspy + jump-to-year. */
function scrollParentOf(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null
  while (node) {
    const oy = getComputedStyle(node).overflowY
    if (oy === "auto" || oy === "scroll" || oy === "overlay") return node
    node = node.parentElement
  }
  return null
}

export function TimelineApp() {
  // Milestones sorted newest-first, matching the on-screen order.
  const milestones = useMemo(
    () => [...TIMELINE].sort((a, b) => b.year - a.year),
    [],
  )
  // Distinct years for the navigator, newest-first.
  const years = useMemo(
    () => Array.from(new Set(milestones.map((m) => m.year))).sort((a, b) => b - a),
    [milestones],
  )

  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef(new Map<string, HTMLLIElement>())
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null)

  const registerItem = useCallback((id: string, el: HTMLLIElement | null) => {
    if (el) itemRefs.current.set(id, el)
    else itemRefs.current.delete(id)
  }, [])

  // Scrollspy: the active milestone is the lowest one whose top has scrolled
  // past an activation line near the top of the scroll area. Because document
  // order matches visual order (newest→oldest, top→bottom), iterating and
  // keeping the last item above the line yields the one you're reading.
  useEffect(() => {
    const root = scrollParentOf(rootRef.current)
    if (!root) return
    let frame = 0
    const compute = () => {
      frame = 0
      // When scrolled to the very bottom, the last milestone can't reach the
      // activation line — activate it explicitly so the final year highlights.
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
        const last = milestones[milestones.length - 1]
        if (last) setActiveYear(last.year)
        return
      }
      const line = root.getBoundingClientRect().top + (root.offsetHeight / 2);
      let current = milestones[0]?.year ?? null
      for (const m of milestones) {
        const el = itemRefs.current.get(m.id)
        if (el && el.getBoundingClientRect().top <= line) current = m.year
      }
      setActiveYear(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    compute()
    root.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(root)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      root.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [milestones])

  const jumpToYear = useCallback(
    (year: number) => {
      const target = milestones.filter((m) => m.year === year)
      if (!target || !target.length) return
      const el = itemRefs.current.get(target[target.length - 1].id)
      const elYear = milestones[milestones.indexOf(target[target.length - 1])].year;
      el?.scrollIntoView({ 
        behavior: "smooth", 
        block: activeYear ? 
          elYear > activeYear ? 
            "start" : "end" 
        : "start"
      });
      setActiveYear(elYear);
    },
    [milestones, activeYear],
  )

  return (
    <div ref={rootRef} className="flex gap-4 p-6">
      {/* year navigator / scrollspy rail */}
      <nav
        aria-label="Jump to year"
        className="sticky top-8 hidden h-fit shrink-0 flex-col gap-1 self-start md:flex"
      >
        <span className="mb-1 px-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Year
        </span>
        {years.map((year) => {
          const active = year === activeYear
          return (
            <button
              key={year}
              type="button"
              onClick={() => jumpToYear(year)}
              aria-current={active ? "true" : undefined}
              className="group flex items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-foreground/5"
            >
              <span
                aria-hidden
                className="h-4 w-0.5 rounded-full transition-colors"
                style={{
                  backgroundColor: active ? "var(--primary)" : "var(--border)",
                }}
              />
              <span
                className={
                  "font-mono text-xs tabular-nums transition-colors " +
                  (active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground group-hover:text-foreground")
                }
              >
                {year}
              </span>
            </button>
          )
        })}
      </nav>

      {/* timeline content */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">History</h2>
          <p className="text-sm text-muted-foreground">Where I started and how I got here.</p>
        </div>

        <ol className="relative flex flex-col gap-24">
          {/* vertical rail */}
          <span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px bg-border"
          />

          {milestones.map((m) => {
            const meta = TYPE_META[m.type]
            return (
              <li
                key={m.id}
                data-id={m.id}
                ref={(el) => registerItem(m.id, el)}
                className="relative flex scroll-mt-4 gap-4"
              >
                {/* node */}
                <span
                  className="relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-border"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${meta.accent} 26%, var(--card))`,
                  }}
                >
                  <meta.Icon className="size-4 text-foreground" />
                  {m.current && (
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${meta.accent} 40%, transparent)`,
                      }}
                    />
                  )}
                </span>

                {/* card */}
                <div className="flex-1 rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {m.period}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wide"
                      style={{ color: meta.accent }}
                    >
                      {m.current ? "Now" : meta.label}
                    </span>
                  </div>

                  <h3 className="mt-1 text-sm font-medium text-foreground">
                    {m.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {m.org}
                    {m.location ? ` · ${m.location}` : ""}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {m.description}
                  </p>

                  {m.tags && m.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {m.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <ScrollToTop />
      </div>
    </div>
  )
}
