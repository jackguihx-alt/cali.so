import { Resend } from 'resend'

import { env } from '~/env.mjs'

export function getResend() {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  return new Resend(env.RESEND_API_KEY)
}
