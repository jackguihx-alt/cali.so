import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { GuestbookHashids } from '~/db/dto/guestbook.dto'
import { guestbook } from '~/db/schema'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const [numericId] = GuestbookHashids.decode(params.id)
  if (!numericId) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const [row] = await db
    .select({ userId: guestbook.userId })
    .from(guestbook)
    .where(eq(guestbook.id, Number(numericId)))

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (row.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await db.delete(guestbook).where(eq(guestbook.id, Number(numericId)))

  return NextResponse.json({ success: true })
}
