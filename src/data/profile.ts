import { asset } from "../lib/asset";

/**
 * EDIT HERE — personal details used across the whole site.
 * Anything left as an empty string is hidden automatically.
 */
export const profile = {
  name: "Asfia Haque Arpi",
  initials: "AH",
  /** Main hero headline. */
  title: "Data Analyst & BI Specialist",
  tagline: "Turning data into insights, dashboards and practical business solutions.",
  /** Short professional label used in the footer. */
  role: "Data Analyst / BI Specialist",
  intro:
    "Software Engineering graduate (Data Science major) who builds Power BI dashboards and SQL- and Python-based analysis to answer business questions.",
  /** Tool chips shown under the intro in the hero. */
  heroTools: ["Power BI", "SQL", "Python", "Excel"],
  location: "Dhaka, Bangladesh",
  email: "arpiasfia7@gmail.com",
  github: "https://github.com/Asfia-Arpi",
  linkedin: "https://www.linkedin.com/in/asfiahaque-arpi",
  /** Replace /public/assets/profile.jpg to change the portrait. */
  photo: asset("assets/profile.jpg"),
  /**
   * The ONE resume link (navbar). Must be the clean standalone CV.
   * Replace /public/files/Asfia_Haque_Arpi_CV.pdf to update it. Do not bundle certificates into it.
   */
  cvUrl: asset("files/Asfia_Haque_Arpi_CV.pdf"),
  languages: ["English (Fluent)", "Bangla (Native)"],
  targetRoles: ["Data Analyst", "Business Intelligence Analyst"],
  /**
   * Optional: set VITE_FORM_ENDPOINT (see README) to show a working contact form.
   * Without it the contact section shows a simple "Let's connect" email button instead.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "",
};

export const aboutParagraphs: string[] = [
  "I'm a Software Engineering graduate from Daffodil International University with a Data Science major, and my main focus is Data Analytics and Business Intelligence. I work with structured data, look for patterns, and present them as dashboards and findings that people can act on.",
  "My Foodpanda dashboard shows how I approach it: define the KPIs with DAX, check that the numbers are counted correctly, and build views for sales, customers and delivery. SQL and Python for data analysis support that work.",
  "My software engineering degree, machine learning coursework and undergraduate thesis give me a strong technical base. I can read code, build practical analytical projects and understand the AI concepts that increasingly sit behind data work.",
];

/** Things I can do — shown as a short list next to the About text. */
export const strengths: string[] = [
  "Work with structured data and relational databases",
  "Analyse patterns and define meaningful KPIs",
  "Build dashboards and communicate insights",
  "Solve technical problems with Python and SQL",
];
