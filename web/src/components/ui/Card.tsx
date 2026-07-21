import { cn } from '@/lib/utils'

type CardProps = {
  interactive?: boolean
  className?: string
  children: React.ReactNode
}

// Base card per the design system. `interactive` enables the portfolio/pricing
// hover: hairline → gold (image zoom is applied by the child image via `group`).
export function Card({ interactive = false, className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-[var(--hairline)] bg-white shadow-card',
        interactive &&
          'group transition-colors duration-[400ms] ease-in-out hover:border-gold',
        className,
      )}
    >
      {children}
    </div>
  )
}
