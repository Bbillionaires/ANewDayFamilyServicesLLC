"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/community-resources", label: "Community Resources" },
  { href: "/donate", label: "Donate" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-harbor-100 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-harbor-900">
          <span className="flex h-9 items-center justify-center rounded-full bg-sunrise px-3 text-sm font-bold tracking-wide text-white">
            ANDFS
          </span>
          <span className="hidden sm:inline">{siteConfig.shortName}</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-harbor-700 transition hover:text-dawn-600"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/donate" className="btn-primary">
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-harbor-200 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? "✕" : "☰"}
        </button>
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
