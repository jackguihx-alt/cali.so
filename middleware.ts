import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // 除了后台管理接口，其他都公开（无需登录即可访问页面）
  publicRoutes: ['/((?!api/admin).*)'],
})

export const config = {
  matcher: ['/((?!_next|studio|.*\\..*).*)'],
}
