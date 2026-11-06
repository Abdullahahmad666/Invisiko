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
| Contact form | `app/api/contact/route.ts` → Resend HTTP API (server-only key), nothing stored |
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
- **Privacy and support: the product's existing pages stay canonical** (§9.10 option a). The
  website's `/privacy` covers the website itself and summarises the app's policy; `/support`
  mirrors the app's four support topics and links to the app's page. Set
  `NEXT_PUBLIC_APP_PRIVACY_URL` and `NEXT_PUBLIC_APP_SUPPORT_URL`.
- **Terms is a placeholder page** marked `noindex` and left out of the sitemap. No terms have been
  drafted: they must be written and legally reviewed by a person (§14 Q6).
- **The restaurant-approval step** is described generically on `/how-it-works` until the owner
  confirms it stays (§9.6, §14 Q15).
- **Payroll** is described only as fortnightly pay periods with per-person rates. The rate split is
  never mentioned (§7, §14 Q12).
- **No analytics** are installed, so the privacy page can truthfully say no cookies or trackers are
  set. If Plausible or Fathom is added later (§11), update `/privacy` first.
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
- Logo: the owner's mark, kept as `assets/brand/invisiko-mark.png`. Run `npm run brand` after replacing it to regenerate the favicon, home-screen icon, manifest icon and structured-data logo.

## Before launch — everything still needed from the owner

Find every unresolved token with:

```bash
grep -rn "\[\[" app components content lib sections
```

| Token / item | Where it's set | Blueprint |
|---|---|---|
| Form delivery: a Resend account with `invisiko.app` verified, then `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | env | §14 Q4 |
| Apex or `www` as the canonical host (defaults to `https://invisiko.app`) | `NEXT_PUBLIC_SITE_URL` | §13 |
| `[[APP_PRIVACY_URL]]`, `[[APP_SUPPORT_URL]]` | env | §14 Q7 |
| `[[APP_STORE_URL]]`, `[[PLAY_STORE_URL]]` — badges appear only once set | env | §14 Q10 |
| `[[ORIGIN_STORY]]` for `/about` | `app/about/page.tsx` | §14 Q21 |
| `[[PRICE]]` — FAQ "What does it cost?" | `content/faq.ts` | §14 Q8 |
| `[[TERMS]]` — real terms of service | `app/terms/page.tsx` | §14 Q6 |
| Legal review of `/privacy` (remove the draft notice afterwards) | `app/privacy/page.tsx` | §9.10 |
| Nice to have: the invoice review screen, the app's key moment, to replace the stock list under "You stay in charge". Better captures of Documents and Fridges (they show test entries) | `assets/screens/`, then `npm run screenshots` | §14 Q11 |
| Confirm the real prices and item names on the Purchase history and Stock screens may be public | `scripts/build-screenshots.mjs` | §13 |
| Approval to show the payroll screen | `content/screenshots.ts` → `payroll` | §14 Q12 |
| Optional: an SVG master of the mark, for perfectly crisp scaling (the PNG master is 225×451) | `assets/brand/` | §14 Q25 |
| Confirm "Android and iPhone; not iPad" against the store listings | `content/faq.ts` → `phones` | §9.9 |

### Adding a screenshot

1. Save the raw capture in `assets/screens/` as `<who>-<screen>.jpg`, e.g. `manager-weekly-rota.jpg`.
   This folder is gitignored: raw captures can hold real names, addresses and live codes.
2. Review it for personal data, live codes and the pay split, then add it to `screens` in
   `scripts/build-screenshots.mjs` with any redactions it needs. Captures must be 720×1600.
3. Run `npm run screenshots`. It removes the status bar and home indicator, applies redactions and
   writes a 1080×2400 WebP to `public/screenshots/`.
4. Add the entry to `content/screenshots.ts` with alt text describing what is on the screen.

## Deployment

Built for Vercel (any Next.js host works). Set the environment variables above per environment.
`robots.txt` disallows all crawling unless `VERCEL_ENV=production`, so previews are never indexed.
Choose one canonical host (apex or `www`) and redirect the other; the API's HSTS
`includeSubDomains` + `preload` means every subdomain of the shared apex must serve HTTPS (§13).
