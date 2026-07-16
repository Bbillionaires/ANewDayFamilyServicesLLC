# A New Day Family Services LLC — Website

A marketing site for **A New Day Family Services LLC**, a professional Medicaid Provider
offering supervised visitation, monitored child exchanges, and therapeutic trauma-informed
visitation services across Northeast Florida (Duval, Clay, St. Johns, Nassau, and Baker
counties).

## Pages

- `/` — Landing page: mission, trust signals, services overview, core values, FAQ
- `/services` — Full service breakdown, referral sources, intake-to-documentation process
- `/about` — Mission, purpose, credentials, and the seven core values
- `/careers` — Open positions pitch + an application form that emails the applicant's details
  (and resume, if attached) straight to the team
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

## Languages

The site is available in English (default, no URL prefix), Spanish (`/es`), and Filipino/Tagalog
(`/tl`), switchable at any time via the globe button in the navbar — powered by
[next-intl](https://next-intl.dev). All translations live in `messages/{en,es,tl}.json` and are
machine-translated by Claude; the JSON structure is identical across all three files (verified by
key-parity check before shipping). Given this site touches DCF/court-adjacent content, **have a
native Spanish and Tagalog/Filipino speaker review `messages/es.json` and `messages/tl.json`
before relying on them for legal or safety-critical guidance** — translation only happens when a
visitor explicitly picks a language, so English remains the default and no auto-detection or
auto-translation occurs. The AI chat assistant also replies in whichever language is active.

To add a new page, add its keys to all three message files (`node` can diff key sets — see the
validation snippet in git history) and add the locale to `src/i18n/routing.ts`.

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
- Real contact info — phone `(904) 270-9463` and email `Info@anewdayfamilyservices.com` — is
  hardcoded as the default in `src/lib/siteConfig.ts`. Override with `NEXT_PUBLIC_CONTACT_PHONE` /
  `NEXT_PUBLIC_CONTACT_EMAIL` only if a specific deployment needs different values.
- `ANTHROPIC_API_KEY` — required for the live AI assistant
- `RESEND_API_KEY` — required for the Careers page application form to actually send email.
  You'll also need to verify a sending domain in Resend and set `CAREERS_FROM_EMAIL` to an
  address on that domain (Resend rejects unverified senders). Applications go to
  `CAREERS_NOTIFICATION_EMAIL`, which defaults to the site's main contact email.
- `SQUARE_ACCESS_TOKEN` / `SQUARE_LOCATION_ID` — the Donate page's Square button is disabled
  until real Square checkout is wired up
- Add a real `og-image` and favicon to `public/` (see `src/app/layout.tsx` for where to
  reference them)

## Careers application form

`/careers` (`src/app/[locale]/careers/page.tsx`) pitches the team and embeds
`src/components/CareerApplicationForm.tsx`, which posts to `/api/careers`
(`src/app/api/careers/route.ts`). The route validates the submission server-side, then emails
the applicant's name, contact info, position of interest, message, and resume (as an attachment,
PDF/Word, 5MB max) via [Resend](https://resend.com) — with the applicant's address set as
`replyTo`, so replying to the notification email goes straight to them. **Without
`RESEND_API_KEY` set, it tells applicants to email their resume directly instead of erroring** —
same fallback pattern as the AI assistant, safe to deploy before the key is configured.

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
