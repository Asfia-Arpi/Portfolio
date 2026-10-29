import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BarChart3, BrainCircuit, Code2, ExternalLink, Github, Search } from "lucide-react";
import { projectFilters, projects } from "../data/projects";
import type { Project } from "../types";
import ProjectModal from "./ProjectModal";
import { Reveal, SafeImage, Section, StatusBadge } from "./ui";

const kindStyle = {
  research: { icon: BrainCircuit, label: "Research", bg: "from-forest to-teal-dark", text: "text-mint" },
  dashboard: { icon: BarChart3, label: "Business Intelligence", bg: "from-mint to-sage", text: "text-forest" },
  software: { icon: Code2, label: "Project", bg: "from-sage to-ivory", text: "text-forest" },
} as const;

// Asymmetric 6-column layout: first card wide (the flagship BI project), then two narrower, then a wide one.
const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2"];

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const k = kindStyle[project.kind];
  const Icon = k.icon;
  const featured = index === 0;
  const { repo, demo } = project.links ?? {};

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={`card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift ${
        spans[index % spans.length]
      }`}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${k.bg} ${featured ? "h-56 lg:h-64" : "h-44"}`}>
        {project.thumbnail ? (
          <SafeImage
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? project.title}
            fit={project.kind === "research" ? "contain" : "cover"}
            className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
              project.kind === "research" ? "bg-white p-2" : "object-top"
            }`}
          />
        ) : (
          <div className={`flex h-full items-center justify-center ${k.text}`}>
            <Icon aria-hidden className="h-12 w-12 opacity-70" />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold shadow-soft">
          <Icon aria-hidden className="h-3.5 w-3.5 text-teal" /> {k.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.status !== "completed" && (
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
          </div>
        )}
        <h3 className="mt-3 font-sans text-xl font-semibold leading-snug">{project.title}</h3>
        <p className="mt-1 text-xs font-medium text-teal-dark">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-forest/75">{project.summary}</p>

        {project.statusNote && (
          <p className="mt-3 rounded-xl bg-sage/70 px-3 py-2 text-xs text-forest/80">{project.statusNote}</p>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm font-medium">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="chip !px-2.5 !py-0.5">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button type="button" onClick={onOpen} className="btn-primary !min-h-[42px] !px-5">
            View Details <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> of {project.title}</span>
          </button>
          {repo && (
            <a className="btn-secondary !min-h-[42px] !px-4" href={repo} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden className="h-4 w-4" /> GitHub
            </a>
          )}
          {demo && (
            <a className="btn-secondary !min-h-[42px] !px-4" href={demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = filter === "All" || p.categories.includes(filter);
      const inQuery =
        q === "" ||
        [p.title, p.summary, p.tagline, ...p.stack, ...p.categories].join(" ").toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [filter, query]);

  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Research, dashboards and code"
      intro="Finished work only, starting with my strongest Business Intelligence project."
      tone="ivory"
    >
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition ${
                  filter === f
                    ? "border-forest bg-forest text-ivory"
                    : "border-forest/15 bg-white/70 hover:border-teal"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search projects</span>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tools"
              className="min-h-[44px] w-full rounded-full border border-forest/15 bg-white/80 pl-10 pr-4 text-sm placeholder:text-forest/45 focus:border-teal focus:outline-none"
            />
          </label>
        </div>
      </Reveal>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
      </p>

      <div className="grid gap-6 lg:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="card mx-auto max-w-md p-8 text-center">
          <p className="font-semibold">No projects match that search.</p>
          <p className="mt-1 text-sm text-forest/70">Try another category or clear the search box.</p>
          <button
            type="button"
            className="btn-secondary mt-4"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
