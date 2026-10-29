import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/certifications";
import { Reveal, Section } from "./ui";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Verified credentials"
      intro="Each credential links to its issuer's verification page."
      tone="sage"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.05}>
            <article className="card flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-mint">
                <Award aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1 text-sm text-forest/70">{c.issuer}</p>

              <dl className="mt-4 space-y-1.5 text-sm">
                {c.issueDate && (
                  <div className="flex gap-2">
                    <dt className="text-forest/60">Issued:</dt>
                    <dd className="font-medium">{c.issueDate}</dd>
                  </div>
                )}
                {c.detail && (
                  <div className="flex gap-2">
                    <dt className="text-forest/60">Details:</dt>
                    <dd className="font-medium">{c.detail}</dd>
                  </div>
                )}
                {c.credentialId && (
                  <div className="flex gap-2">
                    <dt className="text-forest/60">Credential ID:</dt>
                    <dd className="font-medium">{c.credentialId}</dd>
                  </div>
                )}
              </dl>

              {c.verifyUrl && (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-auto !min-h-[42px] self-start !px-5"
                  style={{ marginTop: "1.25rem" }}
                >
                  Verify credential <ExternalLink aria-hidden className="h-4 w-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
