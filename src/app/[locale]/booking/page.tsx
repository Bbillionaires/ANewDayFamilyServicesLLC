import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/booking" : `/${locale}/booking`,
    },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BookingPage");

  const bookingUrl = siteConfig.googleCalendarBookingUrl;
  const paymentUrl = siteConfig.paymentLinkUrl;

  return (
    <div>
      <section className="bg-sunrise">
        <div className="container-page py-24 sm:py-32">
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="mt-4 max-w-2xl text-white/90">{t("heroBody")}</p>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-harbor-100 p-8">
            <h2 className="font-display text-xl font-semibold text-harbor-900">{t("bookingTitle")}</h2>
            <p className="mt-3 text-sm text-harbor-600">{t("bookingBody")}</p>
            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-block"
              >
                {t("bookingButton")}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title={t("bookingNotConfiguredMessage")}
                  className="btn-primary mt-6 cursor-not-allowed opacity-60"
                >
                  {t("bookingButton")}
                </button>
                <p className="mt-3 text-xs text-harbor-500">{t("bookingNotConfiguredMessage")}</p>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-harbor-100 p-8">
            <h2 className="font-display text-xl font-semibold text-harbor-900">{t("paymentTitle")}</h2>
            <p className="mt-3 text-sm text-harbor-600">{t("paymentBody")}</p>
            {paymentUrl ? (
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-block"
              >
                {t("paymentButton")}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title={t("paymentNotConfiguredMessage")}
                  className="btn-primary mt-6 cursor-not-allowed opacity-60"
                >
                  {t("paymentButton")}
                </button>
                <p className="mt-3 text-xs text-harbor-500">{t("paymentNotConfiguredMessage")}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
