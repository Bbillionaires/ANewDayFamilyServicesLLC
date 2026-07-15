import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="border-t border-harbor-100 bg-harbor-950 text-harbor-100">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-white">{siteConfig.shortName}</p>
          <p className="mt-2 text-sm text-harbor-300">{t("tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">{t("explore")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-dawn-300">{tNav("services")}</Link></li>
            <li><Link href="/about" className="hover:text-dawn-300">{tNav("about")}</Link></li>
            <li><Link href="/community-resources" className="hover:text-dawn-300">{tNav("communityResources")}</Link></li>
            <li><Link href="/donate" className="hover:text-dawn-300">{tNav("donate")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">{t("contact")}</p>
          <ul className="mt-3 space-y-2 text-sm text-harbor-200">
            <li>{t("servingPrefix")} {siteConfig.serviceArea}</li>
            <li>{siteConfig.serviceAreaCounties.join(", ")} {t("countiesSuffix")}</li>
            <li>
              {t("phoneLabel")}:{" "}
              <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="hover:text-dawn-300">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              {t("emailLabel")}:{" "}
              <a href={`mailto:${siteConfig.email}`} className="hover:text-dawn-300">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">{t("credentials")}</p>
          <ul className="mt-3 space-y-2 text-sm text-harbor-200">
            {t.raw("credentialsList").map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-harbor-900 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-harbor-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}</p>
          <p>{siteConfig.developerCredit.label}</p>
        </div>
      </div>
    </footer>
  );
}
