import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/services" : `/${locale}/services`,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");
  const tServices = await getTranslations("ServicesData");

  const services = tServices.raw("items") as { slug: string; name: string; summary: string }[];
  const referralSources = t.raw("referralSources") as string[];
  const process = t.raw("process") as { step: string; detail: string }[];

  return (
    <div>
      <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
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
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            {t("heroTitle", { serviceArea: siteConfig.serviceArea })}
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <p className="max-w-3xl text-lg text-harbor-700">{t("intro")}</p>

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
            <p className="section-label">{t("referralLabel")}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-harbor-900">{t("referralTitle")}</h2>
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
            <p className="section-label">{t("howLabel")}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-harbor-900">{t("howTitle")}</h2>
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
          <h2 className="font-display text-2xl font-bold">{t("cantCoverTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">{t("cantCoverBody")}</p>
          <Link href="/donate" className="btn-secondary mt-6 inline-block bg-white text-harbor-900 hover:bg-harbor-50">
            {t("learnAboutFund")}
          </Link>
        </div>
      </div>
    </div>
  );
}
