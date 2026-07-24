import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content section-pad text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-granite-800">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-granite-600">
        That page doesn’t exist — or it moved. Try the home page, How to Vote, or
        Meet Nick.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/how-to-vote" className="btn-outline">
          How to Vote Write-In
        </Link>
      </div>
    </div>
  );
}
