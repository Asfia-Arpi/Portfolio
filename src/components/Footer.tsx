import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { navItems } from "./Navbar";

/** Floating back-to-top button that appears after scrolling. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-mint shadow-lift transition hover:-translate-y-1 hover:bg-teal-dark"
    >
      <ArrowUp aria-hidden className="h-5 w-5" />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear(); // updates automatically
  return (
    <footer className="bg-forest text-ivory">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <p className="font-display text-2xl font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ivory/70">{profile.role}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-ivory/75 hover:text-mint">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-3" aria-label="Social links">
          {profile.github && (
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 hover:border-mint hover:text-mint">
                <Github aria-hidden className="h-5 w-5" />
              </a>
            </li>
          )}
          {profile.linkedin && (
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 hover:border-mint hover:text-mint">
                <Linkedin aria-hidden className="h-5 w-5" />
              </a>
            </li>
          )}
          {profile.email && (
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 hover:border-mint hover:text-mint">
                <Mail aria-hidden className="h-5 w-5" />
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="border-t border-ivory/15">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-ivory/60">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 hover:text-mint">
            Back to top <ArrowUp aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
