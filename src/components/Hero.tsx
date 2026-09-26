import Link from "next/link";
import { quickFacts, site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] w-[min(1040px,calc(100%-2.5rem))] flex-col justify-center py-16"
    >
      <div className="hero-ambient" aria-hidden="true" />

      <p className="section-label mb-6">Portfolio / {site.handle}</p>

      <h1 className="max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
        {site.name}
        <span className="text-[var(--accent)]">.</span>
      </h1>

      <p className="mt-7 max-w-[34rem] text-[clamp(1.15rem,2.4vw,1.45rem)] font-medium leading-snug tracking-[-0.015em] text-[var(--fg)]">
        Cybersecurity student building practical AI agent skills and MCP
        hardening tools.
      </p>

      <p className="mt-4 max-w-[32rem] text-[0.98rem] leading-relaxed text-[var(--muted)]">
        ACC LAN Cyber Security in Austin. Seeking SOC and cyber roles — with
        selected write-ups on agent security and prior CSOC work.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/#work" className="btn btn-primary">
          Selected work
        </Link>
        <Link href="/#now" className="btn">
          What I&apos;m doing now
        </Link>
      </div>

      <ul className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--line)] pt-6 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em] text-[var(--faint)]">
        {quickFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}
