import Balancer from 'react-wrap-balancer'

import { Container } from '~/components/ui/Container'

const title = 'AMA 咨询'
const description =
  '我是桂黄鑫，一名 AI 产品经理。我有 AI 产品设计、产品策略、用户体验等方面的经验，可以为你解答相关的问题。'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image' as const,
  },
}

export default function AskMeAnythingPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Ask Me Anything / 咨询
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>

      <article className="prose dark:prose-invert">
        <h2>咨询内容</h2>
        <p>我可以为你解答以下相关的问题：</p>
        <ul>
          <li>
            <b>AI 产品设计</b>
            ：如何设计 AI 产品？如何将 AI 能力融入产品？
          </li>
          <li>
            <b>产品策略</b>：产品规划、用户增长、商业模式等方面的经验分享。
          </li>
          <li>
            <b>用户体验</b>：如何打造更好的用户体验？如何进行用户调研？
          </li>
          <li>
            <b>其他</b>
            ：任何你想聊的话题，欢迎交流。
          </li>
        </ul>

        <h2>联系方式</h2>
        <p>
          如果你有任何问题，欢迎通过邮件联系我：
          <a href="mailto:gui_hx@outlook.com">gui_hx@outlook.com</a>
        </p>
      </article>
    </Container>
  )
}
