import { asset } from "../lib/asset";
import type { Project } from "../types";
import { foodpandaFacts } from "./foodpanda";
import { hybridStats, thesis } from "./research";

/**
 * EDIT HERE — every project card and detail view is built from this list.
 * Rules this file follows:
 *  - Only finished, presentable projects are listed. Do NOT add planned or unfinished work.
 *  - "repo" / "demo" links stay EMPTY until a real URL exists (the buttons then hide).
 *  - Only verified results go in "highlights" and "results".
 *  - status: "completed" | "practice" ("practice" = finished, but built on an unverified public dataset)
 */
const allProjects: Project[] = [
  {
    id: "foodpanda",
    kind: "dashboard",
    title: "Foodpanda Business Intelligence Dashboard",
    tagline: "Business Intelligence · Power BI, DAX, SQL, Python",
    summary:
      "Which restaurants, dishes, customer groups and payment methods drive orders and revenue? An interactive Power BI dashboard that turns order-level data into KPIs for sales, customers and delivery.",
    categories: ["Business Intelligence", "Data Analytics"],
    stack: ["Power BI", "DAX", "SQL", "Python"],
    status: "practice",
    statusNote: "Built on a public Kaggle dataset; the data is not verified, so figures show technique, not a real business.",
    thumbnail: asset("assets/foodpanda-dashboard.jpg"),
    thumbnailAlt: "Screenshot of the Foodpanda Power BI dashboard",
    highlights: [
      "Revenue is spread evenly across 5 restaurants (2.64M–3.00M each)",
      "Pasta is the most-ordered dish (443 orders); payment methods split almost evenly",
    ],
    problem:
      "Order-level data is hard to read as raw rows. The goal was to answer practical questions: how much revenue and how many orders, which restaurants and dishes lead, which customers order most, and how delivery and ratings look.",
    objectives: [
      "Define clear KPIs with DAX instead of summing raw columns",
      "Show sales, customer and delivery views on one page",
      "Let a viewer filter by restaurant and date range with slicers",
    ],
    dataset: {
      name: "Foodpanda-style orders dataset (6,000+ orders, 5 restaurants)",
      source: "Kaggle (public dataset)",
      note: "Not verified and not real Foodpanda company data.",
    },
    methodology: [
      "Inspect the columns and check that one order_id is not counted more than once",
      "Calculate revenue as quantity × price and count orders with DISTINCTCOUNT",
      "Build a Date Table and relate it to order_date for trend analysis",
      "Design KPI cards, a revenue trend, and category, restaurant, payment and customer views",
    ],
    implementation: [
      "DAX measures for sales, orders, customers, ratings, delivery status and churn",
      "Slicers for order date and restaurant",
      "Customer views by age group and order frequency; revenue by restaurant; payment-method split",
    ],
    results: [
      "Dashboard summary on the practice dataset: 14.34M revenue, 6K orders, 6K customers, 3.01 average rating, 5 restaurants.",
    ],
    figures: [
      {
        src: asset("assets/foodpanda-dashboard.jpg"),
        alt: "Foodpanda Business Intelligence Dashboard in Power BI",
        caption: "Executive overview page of the Power BI dashboard.",
      },
    ],
    insights: foodpandaFacts,
    value:
      "Shows how an analyst can turn order-level data into KPIs a business team can monitor: revenue, orders, ratings, delivery status and customer behaviour.",
    limitations: [
      "The dataset is public and unverified, so the insights do not describe a real business.",
      "No published live dashboard link yet.",
    ],
    future: [
      "Publish the dashboard and add a live link",
      "Validate churn and delivery-status fields before final publishing",
    ],
    links: { repo: "https://github.com/Asfia-Arpi/Foodpanda-business-intelligence-dashboard", demo: "" },
    extras: ["foodpanda"],
  },
  {
    id: "thesis",
    kind: "research",
    title: "Hybrid Deep Learning for Breast Cancer Classification",
    tagline: "Undergraduate Thesis / Research Project · AI & Computer Vision",
    summary:
      "Can combining pretrained CNNs classify breast histopathology images more reliably? A research study comparing CNN models and hybrid ensembles for benign vs malignant classification.",
    categories: ["Machine Learning", "Research"],
    stack: ["Python", "TensorFlow", "Keras", "CNN", "Transfer Learning", "Computer Vision"],
    status: "completed",
    statusNote: "Academic research — not a clinically validated diagnostic tool.",
    thumbnail: asset("assets/thesis-workflow.jpg"),
    thumbnailAlt: "Flowchart of the thesis deep learning pipeline",
    highlights: [
      `Hybrid ensemble reached ${hybridStats.accuracy.toFixed(2)}% validation accuracy`,
      "Compared 4 pretrained CNNs and hybrid ensembles built from them",
    ],
    problem: thesis.problem.join(" "),
    objectives: thesis.objectives,
    dataset: {
      name: "Breast histopathology images (benign / malignant), 7,000+ records",
      source: "", // add the dataset name and link here when you want it shown
      note: "Binary classification; 80/20 train/validation split.",
    },
    methodology: thesis.methodology,
    implementation: [
      "Preprocessing pipeline: resize to 224 × 224, normalisation, flip / rotate / scale augmentation",
      "Transfer learning with EfficientNetB0, EfficientNetB2, MobileNetV2 and ResNet50",
      "Feature fusion of two models into hybrid ensembles, followed by fine-tuning of top models",
      "Evaluation with accuracy, precision, recall, F1-score, ROC-AUC and confusion matrices",
    ],
    results: [
      `Hybrid ensemble: ${hybridStats.accuracy.toFixed(2)}% accuracy on a ${hybridStats.total.toLocaleString()}-image validation set (calculated from the confusion matrix; matches the 95.95% reported in the final presentation).`,
      "The presentation also reports training/validation curves, ROC-AUC curves and confusion matrices for each single model and each hybrid.",
    ],
    figures: thesis.figures,
    insights: [
      "Fine-tuned CNNs and hybrid ensembles achieved high performance on histopathology image classification, up to 95.95% accuracy.",
    ],
    value:
      "Demonstrates experimental design, model comparison and honest evaluation on a medical-imaging task. It is a research study only.",
    limitations: thesis.limitations,
    future: thesis.future,
    links: { repo: "", paper: "" },
    extras: ["thesis"],
  },
  {
    id: "ml-projects",
    kind: "software",
    title: "Machine Learning Projects",
    tagline: "Machine Learning · Python, NumPy, Pandas, Matplotlib",
    summary:
      "Two end-to-end supervised-learning projects: predicting whether a customer will buy a holiday package, and classifying IMDb movie reviews as positive or negative (NLP).",
    categories: ["Machine Learning"],
    stack: ["Python", "NumPy", "Pandas", "Matplotlib"],
    status: "completed",
    objectives: [
      "Predict whether a customer is likely to purchase a holiday package from customer-related information",
      "Classify IMDb movie reviews as positive or negative with an end-to-end NLP workflow",
    ],
    methodology: [
      "Prepare and explore the data with Pandas and NumPy",
      "Train and evaluate machine learning models",
      "Visualise findings with Matplotlib",
    ],
    links: { repo: "https://github.com/Asfia-Arpi/ML-Projects/blob/main/Holiday-package-prediction_.ipynb" },
  },
  {
    id: "hospital",
    kind: "software",
    title: "Hospital Management System",
    tagline: "Software Engineering · Python, SQL · academic project",
    summary:
      "How can routine hospital workflows be automated and reported on? A backend system with relational database schemas and optimised SQL queries for performance reporting.",
    categories: ["Software Engineering"],
    stack: ["Python", "SQL"],
    status: "completed",
    objectives: [
      "Automate common hospital workflows",
      "Design relational schemas and optimised queries that support performance reporting",
    ],
    value: "Shows relational database design and SQL for reporting — the data foundation behind most analytics work.",
    links: { repo: "" },
  },
];

/** Display order — Data/BI first. Change the ids here to reorder or hide a project. */
const order = ["foodpanda", "thesis", "ml-projects", "hospital"];
export const projects: Project[] = order
  .map((id) => allProjects.find((p) => p.id === id))
  .filter((p): p is Project => p !== undefined);

export const projectFilters = [
  "All",
  "Data Analytics",
  "Business Intelligence",
  "Machine Learning",
  "Research",
  "Software Engineering",
] as const;
