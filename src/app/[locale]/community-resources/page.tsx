import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

type Resource = { name: string; detail: string; phone?: string; url: string };
type Category = { title: string; resources: Resource[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CommunityResourcesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/community-resources" : `/${locale}/community-resources`,
    },
  };
}

export default async function CommunityResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CommunityResourcesPage");

  const categories = t.raw("categories") as Category[];

  return (
    <div>
      <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px] lg:min-h-[540px]">
        <Image
          src="/images/community-skyline.jpg"
          alt="The Jacksonville, Florida skyline along the St. Johns River"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950/95 via-harbor-950/75 to-harbor-950/45" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="section-label text-dawn-300">{t("heroLabel")}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold text-white">
            {t("heroTitle", { serviceArea: siteConfig.serviceArea })}
          </h1>
        </div>
      </section>

      <div className="container-page py-16 sm:py-24">
        <p className="max-w-3xl text-lg text-harbor-700">
          {t("intro", { name: siteConfig.name })}
        </p>

        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className="font-display text-2xl font-bold text-harbor-900">{category.title}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {category.resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-harbor-100 p-6 transition hover:border-dawn-300 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-harbor-900">{resource.name}</h3>
                    <p className="mt-2 text-sm text-harbor-600">{resource.detail}</p>
                    {resource.phone && (
                      <p className="mt-2 text-sm font-medium text-dawn-600">{resource.phone}</p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-harbor-50 p-8">
          <p className="text-sm text-harbor-600">{t("emergencyNotice")}</p>
        </div>
      </div>
    </div>
  );
}
