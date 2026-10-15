import z from "astro/zod";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    summary: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    author: z.string().default("Rinaldo Lee"),
    tags: z.array(z.string()),
    image: z
      .object({
        src: z.string(),
        alt: z.string().default("Article Image"),
      })
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
