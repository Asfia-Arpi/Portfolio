import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

/** Fades/slides children in when they scroll into view. Honors reduced-motion via <MotionConfig>. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Page section with an eyebrow + title. `tone` alternates ivory / sage backgrounds. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "ivory",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "ivory" | "sage";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative py-20 sm:py-28 ${tone === "sage" ? "bg-sage/70" : "bg-ivory"}`}
    >
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-forest/75">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Image that shows a tidy placeholder instead of a broken icon if the file is missing. */
export function SafeImage({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src?: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (image unavailable)`}
        className={`flex items-center justify-center bg-sage text-forest/40 ${className}`}
      >
        <ImageOff aria-hidden className="h-8 w-8" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}

/** Shown only when it adds information: the unverified-dataset practice project gets a badge. */
export function StatusBadge({ status }: { status: "completed" | "practice" }) {
  if (status === "completed") return null;
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
      Practice dataset
    </span>
  );
}

/** Small list used in several sections. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-forest/85">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
