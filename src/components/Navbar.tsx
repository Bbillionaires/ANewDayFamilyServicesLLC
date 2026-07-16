"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/siteConfig";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/community-resources", label: t("communityResources") },
    { href: "/careers", label: t("careers") },
    { href: "/donate", label: t("donate") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-harbor-100 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <Link href="/" className="font-display text-base font-semibold text-harbor-900 sm:text-lg">
          {siteConfig.shortName}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-harbor-700 transition hover:text-dawn-600"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/donate" className="btn-primary">
            {t("donate")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-harbor-200"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-harbor-100 bg-white md:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-harbor-800"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
