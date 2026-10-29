import type { Certification } from "../types";

/**
 * Taken from the certificate files you provided. Never add an ID or link you cannot verify.
 * Certificates live here (with verification links) — they are NOT bundled into the CV PDF.
 */
export const certifications: Certification[] = [
  {
    id: "aws-ml-foundations",
    name: "AWS Academy Graduate — Machine Learning Foundations",
    issuer: "AWS Academy",
    issueDate: "Aug 21, 2025",
    detail: "20 course hours",
    verifyUrl: "https://www.credly.com/go/U5mVbGbk",
  },
  {
    id: "aws-ml-nlp",
    name: "AWS Academy Graduate — Machine Learning for Natural Language Processing",
    issuer: "AWS Academy",
    issueDate: "Aug 21, 2025",
    detail: "20 course hours",
    verifyUrl: "https://www.credly.com/go/V2Fx93qy",
  },
  {
    id: "google-ai-fundamentals",
    name: "AI Fundamentals",
    issuer: "Google (via Coursera)",
    issueDate: "Jun 3, 2026",
    verifyUrl: "https://coursera.org/verify/LANA4XHOCLO0",
  },
];
