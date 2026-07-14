import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Supervised Visitation & Monitored Exchange Services",
  description:
    "Court-ordered supervised visitation, monitored child exchanges, therapeutic visitation, and court/DCF documentation across Northeast Florida.",
  alternates: { canonical: "/services" },
};

const referralSources = [
  "Family & dependency court orders",
  "Department of Children and Families (DCF) case managers",
  "Family law attorneys and guardians ad litem",
  "Private agreements between co-parents",
];

const process = [
  {
    step: "1. Intake",
    detail: "Share your court order, DCF referral, or private request along with basic family information.",
  },
  {
    step: "2. Scheduling",
    detail: "We coordinate a neutral time and location for visitation or exchange that works within court/DCF requirements.",
  },
  {
    step: "3. Supervised Visit or Exchange",
    detail: "A trained, neutral professional observes the visit or manages the handoff to keep the focus on the child's safety and comfort.",
  },
  {
    step: "4. Documentation",
    detail: "Objective visit notes and reports are prepared and made available to the court, DCF, or attorneys as required.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <Image
          src="/images/family-hug.jpg"
          alt="A mother laughing with her son as he rides on her back"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/70 to-harbor-950/40" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">Our Services</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            Supervised visitation and monitored exchange services across {siteConfig.serviceArea}
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
      <p className="max-w-3xl text-lg text-harbor-700">
        Every service is delivered with the same commitment: a conflict-free, structured
        environment that protects children and keeps the process fair to every parent, caregiver,
        and agency involved.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.slug} id={service.slug} className="rounded-2xl border border-harbor-100 p-8 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-harbor-900">{service.name}</h2>
            <p className="mt-3 text-harbor-600">{service.summary}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="section-label">Who Refers Families to Us</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-harbor-900">Referral sources we work with</h2>
          <ul className="mt-6 space-y-3 text-harbor-700">
            {referralSources.map((source) => (
              <li key={source} className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-dawn-500" />
                {source}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label">How It Works</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-harbor-900">From referral to documented visit</h2>
          <ol className="mt-6 space-y-5">
            {process.map((item) => (
              <li key={item.step} className="rounded-xl bg-harbor-50 p-4">
                <p className="font-semibold text-harbor-900">{item.step}</p>
                <p className="mt-1 text-sm text-harbor-600">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-20 rounded-2xl bg-sunrise p-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Can't cover the full cost?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Our Family Visitation Sponsorship Fund helps qualifying families access these services.
        </p>
        <Link href="/donate" className="btn-secondary mt-6 inline-block bg-white text-harbor-900 hover:bg-harbor-50">
          Learn About the Sponsorship Fund
        </Link>
      </div>
      </div>
    </div>
  );
}
