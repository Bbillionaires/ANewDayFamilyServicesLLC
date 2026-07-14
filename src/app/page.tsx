import type { Metadata } from "next";
import Link from "next/link";
import { coreValues, faqs, services, siteConfig } from "@/lib/siteConfig";
import { faqJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Supervised Visitation & Monitored Exchanges in Northeast Florida",
  description:
    "A New Day Family Services LLC provides safe, neutral supervised visitation and monitored child exchanges for Northeast Florida families connected to the courts, DCF, and private custody cases.",
  alternates: { canonical: "/" },
};

const trustSignals = [
  "Professional Medicaid Provider",
  "10+ years in the mental health field",
  "Neutral toward every parent, caregiver & agency",
  "Trauma-informed & culturally sensitive care",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sunrise text-white">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="section-label text-white/80">Supervised Visitation · {siteConfig.serviceArea}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              A safe, neutral new day for every family.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              {siteConfig.name} provides safe, structured supervised visitation and monitored
              child exchanges for families engaged with the courts, DCF, and private custody
              cases across {siteConfig.serviceArea} — remaining neutral and unbiased toward every
              parent, caregiver, and agency involved.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services" className="btn-secondary bg-white text-harbor-900 hover:bg-harbor-50">
                Explore Our Services
              </Link>
              <Link href="/donate" className="btn-primary bg-harbor-950 hover:bg-harbor-900">
                Sponsor a Family
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustSignals.map((signal) => (
              <div key={signal} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-medium text-white">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <p className="section-label">Our Mission</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
          Protecting children. Supporting healthy parent-child relationships.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-harbor-700">
          At {siteConfig.name}, our mission is to provide safe, structured supervised visitation
          services across {siteConfig.serviceArea} that remain neutral and unbiased toward any
          parent, caregiver, or agency involved. We serve families engaged with the courts, DCF,
          and private custody cases, ensuring a conflict-free environment that protects children
          and supports healthy parent-child relationships. As a professional Medicaid Provider
          with over 10 years of experience in the mental health field, we advocate for families
          in need by combining trauma-informed care, cultural sensitivity, and community
          partnerships to help them build stability, resilience, and a new day of hope together.
        </p>
      </section>

      <section className="bg-harbor-50 py-16 sm:py-24">
        <div className="container-page">
          <p className="section-label">What We Offer</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
            Services built around safety and neutrality
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-harbor-100">
                <h3 className="font-display text-lg font-semibold text-harbor-900">{service.name}</h3>
                <p className="mt-2 text-sm text-harbor-600">{service.summary}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="mt-8 inline-block text-sm font-semibold text-dawn-600 hover:text-dawn-700">
            See full service details →
          </Link>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <p className="section-label">Core Values</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
          The principles behind every visit
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => (
            <div key={value.name} className="rounded-2xl border border-harbor-100 p-6">
              <h3 className="font-display text-lg font-semibold text-dawn-600">{value.name}</h3>
              <p className="mt-2 text-sm text-harbor-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
        />
        <p className="section-label">Frequently Asked Questions</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
          What families ask us
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-harbor-100 p-6">
              <h3 className="font-semibold text-harbor-900">{faq.question}</h3>
              <p className="mt-2 text-sm text-harbor-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-harbor-950 py-16 text-white sm:py-24">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready for a new day of hope and connection?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-harbor-200">
            Whether you have a court order, a DCF referral, or a private arrangement, we're here
            to help your family find stability, one visit at a time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/services" className="btn-primary">
              Get Started
            </Link>
            <Link href="/community-resources" className="btn-secondary bg-transparent text-white hover:bg-white/10">
              Browse Community Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
