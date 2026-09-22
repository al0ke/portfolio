import { nowItems } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function NowSection() {
  return (
    <section id="now" className="section">
      <Reveal>
        <p className="section-label">Now</p>
        <h2 className="section-title">Current focus</h2>
        <p className="section-copy">
          Living status, not a static resume dump. Updated for Fall 2026 —
          internship season, agent tooling, and public security shipping.
        </p>
      </Reveal>

      <div className="mt-10">
        {nowItems.map((item, index) => (
          <Reveal key={item.title} delay={0.04 * index}>
            <article className="now-item">
              <span className="status-pill">{item.status}</span>
              <div>
                <h3 className="m-0 text-[1.05rem] font-medium tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-2 m-0 max-w-[40rem] text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {item.detail}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
