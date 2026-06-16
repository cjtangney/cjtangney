import { CharacterStat } from "@/components/character-stat"

const STATS = [
  { label: "INT", value: 90, fillColor: "green" as const },
  { label: "DEX", value: 85, fillColor: "green" as const },
  { label: "STR", value: 65, fillColor: "blue" as const },
  { label: "LUK", value: 25, fillColor: "red" as const },
]

const SKILLS = [
  { label: "JS", value: 95, fillColor: "green" as const },
  { label: "HTML", value: 95, fillColor: "green" as const },
  { label: "CSS", value: 90, fillColor: "green" as const },
  { label: "TS", value: 80, fillColor: "green" as const },
  { label: "PHP", value: 65, fillColor: "blue" as const },
  { label: "AWS", value: 60, fillColor: "blue" as const },
  { label: "SQL", value: 50, fillColor: "orange" as const },
  { label: "PY", value: 45, fillColor: "orange" as const },
]

export function AboutApp() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <img
          srcSet={[
            "/img/kyle-image-for-me_300x300.jpg 300w",
            "/img/kyle-image-for-me_600x600.jpg 600w",
            "/img/kyle-image-for-me_900x900.jpg 900w",
          ].join(", ")}
          src="/img/kyle-image-for-me_300x300.jpg"
          alt="Illustration of Connor Tangney"
          className="size-16 shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold">Connor Tangney</h1>
          <p className="font-mono text-sm text-muted-foreground">
            software engineer · hobby photographer
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* left: bio + facts */}
        <div className="flex flex-col gap-6">
          <p className="leading-relaxed text-foreground/90">
            Born and raised in New England, learned and schooled in New York.
            Three decades experience being a person, one decade of experience
            slinging code. Married since 2018 to my loving partner. Enjoyer of
            solving complicated problems. Passionate about accessibility and
            creating usable, intuitive interfaces. Aspiring Sim Racer and hobby
            photographer.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Location", v: "Boston, MA" },
              { k: "Class", v: "Software Developer" },
              { k: "Race", v: "Human (Couch)" },
              { k: "Experience", v: "~10 years" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-lg border border-border bg-secondary/40 px-3 py-2"
              >
                <div className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {row.k}
                </div>
                <div className="text-sm">{row.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: stats + skills */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Stats
            </h2>
            <ul className="flex flex-col gap-3">
              {STATS.map((s) => (
                <li key={s.label}>
                  <CharacterStat label={s.label} value={s.value} fillColor={s.fillColor} />
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">* yes, i am chronically unlucky.</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Skills
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {SKILLS.map((s) => (
                <li key={s.label}>
                  <CharacterStat label={s.label} value={s.value} fillColor={s.fillColor} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
