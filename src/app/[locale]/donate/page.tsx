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
  const t = await getTranslations({ locale, namespace: "DonatePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/donate" : `/${locale}/donate`,
    },
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonatePage");

  const impactTiers = t.raw("impactTiers") as { amount: string; impact: string }[];

  return (
    <div>
      <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
        <Image
          src="/images/donate-hero.jpg"
          alt="A mother tenderly holding her newborn baby, representing the families the sponsorship fund supports"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/75 to-harbor-950/45" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">{t("heroTitle")}</h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <p className="max-w-3xl text-lg text-harbor-700">
          {t.rich("intro", {
            name: siteConfig.name,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-harbor-100 p-8">
              <h2 className="font-display text-xl font-semibold text-harbor-900">{t("supportsTitle")}</h2>
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
              <h2 className="font-display text-xl font-semibold text-harbor-900">{t("squareTitle")}</h2>
              <p className="mt-3 text-sm text-harbor-600">
                {t.rich("squareBody", {
                  code: (chunks) => (
                    <code className="rounded bg-harbor-100 px-1.5 py-0.5 text-xs">{chunks}</code>
                  ),
                })}
              </p>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title={t("squareButtonTitle")}
                className="btn-primary mt-6 cursor-not-allowed opacity-60"
              >
                {t("squareButton")}
              </button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-sunrise p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                {t("whoBenefitsLabel")}
              </p>
              <p className="mt-2 text-sm">{t("whoBenefitsBody")}</p>
            </div>
            <div className="rounded-2xl bg-harbor-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-harbor-500">
                {t("sponsorshipAskLabel")}
              </p>
              <p className="mt-2 text-sm text-harbor-700">
                {t.rich("sponsorshipAskBody", {
                  phone: siteConfig.phone,
                  email: siteConfig.email,
                  phoneLink: (chunks) => (
                    <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="font-medium text-dawn-700 hover:underline">
                      {chunks}
                    </a>
                  ),
                  emailLink: (chunks) => (
                    <a href={`mailto:${siteConfig.email}`} className="font-medium text-dawn-700 hover:underline">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
