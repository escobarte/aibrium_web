'use client'

import { useCalendly } from '@/components/CalendlyProvider'
import { Button } from './Button'

type CalendlyButtonProps = {
  variant?: 'primary' | 'secondary'
  onDark?: boolean
  size?: 'md' | 'lg'
  className?: string
  // Runs BEFORE the popup opens — e.g. close the mobile menu first (req 17).
  onClick?: () => void
  children: React.ReactNode
}

// Opens the Calendly popup via the provider (which owns lifecycle + Back-button).
export function CalendlyButton({
  variant = 'primary',
  onDark = false,
  size = 'md',
  className,
  onClick,
  children,
}: CalendlyButtonProps) {
  const { openPopup } = useCalendly()
  return (
    <Button
      variant={variant}
      onDark={onDark}
      size={size}
      className={className}
      onClick={() => {
        onClick?.()
        openPopup()
      }}
    >
      {children}
    </Button>
  )
}
