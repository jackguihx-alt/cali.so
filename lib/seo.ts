export const seo = {
  title: 'Huangxin Gui | AI 产品经理',
  description:
    '我是桂黄鑫，目前西南财经大学本科在读，正在朝 AI 产品经理方向持续学习与成长。我热爱技术驱动下的产品创新，关注用户需求、产品逻辑与实际应用，希望未来成为一名兼具产品思维与技术理解能力的 AI 产品经理。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')
      : 'http://localhost:3000'
  ),
} as const
