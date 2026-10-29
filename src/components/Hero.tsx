import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { SafeImage } from "./ui";

/** Decorative botanical leaf drawn with SVG — purely visual, hidden from screen readers. */
function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 160" className={className} fill="currentColor">
      <path d="M60 4C96 40 112 84 60 156 8 84 24 40 60 4Z" />
      <path d="M60 24V150" stroke="#FAFAF5" strokeOpacity=".55" strokeWidth="2" fill="none" />
    </svg>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-sage/60 pb-20 pt-28 sm:pt-32"
    >
      {/* soft background shapes */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-mint/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sage blur-3xl" />
      <Leaf className="pointer-events-none absolute left-[4%] top-[58%] hidden h-28 w-20 rotate-[-24deg] text-teal/15 lg:block" />
      <Leaf className="pointer-events-none absolute right-[46%] top-[16%] hidden h-20 w-14 rotate-[28deg] text-forest/10 lg:block" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p {...fade(0)} className="eyebrow">
            {profile.name}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Data Analyst <span className="text-teal">&amp; BI Specialist</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-5 text-lg font-semibold text-forest/85 sm:text-xl">
            {profile.tagline}
          </motion.p>
          <motion.p {...fade(0.24)} className="mt-4 max-w-xl text-base leading-relaxed text-forest/75">
            {profile.intro}
          </motion.p>

          <motion.ul {...fade(0.3)} aria-label="Core tools" className="mt-5 flex flex-wrap gap-2">
            {profile.heroTools.map((t) => (
              <li key={t} className="chip !bg-white/90 !px-3.5 !py-1.5 !text-sm !font-semibold">
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.36)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View My Projects <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail aria-hidden className="h-4 w-4" /> Let's connect
            </a>
          </motion.div>

          <motion.ul {...fade(0.44)} className="mt-8 flex items-center gap-3" aria-label="Social links">
            {profile.github && (
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-white/70 transition hover:-translate-y-0.5 hover:border-teal hover:text-teal"
                >
                  <Github aria-hidden className="h-5 w-5" />
                </a>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-white/70 transition hover:-translate-y-0.5 hover:border-teal hover:text-teal"
                >
                  <Linkedin aria-hidden className="h-5 w-5" />
                </a>
              </li>
            )}
            <li className="ml-1 text-sm text-forest/60">{profile.location}</li>
          </motion.ul>
        </div>

        {/* Portrait-led composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md"
        >
          <div aria-hidden className="leaf-shape absolute -inset-4 rotate-6 bg-gradient-to-br from-mint to-sage" />
          <div aria-hidden className="leaf-shape absolute -inset-1 -rotate-3 border border-teal/30" />
          <div className="leaf-shape relative aspect-[4/5] overflow-hidden shadow-lift">
            <SafeImage
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-[50%_18%]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
