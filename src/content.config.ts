import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

import { derivativesAheadOfPost, distributionFields } from './libs/distribution'

const baseSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string(),
  breadcrumbSlug: z.string().optional(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  publish: z.boolean().default(false),
  featured: z.boolean().default(false),
  youtube: z
    .object({
      id: z.string(),
      title: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
})

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: baseSchema.extend(distributionFields).superRefine((post, ctx) => {
    for (const derivative of derivativesAheadOfPost(post.publish, post.derivatives)) {
      ctx.addIssue({
        code: 'custom',
        path: ['derivatives'],
        message: `A ${derivative.status} ${derivative.platform} derivative links to this post, so the post needs \`publish: true\`.`,
      })
    }
  }),
})

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    }),
  }),
})

const content = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/content' }),
  schema: baseSchema,
})

export const collections = {
  posts,
  docs,
  content,
}
