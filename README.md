# A New Day Family Services LLC — Website

A five-page marketing site for **A New Day Family Services LLC**, a professional Medicaid
Provider offering supervised visitation, monitored child exchanges, and therapeutic
trauma-informed visitation services across Northeast Florida (Duval, Clay, St. Johns, Nassau,
and Baker counties).

## Pages

- `/` — Landing page: mission, trust signals, services overview, core values, FAQ
- `/services` — Full service breakdown, referral sources, intake-to-documentation process
- `/about` — Mission, purpose, credentials, and the seven core values
- `/donate` — Family Visitation Sponsorship Fund (explicitly **not** tax-deductible — this is an
  LLC, not a 501(c)(3)) with a Square checkout placeholder
- `/community-resources` — Curated, independently-verified directory of Northeast Florida
  family court, DCF, legal aid, domestic violence, and counseling resources

## SEO & discoverability

- Per-page `Metadata` (title templates, description, canonical URL) — see `src/app/*/page.tsx`
- `LocalBusiness` and `FAQPage` JSON-LD structured data — `src/lib/structuredData.ts`
- Auto-generated `sitemap.xml` and `robots.txt` — `src/app/sitemap.ts`, `src/app/robots.ts`
- Keyword targeting based on competitor research (Toby Center, Angels Monitoring, JFCS
  Jacksonville, Family Ties) — terms like "supervised visitation Jacksonville FL,"
  "court-ordered visitation Northeast Florida," "monitored child exchange Duval County," and
  "Medicaid-approved supervised visitation" are woven into headings, metadata, and FAQ copy for
  both traditional SEO and AI answer engines (AEO).

## AI assistant

A floating "Ask Us Anything" chat widget (`src/components/ChatWidget.tsx`) calls `/api/chat`
(`src/app/api/chat/route.ts`), which is powered by the Claude API and grounded in the site's own
mission, services, and FAQ content (`src/lib/chatContext.ts`). The assistant is instructed to
stay neutral, avoid legal advice, and never discuss a specific family's case. **Without
`ANTHROPIC_API_KEY` set, it falls back to a static message instead of erroring** — safe to deploy
before the key is configured.

## Before launch — replace these placeholders

- `NEXT_PUBLIC_SITE_URL` — currently a placeholder domain; set to the real production domain
  (used in canonical URLs, sitemap, and structured data)
- `NEXT_PUBLIC_CONTACT_PHONE` / `NEXT_PUBLIC_CONTACT_EMAIL` — shown as `[PHONE]` / `[EMAIL]`
  throughout the footer and Donate page until set
- `ANTHROPIC_API_KEY` — required for the live AI assistant
- `SQUARE_ACCESS_TOKEN` / `SQUARE_LOCATION_ID` — the Donate page's Square button is disabled
  until real Square checkout is wired up
- Add a real `og-image` and favicon to `public/` (see `src/app/layout.tsx` for where to
  reference them)

## Known item: Next.js version

This project pins `next@14.2.35` (the latest 14.x patch), which resolves the critical
server-actions DoS and several other advisories present in earlier 14.x releases. A handful of
lower-severity advisories (Image Optimization `remotePatterns`, WebSocket-upgrade SSRF, Pages
Router i18n middleware bypass) are only fully patched in Next 16, which is a breaking major
upgrade (React 19, App Router changes). None of the affected features (custom `remotePatterns`,
WebSocket upgrades, Pages Router i18n) are used by this site. Revisit before scaling up image
optimization or adding those features.

## Tech stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployable to Vercel or any Node.js host.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real contact info, ANTHROPIC_API_KEY, Square keys
npm run dev
```

Open `http://localhost:3000`.
