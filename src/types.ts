// Shared TypeScript types. Content itself lives in /src/data — edit those files, not the components.

/** Only finished work is shown publicly. "practice" = completed, but built on an unverified public dataset. */
export type ProjectStatus = "completed" | "practice";

export type ProjectCategory =
  | "Data Analytics"
  | "Business Intelligence"
  | "Machine Learning"
  | "Research"
  | "Software Engineering";

export interface ProjectFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  /** Controls the visual treatment of the card (research / dashboard / software). */
  kind: "research" | "dashboard" | "software";
  tagline: string;
  /** Card text: lead with the business or research problem. */
  summary: string;
  categories: ProjectCategory[];
  stack: string[];
  status: ProjectStatus;
  /** Short honest note shown on the card, e.g. "Public Kaggle dataset — not verified". */
  statusNote?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  /** Short, VERIFIED takeaways for the card. Leave empty if nothing is verified yet. */
  highlights?: string[];
  // ---- Detail view sections (any empty section is hidden automatically) ----
  problem?: string;
  objectives?: string[];
  dataset?: { name: string; source?: string; note?: string };
  methodology?: string[];
  implementation?: string[];
  results?: string[];
  figures?: ProjectFigure[];
  insights?: string[];
  /** Why the project matters (business or research value). */
  value?: string;
  limitations?: string[];
  future?: string[];
  /** Real URLs only. A button is shown only when the URL exists. */
  links?: { repo?: string; demo?: string; paper?: string };
  /** Special blocks rendered inside the detail view. */
  extras?: Array<"foodpanda" | "thesis">;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
  /** "core" is the deep area (visually dominant); "support" is breadth. */
  tier: "core" | "support";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string; // display text, e.g. "Aug 21, 2025"
  detail?: string; // e.g. "20 course hours"
  credentialId?: string;
  verifyUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  score: string;
  note?: string;
  coursework?: string[];
  achievements?: string[];
}
