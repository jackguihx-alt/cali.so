import { createClient } from 'next-sanity'

import { apiVersion, dataset, hasSanityConfig, projectId, useCdn } from '../env'

type SanityLikeClient = {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T | null>
}

export const client: SanityLikeClient = hasSanityConfig
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn,
      // perspective: 'published',
    })
  : {
      fetch: async () => null,
    }
