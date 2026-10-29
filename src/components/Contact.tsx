import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, TriangleAlert } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal, Section } from "./ui";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "min-h-[46px] w-full rounded-2xl border border-forest/15 bg-white px-4 py-2.5 text-sm placeholder:text-forest/40 focus:border-teal focus:outline-none";

/**
 * The form is only rendered when VITE_FORM_ENDPOINT is configured (see README), so it always works
 * and never claims success it cannot guarantee. Otherwise the section shows a clean "Let's connect" email button.
 */
function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot filled → bot

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });
      if (!res.ok) throw new Error(`The form service replied with status ${res.status}.`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={`${inputClass} mt-1.5`} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" required rows={5} className={`${inputClass} mt-1.5 resize-y`} />
      </label>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite" className="min-h-[1.5rem] text-sm">
        {status === "success" && (
          <p className="flex items-center gap-2 text-teal-dark">
            <CheckCircle2 aria-hidden className="h-4 w-4" /> Thanks — your message was sent.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 text-red-700">
            <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Your message was not sent. {error} Please email me directly at{" "}
              <a className="underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  const hasForm = Boolean(profile.formEndpoint);
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's connect"
      intro="Have a data problem or opportunity to discuss? I'd like to hear about it."
      tone="ivory"
    >
      <div className={`grid gap-8 ${hasForm ? "lg:grid-cols-[0.8fr_1.2fr]" : "lg:grid-cols-2"}`}>
        <Reveal>
          <div className="space-y-4">
            {profile.email && (
              <a
                href={mailto}
                className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Mail aria-hidden className="h-5 w-5 text-teal" />
                <span className="text-sm">
                  <span className="block text-xs text-forest/60">Email</span>
                  {profile.email}
                </span>
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Linkedin aria-hidden className="h-5 w-5 text-teal" />
                <span className="text-sm">
                  <span className="block text-xs text-forest/60">LinkedIn</span>
                  asfiahaque-arpi
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Github aria-hidden className="h-5 w-5 text-teal" />
                <span className="text-sm">
                  <span className="block text-xs text-forest/60">GitHub</span>
                  Asfia-Arpi
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {hasForm ? (
            <ContactForm />
          ) : (
            <div className="card relative flex h-full flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-mint/60 p-8">
              <p className="font-display text-2xl font-semibold">Let's connect</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest/75">
                The quickest way to reach me is email. I read every message.
              </p>
              <a href={mailto} className="btn-primary mt-6 self-start">
                <Mail aria-hidden className="h-4 w-4" /> Email me <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
