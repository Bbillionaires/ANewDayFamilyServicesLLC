import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Donate | Family Visitation Sponsorship Fund",
  description:
    "Support the Family Visitation Sponsorship Fund and help families across Northeast Florida access supervised visitation services they couldn't otherwise afford.",
  alternates: { canonical: "/donate" },
};

const impactTiers = [
  { amount: "$49", impact: "Covers one monitored child exchange for a family in need." },
  { amount: "$90", impact: "Covers an intake session for a parent or guardian starting services." },
  { amount: "$120", impact: "Covers one hour of therapeutic, trauma-informed supervised visitation." },
];

export default function DonatePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <Image
          src="/images/donate-hero.jpg"
          alt="A parent and child holding hands, representing the families the sponsorship fund supports"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/75 to-harbor-950/45" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">Family Visitation Sponsorship Fund</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            Help a family get their new day
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
      <p className="max-w-3xl text-lg text-harbor-700">
        {siteConfig.name} is a professional Medicaid Provider and for-profit LLC — not a
        registered 501(c)(3) nonprofit. Contributions to the Family Visitation Sponsorship Fund
        support our community mission of making supervised visitation and monitored exchange
        services accessible to qualifying families who cannot cover the full cost. These
        contributions are <strong>not tax-deductible</strong>.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-harbor-100 p-8">
            <h2 className="font-display text-xl font-semibold text-harbor-900">
              What your contribution supports
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {impactTiers.map((tier) => (
                <div key={tier.amount} className="rounded-xl bg-harbor-50 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-dawn-600">{tier.amount}</p>
                  <p className="mt-2 text-xs text-harbor-600">{tier.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-harbor-100 p-8">
            <h2 className="font-display text-xl font-semibold text-harbor-900">
              Contribute via Square
            </h2>
            <p className="mt-3 text-sm text-harbor-600">
              Secure checkout is powered by Square. This button is a placeholder until a live
              Square location and access token are configured — see{" "}
              <code className="rounded bg-harbor-100 px-1.5 py-0.5 text-xs">.env.example</code>.
            </p>
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Square checkout is not yet configured for this deployment"
              className="btn-primary mt-6 cursor-not-allowed opacity-60"
            >
              Donate with Square (coming soon)
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-sunrise p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              Who benefits
            </p>
            <p className="mt-2 text-sm">
              Families referred by the courts, DCF, or through private hardship who qualify for
              reduced or sponsored fees for supervised visitation and monitored exchanges.
            </p>
          </div>
          <div className="rounded-2xl bg-harbor-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-harbor-500">
              Ask about sponsorship
            </p>
            <p className="mt-2 text-sm text-harbor-700">
              If your family needs support covering visitation fees, contact us at{" "}
              {siteConfig.phone} or {siteConfig.email} to ask about eligibility.
            </p>
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
}
