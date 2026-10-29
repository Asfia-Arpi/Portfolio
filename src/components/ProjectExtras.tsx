import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { businessKpis, daxMeasures, foodpandaKpis, revenueByRestaurant } from "../data/foodpanda";
import { hybridStats, thesis } from "../data/research";
import { Bullets } from "./ui";

/** Confusion matrix drawn from the real counts in data/research.ts */
export function ConfusionMatrix() {
  const { tn, fp, fn, tp } = thesis.hybridConfusion;
  const max = Math.max(tn, fp, fn, tp);
  const cell = (value: number, label: string, good: boolean) => (
    <div
      className={`flex flex-col items-center justify-center rounded-xl p-3 text-center ${
        good ? "text-ivory" : "text-forest"
      }`}
      style={{
        background: good
          ? `rgba(16,137,129,${0.45 + 0.55 * (value / max)})`
          : `rgba(209,250,229,${0.35 + 0.65 * (value / max)})`,
      }}
    >
      <span className="text-xl font-bold">{value.toLocaleString()}</span>
      <span className="text-[11px] opacity-80">{label}</span>
    </div>
  );

  return (
    <figure className="rounded-2xl border border-forest/10 bg-white p-4">
      <figcaption className="mb-3 text-sm font-semibold">
        Hybrid ensemble — confusion matrix (validation set)
      </figcaption>
      <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 text-xs text-forest/60">
        <span />
        <span className="text-center">Predicted 0</span>
        <span className="text-center">Predicted 1</span>
        <span className="pr-1 text-right">True 0</span>
        {cell(tn, "correct", true)}
        {cell(fp, "wrong", false)}
        <span className="pr-1 text-right">True 1</span>
        {cell(fn, "wrong", false)}
        {cell(tp, "correct", true)}
      </div>
      <p className="mt-3 text-xs text-forest/70">
        {hybridStats.total.toLocaleString()} validation images · accuracy ={" "}
        <strong>{hybridStats.accuracy.toFixed(2)}%</strong>, calculated from the four counts above.
      </p>
    </figure>
  );
}

export function ThesisExtras() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <ConfusionMatrix />
      <div className="rounded-2xl border border-forest/10 bg-white p-4">
        <p className="text-sm font-semibold">Model comparison scope</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal">Single CNNs</p>
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
        <p className="mt-4 text-xs leading-relaxed text-forest/70">{thesis.architectures.note}</p>
      </div>
    </div>
  );
}

function RevenueBars() {
  const max = Math.max(...revenueByRestaurant.map((r) => r.value));
  return (
    <figure className="rounded-2xl border border-forest/10 bg-white p-4">
      <figcaption className="mb-3 text-sm font-semibold">Revenue by restaurant (millions)</figcaption>
      <ul className="space-y-2.5">
        {revenueByRestaurant.map((r) => (
          <li key={r.name} className="grid grid-cols-[88px_1fr_44px] items-center gap-3 text-xs">
            <span className="text-forest/75">{r.name}</span>
            <span className="h-3 overflow-hidden rounded-full bg-sage">
              <span
                className="block h-full rounded-full bg-teal"
                style={{ width: `${(r.value / max) * 100}%` }}
              />
            </span>
            <span className="text-right font-semibold">{r.value.toFixed(2)}M</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-forest/60">Values read from the dashboard (practice dataset).</p>
    </figure>
  );
}

function DaxList() {
  const [open, setOpen] = useState<string | null>(daxMeasures[0]?.name ?? null);
  return (
    <div className="divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-white">
      {daxMeasures.map((m) => {
        const isOpen = open === m.name;
        const panelId = `dax-${m.name.replace(/\s+/g, "-")}`;
        return (
          <div key={m.name}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : m.name)}
              className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold"
            >
              {m.name}
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div id={panelId} className="px-4 pb-4">
                <p className="text-sm text-forest/75">{m.purpose}</p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-forest p-3 text-xs leading-relaxed text-mint">
                  <code>{m.code}</code>
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function FoodpandaExtras() {
  return (
    <div className="space-y-6">
      <div
        role="note"
        className="rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900"
      >
        <strong>Note on the data.</strong> Built on a public Kaggle dataset that I have not verified. The numbers
        show what the dashboard does, not how a real company performs.
      </div>

      <div>
        <h4 className="mb-3 font-sans text-sm font-semibold">Dashboard KPIs (practice dataset)</h4>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {foodpandaKpis.map((k) => (
            <li key={k.label} className="rounded-2xl border border-forest/10 bg-white p-3">
              <p className="text-xs text-forest/60">{k.label}</p>
              <p className="mt-1 font-display text-2xl font-semibold">{k.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <RevenueBars />
        <div className="rounded-2xl border border-forest/10 bg-white p-4">
          <p className="mb-3 text-sm font-semibold">Business KPIs the DAX measures support</p>
          <Bullets items={businessKpis} />
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-sans text-sm font-semibold">DAX measures (blueprint)</h4>
        <DaxList />
      </div>
    </div>
  );
}
