import { Users } from "lucide-react";
import { experience } from "../data/experience";
import { Reveal, Section } from "./ui";

export default function Experience() {
  const formal = experience.some((e) => e.type === "Work" || e.type === "Internship");
  return (
    <Section
      id="experience"
      eyebrow="Experience & development"
      title="Beyond the classroom"
      intro={
        formal
          ? undefined
          : "I don't have formal work experience yet, so this section shows the activities, competitions and independent learning that I do have."
      }
      tone="sage"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.06}>
            <article className="card h-full p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint text-teal-dark">
                <Users aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal">{e.type}</p>
              <h3 className="mt-1 font-sans text-base font-semibold">{e.title}</h3>
              <p className="text-sm text-forest/70">
                {e.organization}
                {e.period ? ` · ${e.period}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest/80">{e.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
