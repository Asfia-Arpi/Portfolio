import { GraduationCap } from "lucide-react";
import { education } from "../data/education";
import { Bullets, Reveal, Section } from "./ui";

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background" tone="ivory">
      <ol className="relative space-y-6 border-l-2 border-teal/25 pl-6 sm:pl-10">
        {education.map((item, i) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[33px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-ivory bg-teal sm:-left-[49px]"
            />
            <Reveal delay={i * 0.05}>
              <div className={`card p-6 ${i === 0 ? "bg-gradient-to-br from-white to-mint/50" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    {i === 0 && (
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-forest text-mint">
                        <GraduationCap aria-hidden className="h-5 w-5" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-sans text-lg font-semibold">{item.degree}</h3>
                      <p className="text-sm text-forest/75">
                        {item.institution}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="chip">{item.period}</span>
                </div>
                <p className="mt-4 text-sm font-semibold">{item.score}</p>
                {item.note && <p className="mt-1 text-sm text-forest/75">{item.note}</p>}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">Relevant coursework</p>
                    <ul className="flex flex-wrap gap-2">
                      {item.coursework.map((c) => (
                        <li key={c} className="chip">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">Achievements & activities</p>
                    <Bullets items={item.achievements} />
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
