import type { EducationItem } from "../types";

/** Source: CV. Add coursework / achievements arrays to show them (hidden while empty). */
export const education: EducationItem[] = [
  {
    id: "bsc",
    degree: "B.Sc. in Software Engineering (Major in Data Science)",
    institution: "Daffodil International University (DIU)",
    location: "Dhaka, Bangladesh",
    period: "2022 – 2026",
    score: "CGPA: 3.29 / 4.00",
    note: "Status: Completed",
    coursework: [],
    achievements: [
      "Top 5 in the 3-Minute Thesis (3MT) Competition",
      "Executive Member, DIU Software Club",
      "General Member, DIU Data Science Club and DIU Readers Club",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (H.S.C.)",
    institution: "Barishal Govt. Women's College",
    location: "Barishal",
    period: "2020",
    score: "GPA: 5.00 / 5.00",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (S.S.C.)",
    institution: "Barishal Govt. Girls High School",
    location: "Barishal",
    period: "2017",
    score: "GPA: 5.00 / 5.00",
  },
];
