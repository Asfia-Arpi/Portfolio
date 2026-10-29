import { MotionConfig } from "framer-motion";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Footer, { BackToTop } from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Skills from "./components/Skills";
import { useActiveSection } from "./hooks/useActiveSection";

// Order matters: this is the order sections appear on the page.
const sectionIds = ["home", "about", "skills", "projects", "research", "education", "certifications", "contact"];

export default function App() {
  const raw = useActiveSection(sectionIds);
  // Certifications sit under the "Education" nav link.
  const active = raw === "certifications" ? "education" : raw;
  return (
    // reducedMotion="user" turns off movement animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only z-50 rounded-full bg-forest px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
