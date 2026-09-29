import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '#utils/site-config'

export const prerender = true

export async function GET(context: APIContext): Promise<Response> {
  const posts = (await getCollection('posts', ({ data }) => data.publish)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // `site` is set from SITE_URL in astro.config.mjs; the request origin is the fallback.
    site: context.site ?? context.url.origin,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.summary ?? post.data.description,
      link: `/posts/${post.id}/`,
      categories: post.data.tags ?? [],
    })),
    customData: '<language>en-us</language>',
  })
}
