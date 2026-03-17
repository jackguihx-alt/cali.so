import { env } from '~/env.mjs'

export const apiVersion = '2024-02-12'
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const useCdn = env.NEXT_PUBLIC_SANITY_USE_CDN
export const hasSanityConfig = Boolean(projectId && dataset)
