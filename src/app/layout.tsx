import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { siteConfig } from "@/lib/siteConfig";
import { organizationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Supervised Visitation in Northeast Florida`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Neutral, trauma-informed supervised visitation, monitored child exchanges, and court/DCF documentation across Northeast Florida. Professional Medicaid Provider with 10+ years in mental health.",
  keywords: [
    "supervised visitation Jacksonville FL",
    "supervised visitation Northeast Florida",
    "monitored child exchange Florida",
    "court ordered visitation Duval County",
    "DCF supervised visitation provider",
    "therapeutic visitation Florida",
    "Medicaid supervised visitation provider",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Supervised Visitation in Northeast Florida`,
    description:
      "Safe, structured, neutral supervised visitation and monitored exchange services for families connected to the courts, DCF, and private custody cases.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
