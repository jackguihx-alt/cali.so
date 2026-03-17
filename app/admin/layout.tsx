import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children: _children,
}: {
  children: React.ReactNode
}) {
  // Admin is disabled without Clerk auth
  redirect('/')
}
