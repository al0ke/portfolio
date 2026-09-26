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
 * Project truth:
 * - MCP / Agent Skill Security Audit: portable SKILL.md product ($49 draft;
 *   do not claim a live Gumroad listing). No public GitHub repo yet → write-up only.
 * - MCP Secret Leak Check: free companion mini-skill (secrets-only). Write-up only.
 * - Hermes / Prism: private write-ups — no public Code links.
 * - Content Empire: archive only.
 * - Do not feature third-party OSINT forks as product source.
 */
export const projects: Project[] = [
  {
    slug: "mcp-skill-audit",
    title: "MCP / Agent Skill Security Audit",
    tagline:
      "Portable defensive audit skill for MCP configs and agent skills — leaky tools, overbroad permissions, injected instructions.",
    status: "current",
    year: "2026",
    coverLabel: "Skill hardening report",
    problem:
      "Agent stacks ship with mcp.json tool lists and drop-in skills that are easy to misconfigure: secrets in plain configs, overbroad filesystem or shell tools, and skills that inject unexpected instructions into the model context.",
    approach:
      "Building a portable SKILL.md that runs as a defensive audit: inspect MCP server configs, flag dangerous tool grants, review skill files for injection/exfiltration patterns, and produce a hardening report an operator can act on.",
    outcome:
      "Draft product framed as a paid portable skill ($49). Not claiming a live Gumroad listing yet — write-up and portfolio case study while packaging and distribution are finalized. No public Code button until a public repo exists.",
    stack: ["SKILL.md", "MCP", "Agent tooling", "Security review", "Hardening"],
    links: [],
  },
  {
    slug: "mcp-secret-leak",
    title: "MCP Secret Leak Check",
    tagline:
      "Free companion mini-skill — a secrets-only sniff test for MCP configs and skill files.",
    status: "current",
    year: "2026",
    coverLabel: "Secrets sniff test",
    problem:
      "Before a full hardening pass, operators need a fast way to catch API keys, tokens, and credentials sitting in mcp.json, env stubs, or skill markdown.",
    approach:
      "A lightweight free mini-skill that focuses only on secret patterns: scan common MCP and skill paths, highlight likely leaks, and point to next steps without trying to replace a full audit.",
    outcome:
      "Positioned as a free lead / companion to the full MCP / Agent Skill Security Audit. Write-up only for now — no public Code link until a public repo ships.",
    stack: ["SKILL.md", "MCP", "Secret scanning", "Developer tooling"],
    links: [],
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
      "Ongoing private build. This case study covers problem framing and stack direction without claiming a public release.",
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
      "Private investigation platform direction: modular collectors, AI-assisted analysis, and a real-time dashboard for domains, IPs, emails, phones, and usernames.",
    outcome:
      "Case-study status only. Working repo is private. No public Code button — third-party forks are not presented as product source.",
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
      "Stood up a multi-agent pipeline (research → draft → approval gates → schedule) with a Next.js/Supabase control surface.",
    outcome:
      "Useful learning on agent ops and approval UX. The clipping workflow has ended and is not part of the live Now focus.",
    stack: ["Python", "Next.js", "Agent tooling", "Supabase"],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.status === "current");
export const archiveProjects = projects.filter((p) => p.status === "archive");
