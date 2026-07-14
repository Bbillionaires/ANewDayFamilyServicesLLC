import type { Metadata } from "next";
import Image from "next/image";
import { coreValues, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us | Our Mission, Purpose & Core Values",
  description:
    "Learn about A New Day Family Services LLC's mission, purpose, and core values — a trauma-informed, neutral Medicaid Provider serving Northeast Florida families.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
        <Image
          src="/images/about-hero.jpg"
          alt="A mother and daughter smiling warmly at each other at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/70 to-harbor-950/40" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">About Us</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            A trauma-informed, neutral partner for {siteConfig.serviceArea} families
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 text-lg text-harbor-700">
          <p>
            The purpose of {siteConfig.name} is to provide neutral, safe, and structured
            supervised visitation services for families across {siteConfig.serviceArea}. We serve
            families involved with the court system, the Department of Children and Families
            (DCF), and private custody cases, giving children a secure place to maintain or
            rebuild relationships with their parents and caregivers. Our role is not to take
            sides, but to observe, document, and support healthy interactions while keeping
            children's wellbeing at the center of every visit.
          </p>
          <p>
            As a professional Medicaid Provider with more than a decade of experience in the
            mental health field, we bring a trauma-informed, family-focused approach to every
            service we offer. We understand that many families seeking supervised visitation
            have lived through crisis, conflict, or major life changes. Because of this, we use
            clear guidelines, consistent routines, and calm communication to reduce stress and
            confusion during visits.
          </p>
          <p>
            {siteConfig.name} exists to advocate for families in need by offering high-quality
            visitation services and helping connect them to additional community supports when
            appropriate. Our goal is to help families move toward stability and healing, one
            visit at a time, so that children can experience a "new day" of hope, safety, and
            connection with the people who matter most to them.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-harbor-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-harbor-500">Credentials</p>
            <ul className="mt-3 space-y-2 text-sm text-harbor-700">
              <li>Professional Medicaid Provider</li>
              <li>10+ years of experience in the mental health field</li>
              <li>Trauma-informed, culturally sensitive practice</li>
              <li>Experience with courts, DCF, and private custody cases</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-sunrise p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Serving</p>
            <p className="mt-2 text-sm">
              {siteConfig.serviceAreaCounties.join(", ")} counties in {siteConfig.serviceArea}
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-20">
        <p className="section-label">Core Values</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900">What guides every visit</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => (
            <div key={value.name} className="rounded-2xl border border-harbor-100 p-6">
              <h3 className="font-display text-lg font-semibold text-dawn-600">{value.name}</h3>
              <p className="mt-2 text-sm text-harbor-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
