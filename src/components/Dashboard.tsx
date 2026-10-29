import { BadgeCheck, FolderKanban, Sprout } from "lucide-react";
import { certifications } from "../data/certifications";
import { learningFocus } from "../data/profile";
import { projects } from "../data/projects";
import { hybridStats } from "../data/research";
import { skillGroups } from "../data/skills";
import { useCountUp } from "../hooks/useCountUp";
import { Reveal, Section } from "./ui";

function Stat({ value, decimals = 0, suffix = "", label, note }: { value: number; decimals?: number; suffix?: string; label: string; note: string }) {
  const { ref, text } = useCountUp(value, decimals);
  return (
    <div className="card p-6">
      <p className="font-display text-5xl font-semibold text-teal-dark">
        <span ref={ref}>{text}</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs text-forest/65">{note}</p>
    </div>
  );
}

/**
 * Every number here is calculated from the data files. Add a project or certificate there
 * and these counts update by themselves.
 */
export default function Dashboard() {
  const completed = projects.filter((p) => p.status === "completed").length;
  const practice = projects.filter((p) => p.status === "practice").length;
  const planned = projects.filter((p) => p.status === "planned").length;
  const earned = certifications.filter((c) => c.status === "earned");
  const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  const maxGroup = Math.max(...skillGroups.map((g) => g.skills.length));

  return (
    <Section
      id="snapshot"
      eyebrow="Career snapshot"
      title="My portfolio in numbers"
      intro="Counts come straight from the data behind this site, so they stay accurate as it grows."
      tone="sage"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <Stat
            value={projects.length}
            label="Featured projects"
            note={`${completed} completed · ${practice} practice · ${planned} planned`}
          />
        </Reveal>
        <Reveal delay={0.06}>
          <Stat value={earned.length} label="Verified certifications" note="Each has a verification link" />
        </Reveal>
        <Reveal delay={0.12}>
          <Stat value={totalSkills} label="Tools & skills listed" note={`Across ${skillGroups.length} areas`} />
        </Reveal>
        <Reveal delay={0.18}>
          <Stat
            value={hybridStats.accuracy}
            decimals={2}
            suffix="%"
            label="Thesis hybrid model accuracy"
            note="Validation set; research result only"
          />
        </Reveal>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="card h-full p-6">
            <h3 className="flex items-center gap-2 font-sans text-base font-semibold">
              <FolderKanban aria-hidden className="h-5 w-5 text-teal" /> Main technical areas
            </h3>
            <ul className="mt-5 space-y-3">
              {skillGroups.map((g) => (
                <li key={g.id} className="grid grid-cols-[150px_1fr_28px] items-center gap-3 text-sm sm:grid-cols-[190px_1fr_28px]">
                  <span className="truncate text-forest/80">{g.title}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-sage">
                    <span
                      className="block h-full rounded-full bg-teal"
                      style={{ width: `${(g.skills.length / maxGroup) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-semibold">{g.skills.length}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-forest/60">Bars show how many skills are listed per area, not skill level.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid h-full gap-5">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-sans text-base font-semibold">
                <BadgeCheck aria-hidden className="h-5 w-5 text-teal" /> Verified certifications
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-forest/80">
                {earned.map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-sans text-base font-semibold">
                <Sprout aria-hidden className="h-5 w-5 text-teal" /> Current learning focus
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-forest/80">
                {learningFocus.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
