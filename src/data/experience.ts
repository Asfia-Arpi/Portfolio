import type { ExperienceItem } from "../types";

/**
 * No formal work experience yet — this section shows activities and learning from the CV.
 * When you get an internship or job, add it here with type: "Internship" or "Work".
 */
export const experience: ExperienceItem[] = [
  {
    id: "software-club",
    title: "Executive Member",
    organization: "DIU Software Club",
    type: "Activity",
    description: "Coordinated cross-team planning and execution of departmental programs.",
  },
  {
    id: "3mt",
    title: "3-Minute Thesis (3MT) Competition",
    organization: "Daffodil International University",
    type: "Competition",
    description:
      "Presented a research idea to a panel within a strict time limit and placed in the top 5.",
  },
  {
    id: "clubs",
    title: "General Member",
    organization: "DIU Data Science Club and DIU Readers Club",
    type: "Activity",
    description: "Regular participant in technical discussions.",
  },
];
