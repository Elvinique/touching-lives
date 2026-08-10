/**
 * Centralized media registry — the single place where homepage photography is
 * managed.
 *
 * STAGE B READY: every homepage photograph is currently a *pending asset*.
 * The `src` fields point at existing artwork placeholders so the site looks
 * intentional until the real photography is provided. The `pending` field
 * documents the exact local path the real photo should live at
 * (`public/images/church/...` — see the README there).
 *
 * When a verified photo is provided:
 *   1. drop the file at the documented `pending` path, and
 *   2. update this entry: set `src` to that path and fill in `source` /
 *      `photographer` / `sourceUrl` / `license` from the verified provenance.
 *
 * No component markup changes are required.
 */
export interface MediaItem {
  /** Asset currently rendered (a temporary artwork placeholder). */
  src: string;
  /** Where the real photograph will live once provided. */
  pending: string;
  /** Descriptive alt text — empty when the image is purely decorative. */
  alt: string;
  /** Intended aspect ratio of the image container. */
  aspect: string;
  /** Provenance — deliberately null until a verified photograph is provided. */
  source: string | null;
  photographer: string | null;
  sourceUrl: string | null;
  license: string | null;
}

export const media = {
  /** Homepage hero background. */
  homeHero: {
    src: '/art/hero-main.svg',
    pending: '/images/church/home-hero.jpg',
    alt: '',
    aspect: '16 / 9',
    source: null,
    photographer: null,
    sourceUrl: null,
    license: null,
  },
  /** Welcome section — framed 45/55 image. */
  welcomeCommunity: {
    src: '/art/welcome-community.svg',
    pending: '/images/church/welcome-community.jpg',
    alt: 'A community gathered together',
    aspect: '4 / 3',
    source: null,
    photographer: null,
    sourceUrl: null,
    license: null,
  },
  /** "This Sunday" dark band texture (behind a pine overlay). */
  visitWorship: {
    src: '/art/visit-worship.svg',
    pending: '/images/church/visit-worship.jpg',
    alt: '',
    aspect: '16 / 9',
    source: null,
    photographer: null,
    sourceUrl: null,
    license: null,
  },
  /** Featured latest-message card. */
  featuredSermon: {
    src: '/art/hero-messages.svg',
    pending: '/images/church/featured-sermon.jpg',
    alt: '',
    aspect: '16 / 9',
    source: null,
    photographer: null,
    sourceUrl: null,
    license: null,
  },
  /** Prayer section — framed image. */
  prayer: {
    src: '/art/hero-prayer.svg',
    pending: '/images/church/prayer.jpg',
    alt: 'A candle flame burning in the dark',
    aspect: '4 / 3',
    source: null,
    photographer: null,
    sourceUrl: null,
    license: null,
  },
} as const satisfies Record<string, MediaItem>;
