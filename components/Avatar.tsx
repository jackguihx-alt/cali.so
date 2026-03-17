import { type ComponentProps } from '@zolplay/react'
import { clsxm } from '@zolplay/utils'
import Image from 'next/image'
import Link, { type LinkProps } from 'next/link'

function AvatarContainer({ className, ...props }: ComponentProps) {
  return (
    <div
      className={clsxm(className, 'h-10 w-10 overflow-hidden rounded-full')}
      {...props}
    />
  )
}

type AvatarImageProps = ComponentProps &
  Omit<LinkProps, 'href'> & {
    large?: boolean
    href?: string
    alt?: boolean
  }
function AvatarImage({
  large = false,
  className,
  href,
  alt = false,
  ...props
}: AvatarImageProps) {
  return (
    <Link
      aria-label="主页"
      className={clsxm(className, 'pointer-events-auto')}
      href={href ?? '/'}
      {...props}
    >
      <Image
        src={alt ? '/portrait-alt.png' : '/portrait.png'}
        alt=""
        width={large ? 64 : 40}
        height={large ? 64 : 40}
        sizes={large ? '4rem' : '2.25rem'}
        className={clsxm(
          'scale-[1.18] rounded-full object-cover',
          large ? 'h-16 w-16' : 'h-10 w-10'
        )}
        priority
      />
    </Link>
  )
}

export const Avatar = Object.assign(AvatarContainer, { Image: AvatarImage })
