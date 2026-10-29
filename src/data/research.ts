import { asset } from "../lib/asset";

/**
 * Thesis content. Sources: your CV and Thesis_Final_presentation.pptx.
 * Empty arrays / empty strings are hidden on the site — fill them in when you have the material.
 */
export const thesis = {
  title: "A Hybrid Deep Learning Framework for Improved Breast Cancer Classification",
  // The final presentation uses this title; keep it here so you can decide which one to show.
  alternateTitle: "An Energy-Efficient Deep Learning Model for Breast Cancer Detection",
  type: "Undergraduate final-year thesis",
  institution: "Daffodil International University",
  supervisor: "Suprove Chandra Sarker, Lecturer, Department of Software Engineering, DIU",
  stack: ["Python", "TensorFlow", "Keras", "CNN", "Transfer Learning", "Computer Vision"],
  problem: [
    "Breast cancer is one of the main causes of death for women, so scalable and accurate diagnostic support is needed.",
    "Many existing models generalise poorly across datasets, and many are too complex for environments with limited resources.",
  ],
  researchGaps: [
    "Weak generalisation across diverse datasets",
    "Little attention to energy-efficient model design",
    "Limited magnification diversity in histopathology studies",
    "Lack of clinical data integration",
  ],
  objectives: [
    "Improve generalisation by training on diverse data",
    "Explore energy-efficient deep learning designs that reduce computational cost",
    "Support varied magnification levels",
    "Consider integrating clinical data",
  ],
  scope:
    "Histopathological images only (mammogram datasets excluded) with binary classification: benign vs malignant.",
  /** Visual storytelling for the Research section. Every line comes from the thesis presentation / CV. */
  pipeline: [
    { step: "Dataset", text: "Breast histopathology images, labelled benign or malignant (7,000+ records)." },
    { step: "Preprocessing", text: "Resize to 224 × 224, normalise, augment (flip, rotate, scale), 80/20 split." },
    { step: "Model training", text: "Transfer learning with EfficientNetB0/B2, MobileNetV2 and ResNet50." },
    { step: "Evaluation", text: "Accuracy, precision, recall, F1, ROC-AUC and confusion matrices." },
    { step: "Hybrid approach", text: "Features from two models fused into hybrid ensembles, then fine-tuned." },
    { step: "Results", text: "Hybrid ensemble reached 95.95% validation accuracy (research result only)." },
  ],
  methodology: [
    "Histopathology images split into two classes: benign and malignant",
    "Preprocessing: resize to 224 × 224, normalise, and augment (flipping, rotating, scaling)",
    "80% training / 20% validation split",
    "Train and compare pretrained CNN models (transfer learning)",
    "Combine the models' extracted features into hybrid (ensemble) models",
    "Fine-tune the top models, then evaluate on the validation set",
  ],
  architectures: {
    single: ["EfficientNetB0", "EfficientNetB2", "MobileNetV2", "ResNet50"],
    // As labelled on the presentation slides — double-check the pairs and edit if needed.
    hybrid: ["EfficientNetB0 + MobileNetV2", "EfficientNetB0 + ResNet50"],
    note: "Single-model and hybrid results were reported with training/validation accuracy curves, ROC-AUC curves and confusion matrices in the final presentation.",
  },
  evaluation: [
    "Metrics used: accuracy, precision, recall, F1-score, ROC-AUC and confusion matrices",
    "Dataset size: 7,000+ records (from CV)",
  ],
  /**
   * Hybrid ensemble confusion matrix on the validation set (read from the final presentation figure).
   * The accuracy shown on the site is CALCULATED from these four numbers — it matches the
   * 95.95% reported in the presentation's conclusion.
   */
  hybridConfusion: { tn: 466, fp: 38, fn: 26, tp: 1050 },
  /** Fill in which hybrid pair produced this matrix, if you want it displayed. */
  hybridConfusionModel: "",
  figures: [
    {
      src: asset("assets/thesis-workflow.jpg"),
      alt: "Flowchart of the thesis pipeline from histopathology images to benign or malignant prediction",
      caption: "Pipeline: preprocessing, split, CNN training, feature extraction, hybrid model, fine-tuning, evaluation.",
    },
    {
      src: asset("assets/thesis-hybrid-accuracy-curve.jpg"),
      alt: "Training versus validation accuracy curve for a hybrid model",
      caption: "Training vs validation accuracy for a hybrid model (from the final presentation).",
    },
  ],
  limitations: [
    "Results come from a single 80/20 split of one dataset; there is no external or multi-hospital validation yet.",
    "Training accuracy reaches 100% while validation accuracy plateaus near 96%, so some overfitting is likely.",
    "Binary classification only; clinical data was not integrated.",
    "This is a research study. It is not a validated medical diagnostic product and must not be used for clinical decisions.",
  ],
  future: [
    "Multi-hospital datasets to strengthen reliability across populations",
    "Multimodal inputs such as patient history or genomic data",
    "A user-friendly application to support pathologists (future work, not built)",
  ],
  researchInterests: [
    "Medical image analysis",
    "Deep learning and transfer learning",
    "Energy-efficient models",
    "Generalisation across datasets",
  ],
  /** Add real links only. */
  links: { paper: "", repo: "", slides: "" },
  /** Future outputs — hidden while empty. Example: { title: "Poster", url: "https://…" } */
  outputs: [] as { title: string; kind: string; url: string }[],
};

/** Accuracy computed from the confusion matrix above. */
export const hybridStats = (() => {
  const { tn, fp, fn, tp } = thesis.hybridConfusion;
  const total = tn + fp + fn + tp;
  return { total, accuracy: ((tn + tp) / total) * 100 };
})();
