import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-[min(720px,calc(100%-2.5rem))] flex-col justify-center py-20">
      <p className="section-label">404</p>
      <h1 className="section-title">Page not found</h1>
      <p className="section-copy">
        That route doesn&apos;t exist on this portfolio.
      </p>
      <Link href="/" className="btn btn-primary mt-8 w-fit">
        Back home
      </Link>
    </div>
  );
}
