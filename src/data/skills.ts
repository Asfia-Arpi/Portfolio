import type { SkillGroup } from "../types";

/**
 * T-shaped profile: ONE deep area (core) + supporting breadth.
 * No percentage bars and no invented levels. Keep this list short — only what you can discuss in an interview.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "analytics",
    tier: "core",
    title: "Data Analytics & Business Intelligence",
    blurb: "My core focus: turning raw data into KPIs, dashboards and clear findings.",
    skills: [
      "SQL",
      "Power BI",
      "DAX",
      "Excel",
      "Data Analysis",
      "Data Visualization",
      "Python for Data Analysis",
    ],
  },
  {
    id: "software",
    tier: "support",
    title: "Programming & Software",
    blurb: "Software engineering foundations behind my analysis work.",
    skills: ["Python", "C", "HTML", "CSS", "Git", "GitHub"],
  },
  {
    id: "ml",
    tier: "support",
    title: "AI / Machine Learning",
    blurb: "Applied in coursework and my undergraduate thesis.",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP Fundamentals"],
  },
];
