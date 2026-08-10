/**
 * Centralized church configuration.
 *
 * Every piece of church-specific data lives here (or in an environment
 * variable). Replace the placeholder values with the real ones before launch —
 * they are deliberately grouped so nothing else in the codebase needs to change.
 */

export interface ServiceTime {
  id: string;
  label: string;
  note: string;
}

export const site = {
  name: 'Touching Lives Church',
  shortName: 'Touching Lives',
  legalName: 'Touching Lives Church',
  description:
    'A modern, welcoming church in Austin, Texas. Come as you are — find faith, find community, and find your place.',
  // Set PUBLIC_SITE_URL (e.g. in .env.local) to override the placeholder domain.
  url: import.meta.env.PUBLIC_SITE_URL || 'https://touching-lives.pages.dev',

  address: {
    street: '2100 Fellowship Lane',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
  },

  // TODO: replace placeholders with real contact details
  phone: '(512) 555-0148',
  email: 'hello@touchinglives.church',

  serviceTimes: [
    { id: 'classic', label: '9:00 AM', note: 'Classic worship · choir & hymns' },
    { id: 'contemporary', label: '11:00 AM', note: 'Contemporary worship · full band' },
  ] as ServiceTime[],

  // Only networks with a configured URL are displayed anywhere on the site.
  social: {
    youtube: import.meta.env.PUBLIC_YOUTUBE_URL || '',
    instagram: '',
    facebook: '',
    tiktok: '',
    x: '',
  },

  /** External giving link. Set PUBLIC_GIVING_URL (e.g. in .env.local) to enable. */
  givingUrl: import.meta.env.PUBLIC_GIVING_URL || '',
  /** External sermon channel (YouTube). Set PUBLIC_YOUTUBE_URL to enable. */
  youtubeChannel: import.meta.env.PUBLIC_YOUTUBE_URL || '',

  mapUrl: import.meta.env.PUBLIC_GOOGLE_MAPS_URL ||
    'https://www.google.com/maps/search/?api=1&query=2100%20Fellowship%20Lane%2C%20Austin%2C%20TX%2078704',

  /**
   * Form endpoints. The prayer/contact/newsletter forms validate locally and
   * POST JSON to these endpoints when configured (e.g. a free Formspree or
   * Basin account). Until one is configured, forms show an honest "not yet
   * connected" notice instead of pretending to send.
   */
  forms: {
    prayerEndpoint: import.meta.env.PUBLIC_PRAYER_ENDPOINT || '',
    contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
    newsletterEndpoint: import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT || '',
  },
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Plan Your Visit', href: '/visit' },
  { label: 'Messages', href: '/messages' },
  { label: 'Events', href: '/events' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Prayer', href: '/prayer' },
  { label: 'Give', href: '/give' },
] as const;

export const footerNav = {
  visit: [
    { label: 'Plan Your Visit', href: '/visit' },
    { label: 'Service Times', href: '/visit#when-we-meet' },
    { label: 'Find Us', href: '/visit#where-we-are' },
    { label: 'What to Expect', href: '/visit#what-to-expect' },
  ],
  connect: [
    { label: 'About Us', href: '/about' },
    { label: 'Messages', href: '/messages' },
    { label: 'Events', href: '/events' },
    { label: 'Ministries', href: '/ministries' },
    { label: 'Prayer', href: '/prayer' },
  ],
  serve: [
    { label: 'Give', href: '/give' },
    { label: 'Contact', href: '/contact' },
    { label: 'Request Prayer', href: '/prayer' },
  ],
} as const;
