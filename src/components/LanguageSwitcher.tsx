"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  es: "Español",
  tl: "Filipino",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchTo(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded-full border border-harbor-200 px-3 py-1.5 text-sm font-medium text-harbor-700 transition hover:border-dawn-400 hover:text-dawn-600"
      >
        <span aria-hidden="true">🌐</span>
        {locale.toUpperCase()}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-harbor-100 bg-white py-1 shadow-lg">
            {routing.locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                className={
                  l === locale
                    ? "block w-full px-4 py-2 text-left text-sm font-semibold text-dawn-600"
                    : "block w-full px-4 py-2 text-left text-sm text-harbor-700 hover:bg-harbor-50"
                }
              >
                {LANGUAGE_LABELS[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
