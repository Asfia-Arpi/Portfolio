import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "../types";
import { Bullets, SafeImage, StatusBadge } from "./ui";
import { FoodpandaExtras, ThesisExtras } from "./ProjectExtras";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-sans text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}

const has = (list?: string[]) => Array.isArray(list) && list.length > 0;

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management, Escape to close, lock page scroll, simple focus trap, restore focus on exit.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  const links = project.links ?? {};
  const hasLinks = Boolean(links.repo || links.demo || links.paper);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-lift sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-forest/10 bg-sage/60 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              {project.statusNote && <span className="text-xs text-forest/70">{project.statusNote}</span>}
            </div>
            <h2 id="project-dialog-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-forest/70">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/15 bg-white hover:border-teal"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-8 overflow-y-auto px-6 py-7">
          <p className="text-base leading-relaxed text-forest/85">{project.summary}</p>

          {project.problem && (
            <Block title="Problem">
              <p className="text-sm leading-relaxed text-forest/85">{project.problem}</p>
            </Block>
          )}
          {has(project.objectives) && (
            <Block title="Objective">
              <Bullets items={project.objectives!} />
            </Block>
          )}
          {project.dataset && (
            <Block title="Dataset / data source">
              <div className="rounded-2xl border border-forest/10 bg-white p-4 text-sm">
                <p className="font-semibold">{project.dataset.name}</p>
                {project.dataset.source && <p className="mt-1 text-forest/75">Source: {project.dataset.source}</p>}
                {project.dataset.note && <p className="mt-1 text-forest/75">{project.dataset.note}</p>}
              </div>
            </Block>
          )}
          <Block title="Tools & technologies">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </Block>
          {has(project.methodology) && (
            <Block title="Methodology">
              <Bullets items={project.methodology!} />
            </Block>
          )}
          {has(project.implementation) && (
            <Block title="Analysis / implementation">
              <Bullets items={project.implementation!} />
            </Block>
          )}
          {(has(project.results) || (project.figures?.length ?? 0) > 0 || project.extras?.length) && (
            <Block title="Results">
              {has(project.results) && <Bullets items={project.results!} />}
              {project.extras?.includes("thesis") && <ThesisExtras />}
              {project.extras?.includes("foodpanda") && <FoodpandaExtras />}
              {(project.figures?.length ?? 0) > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.figures!.map((f) => (
                    <figure key={f.src} className="overflow-hidden rounded-2xl border border-forest/10 bg-white">
                      <SafeImage src={f.src} alt={f.alt} fit="contain" className="max-h-80 w-full bg-white p-2" />
                      <figcaption className="border-t border-forest/10 px-3 py-2 text-xs text-forest/70">
                        {f.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </Block>
          )}
          {has(project.insights) && (
            <Block title="Key insights">
              <Bullets items={project.insights!} />
            </Block>
          )}
          {project.value && (
            <Block title="Business / research value">
              <p className="text-sm leading-relaxed text-forest/85">{project.value}</p>
            </Block>
          )}
          {(has(project.limitations) || has(project.future)) && (
            <Block title="Limitations & future improvements">
              <div className="grid gap-5 md:grid-cols-2">
                {has(project.limitations) && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">Limitations</p>
                    <Bullets items={project.limitations!} />
                  </div>
                )}
                {has(project.future) && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">Next steps</p>
                    <Bullets items={project.future!} />
                  </div>
                )}
              </div>
            </Block>
          )}
          <Block title="Links">
            {hasLinks ? (
              <div className="flex flex-wrap gap-3">
                {links.repo && (
                  <a className="btn-secondary" href={links.repo} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden className="h-4 w-4" /> GitHub repository
                  </a>
                )}
                {links.demo && (
                  <a className="btn-secondary" href={links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink aria-hidden className="h-4 w-4" /> Live demo
                  </a>
                )}
                {links.paper && (
                  <a className="btn-secondary" href={links.paper} target="_blank" rel="noopener noreferrer">
                    <ExternalLink aria-hidden className="h-4 w-4" /> Paper
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-forest/70">
                No public repository or live demo has been linked for this project yet.
              </p>
            )}
          </Block>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && <ProjectDetail key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}
