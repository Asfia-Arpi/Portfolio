import { CheckCircle2, Languages, MapPin, Target } from "lucide-react";
import { certifications } from "../data/certifications";
import { aboutParagraphs, profile, strengths } from "../data/profile";
import { projects } from "../data/projects";
import { useCountUp } from "../hooks/useCountUp";
import { Reveal, Section } from "./ui";

function CountStat({ value, label }: { value: number; label: string }) {
  const { ref, text } = useCountUp(value);
  return (
    <div className="rounded-2xl border border-forest/10 bg-white/80 p-5 shadow-soft">
      <p className="font-display text-4xl font-semibold text-teal-dark">
        <span ref={ref}>{text}</span>
      </p>
      <p className="mt-1 text-sm text-forest/75">{label}</p>
    </div>
  );
}

function TextStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-forest/10 bg-white/80 p-5 shadow-soft">
      <p className="font-display text-2xl font-semibold leading-[2.5rem] text-teal-dark">{value}</p>
      <p className="mt-1 text-sm text-forest/75">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Data first, engineering underneath" tone="ivory">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-forest/85">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="space-y-2.5 pt-2">
            {strengths.map((s) => (
              <li key={s} className="flex gap-3 text-sm font-medium">
                <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card space-y-6 p-6">
            <div className="flex gap-3">
              <Target aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <div>
                <h3 className="font-sans text-sm font-semibold">Target roles</h3>
                <ul className="mt-2 space-y-1 text-sm text-forest/75">
                  {profile.targetRoles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <div>
                <h3 className="font-sans text-sm font-semibold">Based in</h3>
                <p className="mt-2 text-sm text-forest/75">{profile.location}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Languages aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <div>
                <h3 className="font-sans text-sm font-semibold">Languages</h3>
                <p className="mt-2 text-sm text-forest/75">{profile.languages.join(" · ")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Real facts only. The two counts are calculated from the data files. */}
      <Reveal delay={0.05} className="mt-12">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Portfolio facts">
          <li>
            <CountStat value={projects.length} label="Portfolio projects" />
          </li>
          <li>
            <CountStat value={certifications.length} label="Verified certifications" />
          </li>
          <li>
            <TextStat value="Completed" label="BSc, Software Engineering" />
          </li>
          <li>
            <TextStat value="Completed" label="Undergraduate thesis" />
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
