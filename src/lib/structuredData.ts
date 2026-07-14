import { siteConfig, faqs } from "./siteConfig";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description:
      "Neutral, trauma-informed supervised visitation and monitored child exchange services across Northeast Florida, serving families connected to the courts, DCF, and private custody cases.",
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: siteConfig.serviceAreaCounties.map((county) => `${county} County, FL`),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressRegion: "FL",
      addressCountry: "US",
    },
    priceRange: "$$",
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

