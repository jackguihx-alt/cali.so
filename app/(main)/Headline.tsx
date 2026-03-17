'use client'

import { motion } from 'framer-motion'

import { SparkleIcon } from '~/assets'
import { SocialLink } from '~/components/links/SocialLink'

function AI() {
  return (
    <span className="group">
      <span className="font-mono">&lt;</span>AI
      <span className="font-mono">/&gt;</span>
      <span className="invisible inline-flex text-zinc-300 before:content-['|'] group-hover:visible group-hover:animate-typing dark:text-zinc-500" />
    </span>
  )
}

function Innovator() {
  return (
    <span className="group inline-flex items-center">
      <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
      <span>创新者</span>
    </span>
  )
}

export function Headline() {
  return (
    <div className="max-w-2xl">
      <motion.h1
        className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 100,
          duration: 0.3,
        }}
      >
        <AI />产品经理，
        <span className="block h-2" />
        <Innovator />
      </motion.h1>
      <motion.p
        className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 85,
          duration: 0.3,
          delay: 0.1,
        }}
      >
        我是桂黄鑫，目前西南财经大学本科在读，正在朝 AI 产品经理方向持续学习与成长。我热爱技术驱动下的产品创新，关注用户需求、产品逻辑与实际应用，希望未来成为一名AI 产品经理。
      </motion.p>
      <motion.div
        className="mt-6 flex gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 90,
          duration: 0.35,
          delay: 0.25,
        }}
      >
        <SocialLink
          href="https://github.com/jackguihx-alt"
          aria-label="我的 GitHub"
          platform="github"
        />
        <SocialLink
          href="https://xhslink.com/m/AD9Qirwbgmn"
          platform="xiaohongshu"
          aria-label="我的小红书"
        />
        <SocialLink
          href="mailto:gui_hx@outlook.com"
          aria-label="我的邮箱"
          platform="mail"
        />
      </motion.div>
    </div>
  )
}
