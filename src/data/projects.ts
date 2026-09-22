export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: "current" | "archive";
  year: string;
  coverLabel: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  links: ProjectLink[];
};

/**
 * Project truth (verified against GitHub API):
 * - phishguard-agent: public + demo https://phishguard-plum.vercel.app
 * - Prism / OSINT: private (prism-osint) — case study OK, NO public Code link
 * - Do not treat third-party OSINT platform forks as Ali's public product code
 * - Hermes: not public — case study only
 * - Content Empire: archive only (not current Now work)
 */
export const projects: Project[] = [
  {
    slug: "phishguard",
    title: "PhishGuard Agent",
    tagline:
      "AI-powered phishing threat analysis for suspicious URLs, email content, and brand impersonation.",
    status: "current",
    year: "2026",
    coverLabel: "Threat analysis UI",
    problem:
      "Analysts and students need a fast way to triage suspicious links and email paste-ins without jumping across VirusTotal, URL blocklists, and ad-hoc scripts.",
    approach:
      "Built a Next.js App Router tool that accepts a URL or email body, pulls threat intel (VirusTotal, URLhaus), detects brand lookalikes, extracts IOCs, and returns an AI-assisted verdict with a risk score.",
    outcome:
      "Public repo and live demo on Vercel. Useful as a portfolio AppSec artifact and a practical triage helper for phishing investigations.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "VirusTotal", "Vercel"],
    links: [
      {
        label: "Code",
        href: "https://github.com/al0ke/phishguard-agent",
      },
      {
        label: "Live demo",
        href: "https://phishguard-plum.vercel.app",
      },
    ],
  },
  {
    slug: "hermes",
    title: "Hermes",
    tagline:
      "AI/ops agent work for research, triage, and secure automation — private tooling, public write-up.",
    status: "current",
    year: "2026",
    coverLabel: "Agent orchestration",
    problem:
      "Security and ops workflows still burn time on repetitive research, draft generation, and tool switching across terminals, browsers, and chat.",
    approach:
      "Designing multi-agent flows with approval gates: research agents, triage helpers, and MCP-style IDE integrations so humans stay in the loop on anything that ships.",
    outcome:
      "Active build focus for internship season. Repo stays private; this case study covers the problem framing and stack direction without claiming a public release.",
    stack: ["Python", "Next.js", "Supabase", "MCP", "Agent tooling"],
    links: [],
  },
  {
    slug: "prism",
    title: "Prism OSINT",
    tagline:
      "OSINT investigation workspace — modules, analysis, and operator-facing dashboards.",
    status: "current",
    year: "2026",
    coverLabel: "OSINT workspace",
    problem:
      "OSINT work fragments across one-off scripts and SaaS panels. Operators need a coherent place to run modules, review findings, and keep OPSEC in view.",
    approach:
      "Building a private investigation platform direction: modular collectors, AI-assisted analysis, and a real-time dashboard for domains, IPs, emails, phones, and usernames.",
    outcome:
      "Case-study status only. The working repo is private (prism-osint). No public Code button — forks of third-party OSINT platforms are not presented as product source.",
    stack: ["Python", "OSINT modules", "Dashboards", "Threat intel"],
    links: [],
  },
  {
    slug: "content-empire",
    title: "Content Empire (archive)",
    tagline:
      "Former multi-agent content automation experiment — archived, not current work.",
    status: "archive",
    year: "2026",
    coverLabel: "Archived pipeline",
    problem:
      "Needed a way to research, draft, and schedule short-form posts with human approval before anything published.",
    approach:
      "Stood up a multi-agent pipeline (research → draft → approval gates → schedule) powered by Hermes-style agent orchestration and a Next.js/Supabase control surface.",
    outcome:
      "Useful learning on agent ops and approval UX. The clipping / content-empire workflow has ended and is no longer part of the live Now focus.",
    stack: ["Python", "Next.js", "Hermes Agent", "Supabase"],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.status === "current");
export const archiveProjects = projects.filter((p) => p.status === "archive");
