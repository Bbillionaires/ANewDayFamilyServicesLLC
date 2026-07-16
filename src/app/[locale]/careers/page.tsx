import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CareersPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/careers" : `/${locale}/careers`,
    },
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CareersPage");

  const whyItems = t.raw("whyItems") as string[];

  return (
    <div>
      <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
        <Image
          src="/images/careers-hero.jpg"
          alt="A diverse team of professionals collaborating around a table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/70 to-harbor-950/40" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">{t("heroTitle")}</h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="max-w-3xl text-lg text-harbor-700">
              {t("intro", { serviceArea: siteConfig.serviceArea })}
            </p>
            <div className="mt-10">
              <CareerApplicationForm />
            </div>
          </div>

          <aside>
            <div className="rounded-2xl bg-harbor-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-harbor-500">{t("whyTitle")}</p>
              <ul className="mt-3 space-y-3 text-sm text-harbor-700">
                {whyItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-dawn-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
