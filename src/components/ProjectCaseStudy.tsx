import Link from "next/link";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const isArchive = project.status === "archive";

  return (
    <article className="mx-auto w-[min(920px,calc(100%-2.5rem))] pb-24 pt-12">
      <Reveal>
        <Link
          href="/#work"
          className="link-quiet font-[family-name:var(--font-mono)] text-xs tracking-wide"
        >
          ← Work
        </Link>

        <p className="section-label mt-10">
          {isArchive ? "Archive case study" : "Case study"} / {project.year}
        </p>
        <h1 className="m-0 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[38rem] text-[1.05rem] leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>

        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-8 font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--faint)]">
            No public Code link — private or archived work.
          </p>
        )}
      </Reveal>

      <Reveal delay={0.06}>
        <div className="project-cover mt-12">
          <span className="project-cover-label">{project.coverLabel}</span>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-12">
        {(
          [
            ["Problem", project.problem],
            ["Approach", project.approach],
            ["Outcome", project.outcome],
          ] as const
        ).map(([label, body], index) => (
          <Reveal key={label} delay={0.04 * index}>
            <section>
              <h2 className="m-0 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                {label}
              </h2>
              <p className="mt-3 m-0 max-w-[42rem] text-[1.02rem] leading-relaxed text-[var(--muted)]">
                {body}
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="mt-14 border-t border-[var(--line)] pt-8">
          <h2 className="m-0 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            Tech stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 pl-0">
            {project.stack.map((item) => (
              <li
                key={item}
                className="border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </article>
  );
}
