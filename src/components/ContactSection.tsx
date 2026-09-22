import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="section pb-24">
      <Reveal>
        <p className="section-label">Contact</p>
        <h2 className="section-title">Say hello</h2>
        <p className="section-copy">
          Open to cybersecurity, GRC, and AppSec conversations — internships,
          collaborations, and thoughtful feedback on the work.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap gap-3">
          {site.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {social.label}
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                /{social.handle}
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
