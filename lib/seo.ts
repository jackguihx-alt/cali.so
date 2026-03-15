export const seo = {
  title: 'Huangxin Gui | AI 产品经理',
  description:
    '我是桂黄鑫，一名 AI 产品经理，热爱技术与创新。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')
      : 'http://localhost:3000'
  ),
} as const
