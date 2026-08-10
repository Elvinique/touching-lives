import type { APIRoute } from 'astro';
import { site } from '@/config/site';

/** robots.txt — generated so the Sitemap URL always matches the configured domain. */
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
