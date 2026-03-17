import { currentUser } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { type GuestbookDto, GuestbookHashids } from '~/db/dto/guestbook.dto'
import { fetchGuestbookMessages } from '~/db/queries/guestbook'
import { guestbook } from '~/db/schema'
import NewGuestbookEmail from '~/emails/NewGuestbook'
import { env } from '~/env.mjs'
import { url } from '~/lib'
import { getResend } from '~/lib/mail'
import { ratelimit } from '~/lib/redis'

function getKey(id?: string) {
  return `guestbook${id ? `:${id}` : ''}`
}

async function checkRateLimit(key: string): Promise<boolean> {
  try {
    const { success } = await ratelimit.limit(key)
    return success
  } catch {
    // Redis not configured, skip rate limiting
    return true
  }
}

export async function GET(req: NextRequest) {
  try {
    const allowed = await checkRateLimit(getKey(req.ip ?? ''))
    if (!allowed) {
      return new Response('Too Many Requests', { status: 429 })
    }

    return NextResponse.json(await fetchGuestbookMessages())
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 })
  }
}

const SignGuestbookSchema = z.object({
  message: z.string().min(1).max(600),
})

export async function POST(req: NextRequest) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const allowed = await checkRateLimit(getKey(user.id))
  if (!allowed) {
    return new Response('Too Many Requests', { status: 429 })
  }

  try {
    const data = await req.json()
    const { message } = SignGuestbookSchema.parse(data)

    const guestbookData = {
      userId: user.id,
      message,
      userInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    }

    if (env.NODE_ENV === 'production' && env.SITE_NOTIFICATION_EMAIL_TO) {
      try {
        const resend = getResend()
        await resend.emails.send({
          from: emailConfig.from,
          to: env.SITE_NOTIFICATION_EMAIL_TO,
          subject: '👋 有人刚刚在留言墙留言了',
          react: NewGuestbookEmail({
            link: url(`/guestbook`).href,
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userImageUrl: user.imageUrl,
            commentContent: message,
          }),
        })
      } catch {
        // Email not critical, continue
      }
    }

    const [newGuestbook] = await db
      .insert(guestbook)
      .values(guestbookData)
      .returning({
        newId: guestbook.id,
      })

    return NextResponse.json(
      {
        ...guestbookData,
        id: GuestbookHashids.encode(newGuestbook.newId),
        createdAt: new Date(),
      } satisfies GuestbookDto,
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 })
  }
}
