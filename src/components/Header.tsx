import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#now", label: "Now" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(6,7,8,0.72)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-[min(1040px,calc(100%-2.5rem))] items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-[-0.02em]"
        >
          {site.handle}
          <span className="text-[var(--accent)]">_</span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet font-[family-name:var(--font-mono)] text-xs tracking-wide"
        >
          github/{site.handle}
        </a>
      </div>
    </header>
  );
}
