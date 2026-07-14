import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-harbor-100 bg-harbor-950 text-harbor-100">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-white">{siteConfig.shortName}</p>
          <p className="mt-2 text-sm text-harbor-300">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-dawn-300">Services</Link></li>
            <li><Link href="/about" className="hover:text-dawn-300">About Us</Link></li>
            <li><Link href="/community-resources" className="hover:text-dawn-300">Community Resources</Link></li>
            <li><Link href="/donate" className="hover:text-dawn-300">Donate / Sponsor a Family</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-harbor-200">
            <li>Serving {siteConfig.serviceArea}</li>
            <li>{siteConfig.serviceAreaCounties.join(", ")} Counties</li>
            <li>Phone: {siteConfig.phone}</li>
            <li>Email: {siteConfig.email}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-harbor-400">Credentials</p>
          <ul className="mt-3 space-y-2 text-sm text-harbor-200">
            <li>Professional Medicaid Provider</li>
            <li>10+ years in the mental health field</li>
            <li>Neutral, trauma-informed, court &amp; DCF experienced</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-harbor-900 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-harbor-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.developerCredit.label}</p>
        </div>
      </div>
    </footer>
  );
}
