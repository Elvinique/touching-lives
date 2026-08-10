# ✅ Phase 2A — Homepage Visual Enhancement: Implementation Report

**Status:** Complete — awaiting approval to proceed to Phase 2B.
**Scope:** Homepage only (`src/pages/index.astro` + its sections + shared primitives). No commits, no pushes, `.env.local` untouched, no new npm dependencies.

---

## 1. Files changed

| File | Change |
|---|---|
| `src/pages/index.astro` | Rewired: `VisitJourney` section, `StoryBand` (inert until stories exist), recent-messages strip data, per-ministry accent map, featured-event + snap-scroll upcoming list |
| `src/components/sections/HeroHome.astro` | Media slot (`homeHero`), stronger readability scrims, film grain, slow light sweep, drift preserved; headline & CTAs verbatim |
| `src/components/sections/WelcomeSection.astro` | 45/55 split (`10fr/12fr`), editorial headline (`size="editorial"`), framed media-slot image with one-time entrance |
| `src/components/sections/MessageSpotlight.astro` | Featured card uses `featuredSermon` media slot + new **"Recent messages"** strip (3 compact `SermonCard`s) |
| `src/components/sections/ThisSunday.astro` | `visitWorship` media slot, subtle gold ring on date block |
| `src/components/sections/PrayerSection.astro` | `prayer` media slot + image entrance |
| `src/components/ui/SectionHeading.astro` | Added `size?: 'title' \| 'editorial'` prop (backward-compatible) |
| `src/components/cards/MinistryCard.astro` | Added optional `accent` prop (default = current gold, no change elsewhere) |
| `src/styles/global.css` | Added `--text-editorial` token, `.img-enter`, `.light-sweep`, `.grain` (all CSS-only, reduced-motion-safe) |
| `src/data/content.ts` | Added **empty** `stories` export (no fabrication) |
| `src/data/media.ts` | **NEW** — centralized media registry, 5 homepage slots as pending assets |
| `src/components/sections/VisitJourney.astro` | **NEW** — reusable, data-driven numbered editorial journey (renders `firstVisitSteps` unchanged) |
| `src/components/sections/StoryBand.astro` | **NEW** — placeholder-gated; renders nothing until verified stories exist |
| `public/images/church/README.md` | **NEW** — required-asset handoff doc (drop verified photos here) |

## 2. Files added
- `src/data/media.ts`
- `src/components/sections/VisitJourney.astro`
- `src/components/sections/StoryBand.astro`
- `public/images/church/README.md`

## 3. Images added
**None.** Per instruction, no stock photos were downloaded or selected. All five homepage slots render existing artwork placeholders via `src/data/media.ts`. When verified photos are dropped in, only the registry's data changes — **zero component edits required** (aspect ratios are consumed from the registry).

## 4. Visual changes on the homepage
- **Hero** — photographic base slot with layered depth (scrims → slow light → grain); headline & CTAs untouched.
- **NEW "What to expect on a Sunday"** — editorial 01–04 numbered journey (existing `firstVisitSteps` data, verbatim).
- **Welcome** — true 45/55 split, oversized editorial headline, framed image + Est. 1984 card.
- **Messages** — featured full-bleed band + new Recent Messages strip (clear featured/recent hierarchy, no iframes).
- **Events** — featured "Next up" card with date chip + upcoming cards swipeable on mobile (snap scroll), grid on desktop.
- **Ministries** — subtle per-ministry accent colors from the existing palette.
- **Prayer** — warm split preserved, media slot + gentle image entrance.
- **StoryBand** — architecture in place, renders nothing (no fabricated quotes).

## 5. Validation results
- `npm run check` → **0 errors / 0 warnings / 0 hints** (55 files)
- `npm run build` → **35 pages**, sitemap + robots regenerated, all routes intact
- Verified in built HTML: journey, recent strip, featured event, art placeholders, grain/light layers, canonical / OG / twitter / JSON-LD all present; no pending paths leaked; story band correctly absent.

## 6. The 5 required image files

| Filename (`public/images/church/…`) | Section | Aspect | Recommended dims | Subject/style | Critical? |
|---|---|---|---|---|---|
| `home-hero.jpg` | Hero background | 16:9 (ultrawide ok) | ≥ 1920 × 1080 | Warm congregation/worship, dim enough for text overlay, no logos, avoid close-up identifiable faces | **Critical** |
| `welcome-community.jpg` | Welcome 45/55 framed | 4:3 (4:5 ok) | ≥ 1200 × 900 | Candid people connecting, coffee, warm light | **Critical** |
| `featured-sermon.jpg` | Featured message card | 16:9 | ≥ 1600 × 900 | Worship / preaching / teaching atmosphere | **Critical** |
| `prayer.jpg` | Prayer framed image | 4:3 (4:5 ok) | ≥ 1200 × 900 | Calm/dignified — candle in darkness or hands in soft light | Optional |
| `visit-worship.jpg` | "This Sunday" texture | 16:9 | ≥ 1600 × 900 | Worship from behind (silhouettes), faint texture behind dark overlay | Optional |

On delivery: place the file at the documented path and update the matching entry in `src/data/media.ts` (`src` → file path, fill in `source` / `photographer` / `sourceUrl` / `license`). No component markup changes required.

## 7. Concerns / notes
1. **Visual QA at 320→1440px is outstanding** — Chrome is not installed in this environment, so live browser QA could not be run. Static review found no overflow risks (frame overhangs ≤ 16px inside ≥ 20px wrap padding; snap list → grid on desktop; heading order h1→h2→h3 intact). A breakpoint pass should be run once a browser is available.
2. Code review flagged and fixed: media `aspect` is now consumed by components (data-driven cropping, drop-in ready). Accepted notes: featured card shows generic art until the photo arrives (deliberate media-slot behavior); `VisitJourney` has a forward-looking `pine` variant for Phase 2B; `public/images/church/README.md` is publicly served (harmless).
3. `.env.local` untouched; no new dependencies; `firstVisitSteps` unchanged; `scripts/generate-art.mjs` untouched.

---

**Next step:** awaiting approval to proceed to **Phase 2B (Plan Your Visit)**.
