'use client'

import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  onDark?: boolean
  size?: 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-btn font-body font-medium uppercase tracking-[0.08em] transition-colors duration-300 cursor-pointer'

const sizes = {
  md: 'text-[13px] px-[26px] py-[14px]',
  lg: 'text-[14px] px-[34px] py-[17px]',
}

export function Button({
  variant = 'primary',
  onDark = false,
  size = 'md',
  href,
  onClick,
  className,
  children,
}: ButtonProps) {
  const variants = {
    primary: 'bg-gold text-ink hover:bg-gold-hover',
    secondary: onDark
      ? 'bg-transparent border-[1.5px] border-cream text-cream hover:bg-cream hover:text-ink'
      : 'bg-transparent border-[1.5px] border-ink text-ink hover:bg-ink hover:text-cream',
  }

  const classes = cn(base, sizes[size], variants[variant], className)

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
