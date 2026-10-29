import { FileText, ShieldAlert } from "lucide-react";
import { hybridStats, thesis } from "../data/research";
import { ConfusionMatrix } from "./ProjectExtras";
import { Bullets, Reveal, SafeImage, Section } from "./ui";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card h-full p-6">
      <h3 className="font-sans text-base font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Dataset → Preprocessing → Training → Evaluation → Hybrid → Results */
function Pipeline() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6" aria-label="Research workflow">
      {thesis.pipeline.map((p, i) => (
        <li key={p.step} className="relative">
          <div className="card h-full p-4 transition hover:-translate-y-1 hover:shadow-lift">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-mint">
              {i + 1}
            </span>
            <h3 className="mt-3 font-sans text-sm font-semibold">{p.step}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-forest/75">{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Research() {
  const links = Object.entries(thesis.links).filter(([, url]) => Boolean(url));

  return (
    <Section id="research" eyebrow="Undergraduate research" title="Thesis case study" tone="sage">
      <Reveal>
        <div className="mb-10 max-w-3xl">
          <h3 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{thesis.title}</h3>
          <p className="mt-3 text-sm text-forest/75">
            {thesis.type} · {thesis.institution} · Supervisor: {thesis.supervisor}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <Pipeline />
      </Reveal>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Panel title="Research problem">
            <Bullets items={thesis.problem} />
            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-teal">Gaps addressed</p>
            <Bullets items={thesis.researchGaps} />
            <p className="mt-5 text-sm text-forest/75">
              <strong>Scope:</strong> {thesis.scope}
            </p>
          </Panel>
        </Reveal>
        <Reveal delay={0.08}>
          <Panel title="Key finding">
            <p className="font-display text-5xl font-semibold text-teal-dark">{hybridStats.accuracy.toFixed(2)}%</p>
            <p className="mt-2 text-sm text-forest/80">
              validation accuracy of the hybrid ensemble on {hybridStats.total.toLocaleString()} images, as reported in
              my final thesis presentation.
            </p>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="card h-full overflow-hidden">
            <SafeImage
              src={thesis.figures[0]?.src}
              alt={thesis.figures[0]?.alt ?? "Thesis pipeline"}
              fit="contain"
              className="max-h-[420px] w-full bg-white p-3"
            />
            <p className="border-t border-forest/10 px-5 py-3 text-xs text-forest/70">{thesis.figures[0]?.caption}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-5">
            <ConfusionMatrix />
            <Panel title="Models compared">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Pretrained CNNs</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {thesis.architectures.single.map((m) => (
                  <li key={m} className="chip">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal">Hybrid ensembles</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {thesis.architectures.hybrid.map((m) => (
                  <li key={m} className="chip">
                    {m}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <div role="note" className="flex gap-4 rounded-3xl border border-amber-300/60 bg-amber-50 p-6 text-amber-950">
          <ShieldAlert aria-hidden className="mt-0.5 h-6 w-6 shrink-0" />
          <div>
            <h3 className="font-sans text-base font-semibold">Research results, not clinical use</h3>
            <p className="mt-1 text-sm leading-relaxed">
              This thesis is an academic study. The model has not been clinically validated, is not a medical
              diagnostic product and must not be used to make medical decisions.
            </p>
            <div className="mt-3 text-sm">
              <Bullets items={thesis.limitations.slice(0, 3)} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <Panel title="Future work">
          <Bullets items={thesis.future} />
        </Panel>
      </Reveal>

      {(links.length > 0 || thesis.outputs.length > 0) && (
        <Reveal className="mt-6">
          <Panel title="Publications and materials">
            <ul className="flex flex-wrap gap-3">
              {links.map(([key, url]) => (
                <li key={key}>
                  <a className="btn-secondary" href={url} target="_blank" rel="noopener noreferrer">
                    <FileText aria-hidden className="h-4 w-4" />{" "}
                    {key === "paper" ? "Paper" : key === "repo" ? "Code" : "Slides"}
                  </a>
                </li>
              ))}
              {thesis.outputs.map((o) => (
                <li key={o.url}>
                  <a className="btn-secondary" href={o.url} target="_blank" rel="noopener noreferrer">
                    <FileText aria-hidden className="h-4 w-4" /> {o.title} ({o.kind})
                  </a>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      )}
    </Section>
  );
}
