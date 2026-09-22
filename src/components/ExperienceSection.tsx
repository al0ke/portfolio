import { experience } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="section-label">Experience</p>
        <h2 className="section-title">Recent role</h2>
        <p className="section-copy">
          Internship work framed at the agency level — no agency product names
          beyond Texas agency / CISO office.
        </p>
      </Reveal>

      <div className="mt-10 space-y-10">
        {experience.map((job) => (
          <Reveal key={job.role}>
            <article className="border-t border-[var(--line)] pt-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="m-0 text-[1.2rem] font-medium tracking-[-0.02em]">
                    {job.role}
                  </h3>
                  <p className="mt-1 m-0 text-[0.95rem] text-[var(--accent)]">
                    {job.org}
                  </p>
                </div>
                <p className="m-0 font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--faint)]">
                  {job.period}
                </p>
              </div>
              <ul className="mt-6 space-y-3 pl-0">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--muted)]"
                  >
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
