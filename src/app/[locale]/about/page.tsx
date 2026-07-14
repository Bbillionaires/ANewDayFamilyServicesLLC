import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/about" : `/${locale}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const tValues = await getTranslations("CoreValues");

  const credentialsList = t.raw("credentialsList") as string[];
  const coreValues = tValues.raw("items") as { name: string; description: string }[];

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
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            {t("heroTitle", { serviceArea: siteConfig.serviceArea })}
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-lg text-harbor-700">
            <p>{t("paragraph1", { name: siteConfig.name, serviceArea: siteConfig.serviceArea })}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3", { name: siteConfig.name })}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-harbor-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-harbor-500">
                {t("credentialsLabel")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-harbor-700">
                {credentialsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-sunrise p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                {t("servingLabel")}
              </p>
              <p className="mt-2 text-sm">
                {t("servingBody", {
                  counties: siteConfig.serviceAreaCounties.join(", "),
                  serviceArea: siteConfig.serviceArea,
                })}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <p className="section-label">{tValues("sectionLabel")}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-harbor-900">{t("valuesTitle")}</h2>
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
