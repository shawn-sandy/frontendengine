import { describe, expect, it } from 'vitest'
import {
  derivativeSchema,
  derivativesAheadOfPost,
  derivativesByStatus,
  distributionFields,
  type Derivative,
} from '../src/libs/distribution'

describe('derivativeSchema', () => {
  it('accepts a draft with only platform and copy', () => {
    const result = derivativeSchema.safeParse({ platform: 'linkedin', status: 'draft', copy: 'Hi' })
    expect(result.success).toBe(true)
  })

  it('requires a date on a scheduled derivative and coerces it', () => {
    expect(
      derivativeSchema.safeParse({ platform: 'instagram', status: 'scheduled', copy: 'Soon' })
        .success
    ).toBe(false)

    const parsed = derivativeSchema.parse({
      platform: 'instagram',
      status: 'scheduled',
      copy: 'Soon',
      scheduledFor: '2026-10-05T14:00:00Z',
    })
    expect(parsed.status === 'scheduled' && parsed.scheduledFor).toBeInstanceOf(Date)
  })

  it('requires a valid URL on a published derivative', () => {
    const base = { platform: 'youtube', status: 'published', copy: 'Live' }
    expect(derivativeSchema.safeParse(base).success).toBe(false)
    expect(derivativeSchema.safeParse({ ...base, publishedUrl: 'not a url' }).success).toBe(false)
    expect(
      derivativeSchema.safeParse({ ...base, publishedUrl: 'https://youtu.be/abc' }).success
    ).toBe(true)
  })

  it('rejects unknown platforms and empty copy', () => {
    expect(
      derivativeSchema.safeParse({ platform: 'myspace', status: 'draft', copy: 'x' }).success
    ).toBe(false)
    expect(
      derivativeSchema.safeParse({ platform: 'x', status: 'draft', copy: '   ' }).success
    ).toBe(false)
  })
})

describe('distributionFields', () => {
  it('caps the summary at 280 characters and defaults derivatives to []', () => {
    expect(distributionFields.summary.safeParse('a'.repeat(281)).success).toBe(false)
    expect(distributionFields.derivatives.parse(undefined)).toEqual([])
  })
})

describe('helpers', () => {
  const derivatives: Derivative[] = [
    { platform: 'linkedin', status: 'draft', copy: 'a' },
    { platform: 'x', status: 'scheduled', copy: 'b', scheduledFor: new Date('2026-10-01') },
    { platform: 'youtube', status: 'published', copy: 'c', publishedUrl: 'https://youtu.be/c' },
  ]

  it('flags non-draft derivatives only when the post is unpublished', () => {
    expect(derivativesAheadOfPost(true, derivatives)).toEqual([])
    expect(derivativesAheadOfPost(false, derivatives).map(d => d.platform)).toEqual([
      'x',
      'youtube',
    ])
  })

  it('narrows by status', () => {
    const published = derivativesByStatus(derivatives, 'published')
    expect(published).toHaveLength(1)
    expect(published[0]?.publishedUrl).toBe('https://youtu.be/c')
  })
})
