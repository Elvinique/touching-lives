# Touching Lives Church

A modern, welcoming, production-quality church website — **Touching Lives Church, Austin, TX**.

Built with a **static-first architecture**: [Astro](https://astro.build) 7 + TypeScript + Tailwind CSS v4,
fully self-contained (local fonts, local SVG artwork, zero runtime third-party scripts), and deployable
to Cloudflare Pages as plain static files.

> "You are welcome here. Come as you are. There is a place for you."

---

## Getting started

```bash
npm install
npm run dev        # local dev server → http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run check      # astro check — type checking
npm run art        # regenerate local SVG artwork (public/art/**)
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, announcements, This Sunday, welcome, latest message, next steps, ministries, events, prayer, CTA |
| `/about` | Story + timeline, mission/vision, values, beliefs (FAQ accordion), leadership, stats |
| `/visit` | Plan Your Visit — service times, "first 90 minutes", map, what to expect, FAQs (FAQPage schema) |
| `/messages` | Searchable/filterable message archive (series, speaker, year, keyword) |
| `/messages/[slug]` | Message detail — media, Scripture, related series messages, prev/next |
| `/events` | Featured event + upcoming events + past events |
| `/events/[slug]` | Event detail — add-to-calendar, registration, Event schema |
| `/ministries` | Ministry directory (7 ministries) |
| `/ministries/[slug]` | Ministry detail with "Get involved" flow |
| `/prayer` | Prayer request form + how we pray |
| `/give` | Giving — configurable online giving CTA |
| `/contact` | Contact channels, map, contact form, service times |
| `/404` | Friendly not-found page |

## Technology stack

- **Astro 7** — static generation, content collections, zero client JS framework
- **TypeScript** — strict mode, checked with `astro check`
- **Tailwind CSS v4** — design tokens via `@theme` in `src/styles/global.css`
- **@lucide/astro** — open-source icon library
- **@fontsource-variable/fraunces + instrument-sans** — self-hosted fonts (no external requests)
- **@astrojs/sitemap** — sitemap generation
- **sharp** (dev) — rasterizes the SVG brand mark & hero art into PNG favicons and the OG image

## Architecture

```
src/
  config/site.ts          ← ALL church-specific configuration (address, times, socials, env keys)
  content.config.ts       ← content collections (zod-validated)
  content/                ← structured content (sermons, events, ministries, leadership, announcements)
  data/content.ts         ← UI data (next steps, values, beliefs, FAQs, stats, expectations…)
  lib/dates.ts            ← date helpers + Google Calendar link builder
  layouts/Layout.astro    ← global shell: SEO meta, OG, JSON-LD, header, footer
  components/
    layout/               ← Header, MobileMenu, Footer
    sections/             ← HeroHome, PageHero, ThisSunday, WelcomeSection, MessageSpotlight,
                             NextStepsSection, PrayerSection, CTASection, AnnouncementStrip
    cards/                ← SermonCard, EventCard, MinistryCard
    messages/             ← MessageFilters (search/filter archive)
    forms/                ← PrayerForm, ContactForm, NewsletterForm
    ui/                   ← Button, SectionHeading, Reveal, Logo, SocialLinks, MapCard,
                             Accordion, Breadcrumbs, EmptyState, JsonLd
  styles/global.css       ← design tokens + component classes
scripts/generate-art.mjs  ← generates all SVG artwork (43 files) into public/art/
public/                   ← static assets (favicon, robots, manifest, art, icons, og.png)
```

### Content model

All content lives in `src/content/**` as Markdown with zod-validated frontmatter — no hardcoded
content in components. Add a message, event, ministry, leader, or announcement by dropping in a
new file; every page updates automatically.

## Design system

- **Palette** — warm cream/sand neutrals + deep pine (primary) + terracotta (accent) + gold/sage supports
- **Typography** — Fraunces (display serif) + Instrument Sans (body)
- **Tokens** — color scales, shadows, radii, motion easing defined in `@theme` (Tailwind v4)
- **Motion** — scroll-reveal (IntersectionObserver), hero entrance, hover elevation, all disabled under `prefers-reduced-motion`

## Accessibility

- WCAG 2.2 AA-minded: semantic landmarks, single `h1` per page, skip link, visible focus rings
- Keyboard-navigable mobile menu (Escape closes, focus returns), `aria-expanded`/`aria-current`
- Forms: labeled, validated with inline `role="alert"` errors and `aria-invalid`
- Reveal animations and drifting hero art are inert under `prefers-reduced-motion`
- Contrast-checked text/background pairings

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph + Twitter cards
- `Church` organization schema on every page; `Event`, `FAQPage`, `ItemList`, `CreativeWork` where relevant
- `sitemap-index.xml` (via @astrojs/sitemap), `robots.txt`, `favicon.svg`, PNG icons, `site.webmanifest`, `og.png`

## Performance

- 100% static output; JavaScript is a few small inlined `<script>` modules (menu, reveal, form
  validation, message filter) — no framework runtime, no third-party scripts
- Self-hosted variable fonts (subset woff2), lazy-loaded images, SVG art (tiny, never breaks)
- Fonts preloaded; hero image `fetchpriority="high"`

## Configuration & placeholders

Everything church-specific lives in **`src/config/site.ts`** (and environment variables). Before launch:

| What | Where |
| --- | --- |
| Church name, address, phone, email, service times | `src/config/site.ts` |
| Production domain | `PUBLIC_SITE_URL` env var — drives `astro.config.mjs` (`site`), `site.url`, canonical URLs, sitemap & `robots.txt` |
| YouTube channel | `PUBLIC_YOUTUBE_URL` env var — enables the hero "Watch Online" link and YouTube social icon |
| Google Maps link | `PUBLIC_GOOGLE_MAPS_URL` env var — used by all "Get Directions" buttons |
| Online giving URL | `PUBLIC_GIVING_URL` env var — enables the "Give Online" button on `/give` |
| Social accounts | `site.social.*` — **only configured networks are displayed** |
| Form delivery (prayer/contact/newsletter) | `PUBLIC_PRAYER_ENDPOINT`, `PUBLIC_CONTACT_ENDPOINT`, `PUBLIC_NEWSLETTER_ENDPOINT` (any JSON-form backend — e.g. a free Formspree/Basin endpoint). Until configured, forms validate fully and show an honest "not connected" notice. |
| Sermon videos | `videoUrl` in each sermon's frontmatter (play buttons link out) |
| Event registration | `registrationUrl` in each event's frontmatter |
| Real photography | replace any file in `public/art/**` (regenerate with `npm run art` to reset) |

See **`.env.example`** for the full list of environment variables.

## Deployment (Cloudflare Pages)

1. Push this repository to GitHub.
2. In Cloudflare Pages: **Create project → connect the repo**.
3. Build command: `npm run build` · Output directory: `dist`
4. Set any `PUBLIC_*` environment variables **and `NODE_VERSION=22`** in the Pages project settings — Astro 7 requires Node ≥ 22.12 (the repo pins this in `.nvmrc` and `engines`).
5. Update the `site` URL in `astro.config.mjs` and re-deploy.
