import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";
import { faqJsonLd } from "@/lib/structuredData";
import StatCounter from "@/components/StatCounter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: locale === routing.defaultLocale ? "/" : `/${locale}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const tValues = await getTranslations("CoreValues");
  const tServices = await getTranslations("ServicesData");
  const tFaqs = await getTranslations("Faqs");

  const trustSignals = t.raw("trustSignals") as string[];
  const coreValues = tValues.raw("items") as { name: string; description: string }[];
  const services = tServices.raw("items") as { slug: string; name: string; summary: string }[];
  const faqs = tFaqs.raw("items") as { question: string; answer: string }[];

  return (
    <>
      <section className="relative flex min-h-[480px] items-center overflow-hidden text-white sm:min-h-[560px] lg:min-h-[640px]">
        <Image
          src="/images/family-hero.jpg"
          alt="A joyful family together at golden hour, symbolizing a new day of hope"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harbor-950/85 via-dawn-700/70 to-dawn-500/50" />
        <div className="container-page relative z-10 grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="section-label text-white/80">
              {t("heroLabel", { serviceArea: siteConfig.serviceArea })}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              {t("heroDescription", { name: siteConfig.name, serviceArea: siteConfig.serviceArea })}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services" className="btn-secondary bg-white text-harbor-900 hover:bg-harbor-50">
                {t("exploreServices")}
              </Link>
              <Link href="/donate" className="btn-primary bg-harbor-950 hover:bg-harbor-900">
                {t("sponsorFamily")}
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

      <section className="bg-harbor-950 py-14 text-white">
        <div className="container-page">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="font-display text-4xl font-bold text-dawn-300 sm:text-5xl">
                <StatCounter target={27251} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-harbor-200">{t("statChildrenLabel")}</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-dawn-300 sm:text-5xl">
                <StatCounter target={siteConfig.serviceAreaCounties.length} />
              </p>
              <p className="mt-2 text-sm text-harbor-200">
                {t("statCountiesLabel", { serviceArea: siteConfig.serviceArea })}
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-dawn-300 sm:text-5xl">
                <StatCounter target={10} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-harbor-200">{t("statYearsLabel")}</p>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-harbor-400">
            {t("statSourcePrefix")}{" "}
            <a
              href="https://www.myflfamilies.com/ocfw-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-dawn-300"
            >
              {t("statSourceName")}
            </a>
            . {t("statSourceDisclaimer", { name: siteConfig.name })}
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="section-label">{t("missionLabel")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-6 text-lg text-harbor-700">
              {t("missionBody", { name: siteConfig.name, serviceArea: siteConfig.serviceArea })}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/family-conversation.jpg"
              alt="A parent and child talking and smiling together at home"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-harbor-50 py-16 sm:py-24">
        <div className="container-page">
          <p className="section-label">{t("offerLabel")}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
            {t("offerTitle")}
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
            {t("seeFullServices")}
          </Link>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <p className="section-label">{tValues("sectionLabel")}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
          {t("valuesTitle")}
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
        <p className="section-label">{tFaqs("sectionLabel")}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900 sm:text-4xl">
          {tFaqs("title")}
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
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-harbor-200">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/services" className="btn-primary">
              {t("getStarted")}
            </Link>
            <Link href="/community-resources" className="btn-secondary bg-transparent text-white hover:bg-white/10">
              {t("browseResources")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
