export const site = {
  name: "Ali",
  handle: "al0ke",
  title: "Ali / al0ke — Cybersecurity Portfolio",
  description:
    "ACC LAN Cyber Security student in Austin building practical AI agent skills and MCP hardening tools. Seeking SOC and cyber roles.",
  url: "https://al0ke.vercel.app",
  location: "Austin, TX",
  email: "alifarttoosi98@gmail.com",
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
    status: "School",
    title: "ACC LAN Cyber Security",
    detail:
      "Cybersecurity student at Austin Community College (LAN Cyber Security track), based in Austin.",
  },
  {
    status: "Building",
    title: "MCP / skill hardening",
    detail:
      "Building AI agent skills for MCP and skill hardening — free secrets sniff check plus a full defensive audit skill ($49 draft).",
  },
  {
    status: "Seeking",
    title: "SOC / cyber roles",
    detail:
      "Looking for SOC and cybersecurity roles. Recent experience with a Texas agency CISO office (CSOC).",
  },
  {
    status: "Systems",
    title: "School + career systems",
    detail:
      "Keeping coursework, applications, and this portfolio aligned as the employer-facing source of truth.",
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
  "ACC LAN Cyber Security",
  "CSOC IT Risk Analyst (Texas agency)",
  "MCP / agent skill hardening",
  "Seeking SOC / cyber roles",
] as const;
