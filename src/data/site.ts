export const site = {
  name: "Ali",
  handle: "al0ke",
  title: "Ali / al0ke — Cybersecurity Portfolio",
  description:
    "Cybersecurity student in Austin building security tools and AI-assisted ops. Selected work in AppSec, GRC, and agent systems.",
  url: "https://al0ke.vercel.app",
  location: "Austin, TX",
  graduation: "2027",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/al0ke",
      handle: "al0ke",
    },
    {
      label: "X",
      href: "https://x.com/0xal0ke",
      handle: "0xal0ke",
    },
  ],
} as const;

export const nowItems = [
  {
    status: "Active",
    title: "Internship hunt",
    detail:
      "Actively applying for cybersecurity, GRC, and AppSec internships on Handshake.",
  },
  {
    status: "Building",
    title: "Hermes",
    detail:
      "AI/ops agent work — multi-agent tooling for research, triage, and secure automation.",
  },
  {
    status: "Shipping",
    title: "PhishGuard",
    detail:
      "Polishing the public phishing analysis agent and live demo on Vercel.",
  },
  {
    status: "Private",
    title: "Prism OSINT",
    detail:
      "Continuing OSINT case-study work in a private repo — write-up on this site, no public code link.",
  },
  {
    status: "Systems",
    title: "School + career",
    detail:
      "CS coursework toward 2027 and keeping this portfolio as the employer-facing source of truth.",
  },
] as const;

export const experience = [
  {
    role: "IT Risk Analyst Intern",
    org: "Texas agency CISO office — CSOC",
    period: "Jun 2026 — Aug 2026",
    bullets: [
      "Monitored security alerts and events in the CSOC SIEM, triaging and escalating potential incidents.",
      "Conducted IT risk assessments and vulnerability scans across infrastructure and applications.",
      "Assisted with security audit preparation, compliance documentation, and NIST/CIS control mapping.",
      "Collaborated on threat intelligence, incident response playbooks, and remediation tracking.",
      "Developed automation scripts to streamline alert triage and reporting workflows.",
    ],
  },
] as const;

export const quickFacts = [
  "Austin, Texas",
  "CS, graduating 2027",
  "CSOC IT Risk Analyst (Texas agency)",
  "Bug bounty (HackerOne)",
  "Hermes agent builder",
] as const;
