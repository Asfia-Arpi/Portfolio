import { Download, FileText } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal, Section } from "./ui";

export default function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Take my CV with you" tone="ivory">
      <Reveal>
        <div className="card grid items-center gap-8 overflow-hidden p-6 sm:p-8 md:grid-cols-[auto_1fr]">
          <div
            aria-hidden
            className="mx-auto flex h-40 w-32 flex-col justify-between rounded-2xl border border-forest/10 bg-gradient-to-br from-white to-mint/60 p-4 shadow-soft"
          >
            <FileText className="h-7 w-7 text-teal" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-forest/20" />
              <div className="h-1.5 w-4/5 rounded bg-forest/15" />
              <div className="h-1.5 w-3/5 rounded bg-forest/15" />
            </div>
          </div>
          <div>
            <h3 className="font-sans text-xl font-semibold">{profile.name} — CV</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest/75">{profile.cvNote}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={profile.cvUrl} download className="btn-primary">
                <Download aria-hidden className="h-4 w-4" /> Download CV (PDF)
              </a>
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View online
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
