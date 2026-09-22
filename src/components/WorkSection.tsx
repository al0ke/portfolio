import Link from "next/link";
import { archiveProjects, featuredProjects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function WorkSection() {
  return (
    <section id="work" className="section">
      <Reveal>
        <p className="section-label">Work</p>
        <h2 className="section-title">Selected case studies</h2>
        <p className="section-copy">
          Each project has a problem → approach → outcome page. Public Code
          links only appear when the GitHub repo is actually public.
        </p>
      </Reveal>

      <div className="mt-10">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={0.04 * index}>
            <Link href={`/work/${project.slug}`} className="work-row group">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--faint)]">
                {project.year}
              </span>
              <div>
                <h3 className="m-0 text-[1.15rem] font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                  {project.title}
                </h3>
                <p className="mt-2 m-0 max-w-[38rem] text-[0.92rem] leading-relaxed text-[var(--muted)]">
                  {project.tagline}
                </p>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--accent)] opacity-80">
                Case study →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {archiveProjects.length > 0 ? (
        <div className="mt-14">
          <Reveal>
            <p className="section-label">Archive</p>
            <p className="section-copy">
              Past experiments kept for context — not current Now work.
            </p>
          </Reveal>
          <div className="mt-6">
            {archiveProjects.map((project) => (
              <Reveal key={project.slug}>
                <Link href={`/work/${project.slug}`} className="work-row group">
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--faint)]">
                    {project.year}
                  </span>
                  <div>
                    <h3 className="m-0 text-[1.05rem] font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 m-0 max-w-[38rem] text-[0.9rem] leading-relaxed text-[var(--muted)]">
                      {project.tagline}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--muted)]">
                    Archive →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
