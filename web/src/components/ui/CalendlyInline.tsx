'use client'

import { CALENDLY_URL } from '@/lib/calendly'

// Inline Calendly widget. The external widget script (loaded in layout.tsx)
// auto-initializes any .calendly-inline-widget on the page.
export function CalendlyInline() {
  return (
    <div
      className="calendly-inline-widget rounded-md border border-[var(--hairline)] bg-white shadow-card"
      data-url={CALENDLY_URL}
      style={{ minWidth: 320, height: 680 }}
    />
  )
}
