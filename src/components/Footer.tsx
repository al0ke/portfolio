import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-[min(1040px,calc(100%-2.5rem))] flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--muted)]">
          © {new Date().getFullYear()} {site.name} / {site.handle}
        </p>
        <div className="flex flex-wrap gap-5">
          {site.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet text-sm"
            >
              {social.label}
            </a>
          ))}
          <Link href="/#work" className="link-quiet text-sm">
            Work
          </Link>
        </div>
      </div>
    </footer>
  );
}
