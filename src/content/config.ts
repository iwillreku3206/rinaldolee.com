import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const isoDateStringRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    summary: z.string(),
    publishDate: z.string().regex(isoDateStringRegex).or(z.date()),
    updateDate: z.string().regex(isoDateStringRegex).or(z.date()),
    author: z.string().default('Rinaldo Lee'),
    tags: z.array(z.string()),
    image: z.object({
      src: z.string(),
      alt: z.string().default("Article Image"),
    }).optional(),
  })
})

export const collections = {
  'blog': blogCollection
}
