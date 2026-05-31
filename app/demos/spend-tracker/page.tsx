import Link from "next/link";

export const metadata = {
  title: "Spend Tracker — Demo Coming Soon",
};

export default function SpendTrackerDemo() {
  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-20 py-32 max-w-3xl mx-auto">
      <p className="section-label mb-4">demo · spend tracker</p>
      <h1 className="editorial-line text-4xl text-text mb-6">Spend tracker</h1>
      <p className="text-muted leading-relaxed mb-10">
        This interactive demo will go live in phase 2 — budget visibility and
        spend analysis for real ops teams.
      </p>
      <Link href="/" className="text-accent hover:underline text-sm">
        ← Back to portfolio
      </Link>
    </div>
  );
}
