import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { profile } from "../data/profile";

/** Section links. The Resume button is rendered separately so there is exactly ONE CV access point. */
export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      active === id ? "bg-mint text-forest" : "text-forest/70 hover:text-forest"
    }`;

  const resumeBtn = (
    <a
      href={profile.cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary !min-h-[40px] !px-5"
    >
      <FileText aria-hidden className="h-4 w-4" /> Resume
      <span className="sr-only"> (PDF, opens in a new tab)</span>
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled || open ? "border-b border-forest/10 bg-ivory/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest font-display text-sm font-semibold text-mint">
            {profile.initials}
          </span>
          <span className="hidden font-display text-lg font-semibold sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={linkClass(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {resumeBtn}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-white/70 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-forest/10 bg-ivory lg:hidden">
          <ul className="container-x grid gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block ${linkClass(item.id)} !py-3 !text-base`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
