import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";

function pathFor(locale: string, route: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/community-resources", "/careers", "/donate"];

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}${pathFor(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}${pathFor(l, route)}`])
        ),
      },
    }))
  );
}
