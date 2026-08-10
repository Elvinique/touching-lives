// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The real domain can be provided via PUBLIC_SITE_URL (e.g. in .env.local).
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const siteUrl = env.PUBLIC_SITE_URL || 'https://touching-lives.pages.dev';

export default defineConfig({
  site: siteUrl,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Inline small scripts so the page is fully usable without extra requests.
    inlineStylesheets: 'auto',
  },
});
