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
        'inline-flex items-center gap-3 font-label text-[13px] font-medium uppercase tracking-[0.22em]',
        // Brand gold on dark backgrounds; darker gold-deep on cream/white for contrast.
        onDark ? 'text-gold' : 'text-gold-deep',
        className,
      )}
    >
      {hairline && (
        <span
          aria-hidden
          className={cn('h-px w-6', onDark ? 'bg-gold opacity-90' : 'bg-gold-deep')}
        />
      )}
      {children}
    </span>
  )
}
