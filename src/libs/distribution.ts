/**
 * Social distribution schema for FrontendEngine posts.
 *
 * Each post is a pillar; each derivative is one platform-native piece cut from
 * it (a Short, a carousel, a LinkedIn post). Derivatives live in the post's own
 * frontmatter so the post file is the single record of what went where, and the
 * content-collection build rejects a malformed one before it can ship.
 *
 * `status` discriminates the union, so the fields a state needs are required by
 * the type rather than by convention: a scheduled derivative cannot omit its
 * date and a published one cannot omit its URL.
 */
import { z } from 'astro/zod'

export const PLATFORMS = [
  'youtube',
  'youtube-shorts',
  'instagram',
  'linkedin',
  'tiktok',
  'x',
  'bluesky',
  'threads',
  'newsletter',
] as const

export const platformSchema = z.enum(PLATFORMS)

const derivativeBase = {
  platform: platformSchema,
  /** Platform-ready copy: caption, post body or video description. */
  copy: z.string().trim().min(1),
  /** Path or URL of the asset that goes out with the copy (video, carousel, image). */
  asset: z.string().optional(),
}

export const derivativeSchema = z.discriminatedUnion('status', [
  z.object({ ...derivativeBase, status: z.literal('draft') }),
  z.object({ ...derivativeBase, status: z.literal('scheduled'), scheduledFor: z.coerce.date() }),
  z.object({
    ...derivativeBase,
    status: z.literal('published'),
    publishedUrl: z.url(),
    publishedAt: z.coerce.date().optional(),
  }),
])

/** Fields the `posts` collection adds on top of the shared base schema. */
export const distributionFields = {
  /** Social-length summary; falls back to `description` wherever it is shown. */
  summary: z.string().trim().max(280).optional(),
  derivatives: z.array(derivativeSchema).default([]),
}

export type Platform = z.infer<typeof platformSchema>
export type Derivative = z.infer<typeof derivativeSchema>
export type DerivativeStatus = Derivative['status']

/**
 * A derivative that is scheduled or live points readers at the post, so the
 * post itself has to be published. Returns the offending derivatives, if any.
 */
export function derivativesAheadOfPost(
  publish: boolean,
  derivatives: readonly Derivative[]
): Derivative[] {
  return publish ? [] : derivatives.filter(d => d.status !== 'draft')
}

export function derivativesByStatus<S extends DerivativeStatus>(
  derivatives: readonly Derivative[],
  status: S
): Extract<Derivative, { status: S }>[] {
  return derivatives.filter((d): d is Extract<Derivative, { status: S }> => d.status === status)
}
