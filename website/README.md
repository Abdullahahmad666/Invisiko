# Invisiko website

The public marketing website for **Invisiko**, the back-of-house app for independent takeaways and
small restaurants: position-checked staff hours, food-safety records, fortnightly pay and delivery
invoices read for you.

This site is deliberately separate from the product. It has **no connection** to the app's API or
database, holds no product credentials, and its only integrations are outbound links and its own
contact form.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript, statically generated pages |
| Styling | Tailwind CSS v4, product palette as CSS tokens in `app/globals.css` |
| Content | Typed data in `content/` (site facts, FAQ, features, screenshots) |
| Icons | Ionicons via `react-icons/io5`, as the app uses |
| Font | Inter, self-hosted at build time by `next/font` |
| Contact form | `app/api/contact/route.ts` → the support@invisiko.app mailbox over SMTP via Nodemailer (`lib/mail.ts`), nothing stored |
| Tests | Vitest + Testing Library (unit), Playwright + axe (smoke) |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — every value has a visible placeholder fallback
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Smoke tests against a production build (run `npm run build` first). Uses the installed Microsoft Edge; set `E2E_CHANNEL=chromium` after `npx playwright install chromium` to use Playwright's browser instead |

## Structure

```
app/            routes, metadata, sitemap, robots, icons, OG image, contact Route Handler
components/     shared UI: Header, Footer, Section, PhoneFrame, StepList, FaqAccordion, CtaBand, …
sections/       page-specific composed visuals (invoice steps, pipeline)
content/        copy and facts as typed data — edit here, not in components
lib/            metadata, structured data, contact validation
tests/unit      Vitest
tests/e2e       Playwright smoke path
public/screenshots   real app screenshots go here
```

## Decisions taken (and how to reverse them)

- **Primary call to action is "Request access"** — the blueprint's recommendation while there is no
  pricing and no verified self-serve signup (§11, §14 Q3). Change it in one place:
  `primaryCta` in `content/site.ts`.
- **Privacy and support live on this website** (§9.10 option b). `/privacy` and `/support` carry the
  owner's text, adapted for the web, with a section on the website itself. The app should link to
  `https://invisiko.app/privacy` and `https://invisiko.app/support`.
- **Terms is a placeholder page** marked `noindex` and left out of the sitemap. No terms have been
  drafted: they must be written and legally reviewed by a person (§14 Q6).
- **The restaurant-approval step** is described generically on `/how-it-works` until the owner
  confirms it stays (§9.6, §14 Q15).
- **Payroll** is described only as fortnightly pay periods with per-person rates. The rate split is
  never mentioned (§7, §14 Q12).
- **No analytics** are installed, so the privacy page can truthfully say no cookies or trackers are
  set. If Plausible or Fathom is added later (§11), update `/privacy` first.
- **Demo screens instead of only real captures**, at the owner's request, despite §10's "never a
  fabricated screen". They show built features only, and the footer discloses the demo data.
- **Motion is richer than the blueprint's ≤250ms entry-only rule**, at the owner's request: native
  CSS scroll timelines (`animation-timeline: view()` / `scroll()`) drive reveals, the hero exit,
  phone arrivals, the step track, illustration parts and a reading-progress bar, with an
  IntersectionObserver fallback for browsers without scroll timelines. Everything is switched off
  under `prefers-reduced-motion`, and content is never left hidden if JavaScript fails. Classes and
  keyframes live at the end of `app/globals.css`; stagger with `style={{ "--stagger": n }}`.
  Containers holding scroll-driven elements use `overflow-clip`, not `overflow-hidden` — hidden
  creates a scroll container that a `view()` timeline would attach to instead of the page.

## Confirmed by the owner

- Product name: **Invisiko**
- Domain: **invisiko.app**
- Contact, support and privacy address: **support@invisiko.app**
- Reply time promised on the contact page: **within 24–48 hours**
- Legal company name: **Invisiko**, based in **London, UK**
- Platform: **iPhone (iOS)** only; Android and iPad are not supported
- A pay screen may be shown publicly, with demo data and no rates or pay split
- Logo: the owner's mark, kept as `assets/brand/invisiko-mark.png`. Run `npm run brand` after replacing it to regenerate the favicon, home-screen icon, manifest icon and structured-data logo.

## Before launch — everything still needed from the owner

Find every unresolved token with:

```bash
grep -rn "\[\[" app components content lib sections
```

| Token / item | Where it's set | Blueprint |
|---|---|---|
| Form delivery: the SMTP settings for support@invisiko.app — `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (often an app password). See `.env.example` | env | §14 Q4 |
| Apex or `www` as the canonical host (defaults to `https://invisiko.app`) | `NEXT_PUBLIC_SITE_URL` | §13 |
| `[[APP_STORE_URL]]` — the App Store badge appears once set | `NEXT_PUBLIC_APP_STORE_URL` | §14 Q10 |
| `[[ORIGIN_STORY]]` for `/about` | `app/about/page.tsx` | §14 Q21 |
| `[[PRICE]]` — FAQ "What does it cost?" | `content/faq.ts` | §14 Q8 |
| **Terms of service:** a full draft is on `/terms`, marked as a draft and hidden from search. Have a solicitor review it, settle `[[LIABILITY_CAP]]` and `[[FEES_AND_PAYMENT_TERMS]]`, then follow the two steps at the top of `app/terms/page.tsx` | `app/terms/page.tsx`, `content/pages.ts` | §14 Q6 |
| Point the app's privacy and support links at `invisiko.app/privacy` and `invisiko.app/support` | the app | §9.10 |
| Check the demo screens against the real app, especially invoice review, invite-code entry, refused check-in and recording temperatures, which were drawn from the blueprint's description | `scripts/build-demo-screens.mjs` | §10 |
| Optional: an SVG master of the mark, for perfectly crisp scaling (the PNG master is 225×451) | `assets/brand/` | §14 Q25 |
| Confirm "iPhone only; not Android or iPad" against the App Store listing | `content/faq.ts` → `phones` | §9.9 |

### App screens

Most screens on the site are **demo screens**: recreations of built screens in the app's design
system, with fictional data for a made-up restaurant, The Clay Oven. The footer says so on every
page. They exist because real captures held real prices, names and test entries, and several
screens had no capture.

- Edit them in `scripts/build-demo-screens.mjs`, then run `npm run demo-screens` (needs a connection
  for Roboto, and Microsoft Edge). It writes 1080×2400 WebP files to `public/screenshots/`.
- Show only what the blueprint marks Implemented, never pay rates or how staff are paid, and keep the
  sums adding up. `tests/unit/content-claims.test.ts` scans this script for forbidden claims.
- Register each screen in `content/screenshots.ts` with alt text describing what is on it.

The two welcome screens are real captures. To use another, save it to `assets/screens/` as
`<who>-<screen>.jpg` (gitignored, because raw captures can hold real names, addresses and live
codes), review it, add it to `scripts/build-screenshots.mjs`, and run `npm run screenshots`.

## Deployment

Built for Vercel (any Next.js host works). Set the environment variables above per environment.
`robots.txt` disallows all crawling unless `VERCEL_ENV=production`, so previews are never indexed.
Choose one canonical host (apex or `www`) and redirect the other; the API's HSTS
`includeSubDomains` + `preload` means every subdomain of the shared apex must serve HTTPS (§13).
