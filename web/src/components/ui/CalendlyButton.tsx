'use client'

import { openCalendlyPopup } from '@/lib/calendly'
import { Button } from './Button'

type CalendlyButtonProps = {
  variant?: 'primary' | 'secondary'
  onDark?: boolean
  size?: 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

// Opens the Calendly popup (widget script is loaded in layout.tsx).
export function CalendlyButton({
  variant = 'primary',
  onDark = false,
  size = 'md',
  className,
  children,
}: CalendlyButtonProps) {
  return (
    <Button
      variant={variant}
      onDark={onDark}
      size={size}
      className={className}
      onClick={openCalendlyPopup}
    >
      {children}
    </Button>
  )
}
