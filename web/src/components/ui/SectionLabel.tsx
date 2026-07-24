import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: React.ReactNode
  onDark?: boolean
  hairline?: boolean
  className?: string
}

// Gold small-caps label. Letter-spacing comes from CSS tracking — never type
// spaces between letters. Optional 24px gold hairline to the left.
export function SectionLabel({
  children,
  onDark = false,
  hairline = false,
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-label text-[13px] font-medium uppercase tracking-[0.22em] text-gold',
        className,
      )}
    >
      {hairline && (
        <span
          aria-hidden
          className={cn('h-px w-6 bg-gold', onDark && 'opacity-90')}
        />
      )}
      {children}
    </span>
  )
}
