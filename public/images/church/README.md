# Pending homepage photographs — Phase 2A

These five assets are **pending** and will be supplied as verified photography.
Until they arrive, the site renders the existing artwork placeholders (wired
through `src/data/media.ts`) — dropping the real files in is a **data-only**
change.

To activate an asset:
1. Place the file at the exact path listed below (relative to `/public`).
2. Update the matching entry in `src/data/media.ts`: set `src` to the file
   path and fill in `source`, `photographer`, `sourceUrl`, `license` from the
   verified provenance. No component markup changes are required.

## Required assets

| # | Filename (path under `/public`) | Section | Aspect ratio | Recommended dimensions | Subject / style | Critical? |
|---|---|---|---|---|---|---|
| 1 | `images/church/home-hero.jpg` | Homepage hero background | 16:9 (ultrawide ok) | ≥ 1920 × 1080 | Warm, atmospheric congregation or worship scene; dim enough for white text overlay; no visible logos; avoid close-ups of identifiable faces | **Critical** |
| 2 | `images/church/welcome-community.jpg` | Welcome section (45/55 split, framed image) | 4:3 (4:5 also fine) | ≥ 1200 × 900 | Candid human connection — people talking, coffee, warm natural light | **Critical** |
| 3 | `images/church/visit-worship.jpg` | "This Sunday" dark band texture | 16:9 | ≥ 1600 × 900 | Worship atmosphere from behind (silhouettes/backs, raised hands), dim — used as a faint texture behind a dark overlay | Optional (subtle) |
| 4 | `images/church/featured-sermon.jpg` | Featured latest-message card | 16:9 | ≥ 1600 × 900 | Worship / preaching / teaching atmosphere, stage or podium feel | **Critical** |
| 5 | `images/church/prayer.jpg` | Prayer section framed image | 4:3 (4:5 also fine) | ≥ 1200 × 900 | Calm, quiet, dignified — candle flame in darkness, or hands in soft light | Optional |

## Rules

- Only use properly licensed, free-to-use photography (e.g. Unsplash / Pexels
  license) or official Touching Lives photography.
- Record the source, photographer, source URL, and license in
  `src/data/media.ts` — never fabricate provenance.
- Keep alt text meaningful (informative when the image carries meaning, empty
  when decorative).
- Do not imply stock-photo subjects are Touching Lives members.
