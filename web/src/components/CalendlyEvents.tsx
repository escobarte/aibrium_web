'use client'

import { useEffect } from 'react'
import { trackBooking } from '@/lib/analytics'

type CalendlyMessage = { event?: string }

// Listens for Calendly's postMessage and fires a Plausible 'Booking' event when
// an inline/popup booking completes. Renders nothing.
export function CalendlyEvents() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return
      const data = e.data as CalendlyMessage
      if (data?.event === 'calendly.event_scheduled') {
        trackBooking()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return null
}
