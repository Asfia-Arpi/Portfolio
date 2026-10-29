import { BarChart3, BrainCircuit, Code2 } from "lucide-react";
import { skillGroups } from "../data/skills";
import { Reveal, Section } from "./ui";

const supportIcons = { software: Code2, ml: BrainCircuit } as const;

/**
 * T-shape: the wide dark card is the deep expertise (the vertical stroke of the T);
 * the lighter cards below are the supporting breadth.
 */
export default function Skills() {
  const core = skillGroups.find((g) => g.tier === "core");
  const support = skillGroups.filter((g) => g.tier === "support");

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Depth in data, breadth in engineering"
      intro="One focus area, backed by software and AI/ML foundations. No made-up proficiency bars."
      tone="sage"
    >
      {core && (
        <Reveal>
          <article className="relative overflow-hidden rounded-3xl bg-forest p-7 text-ivory shadow-lift sm:p-9">
            <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-teal/30 blur-2xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
                  <BarChart3 aria-hidden className="h-3.5 w-3.5" /> Core focus
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{core.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/75">{core.blurb}</p>
              </div>
              <ul className="flex max-w-xl flex-wrap gap-2.5">
                {core.skills.map((s) => (
                  <li key={s} className="rounded-full bg-ivory/10 px-4 py-2 text-sm font-semibold ring-1 ring-mint/40">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      )}

      {/* connector that completes the "T" */}
      <div aria-hidden className="mx-auto h-8 w-px bg-teal/40" />
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-forest/60">
        Supporting breadth
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {support.map((g, i) => {
          const Icon = supportIcons[g.id as keyof typeof supportIcons] ?? Code2;
          return (
            <Reveal key={g.id} delay={i * 0.06}>
              <article className="card h-full p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint text-teal-dark">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="font-sans text-base font-semibold">{g.title}</h3>
                </div>
                <p className="mt-3 text-sm text-forest/70">{g.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
