import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    speaker: z.string(),
    date: z.coerce.date(),
    scripture: z.string().optional(),
    duration: z.string().optional(),
    description: z.string(),
    image: z.string(),
    /** External watch URL (YouTube etc.). The play button links here when set. */
    videoUrl: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    time: z.string(),
    location: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string(),
    registrationUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const ministries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ministries' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    audience: z.string(),
    meets: z.string().optional(),
    leader: z.string().optional(),
    description: z.string(),
    image: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/leadership' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    email: z.string().optional(),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    body: z.string(),
    href: z.string().optional(),
    cta: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  sermons,
  events,
  ministries,
  leadership,
  announcements,
};
