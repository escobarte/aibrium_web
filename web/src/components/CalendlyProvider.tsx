'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { initCalendlyPopup, closeCalendlyPopup } from '@/lib/calendly'
import { useBackToClose } from '@/hooks/useBackToClose'

type CalendlyContextValue = { openPopup: () => void }

const CalendlyContext = createContext<CalendlyContextValue>({
  openPopup: () => {},
})

export const useCalendly = () => useContext(CalendlyContext)

// Owns the Calendly popup lifecycle so the Back button (via useBackToClose) can
// close it and keep the user on the site, and so Calendly's own API is used to
// dismiss the widget (no iframe leak on reopen).
export function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openPopup = useCallback(() => {
    initCalendlyPopup()
    setOpen(true)
  }, [])

  const closePopup = useCallback(() => {
    closeCalendlyPopup()
    setOpen(false)
  }, [])

  // Back button → close popup, stay on the page.
  useBackToClose(open, closePopup)

  // Calendly's own close (its X) removes `.calendly-overlay` from the DOM. Sync
  // our state so useBackToClose consumes the pushed history entry too.
  useEffect(() => {
    if (!open) return
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.removedNodes)) {
          if (
            node instanceof HTMLElement &&
            (node.classList.contains('calendly-overlay') ||
              node.querySelector?.('.calendly-overlay'))
          ) {
            setOpen(false)
            return
          }
        }
      }
    })
    observer.observe(document.body, { childList: true })
    return () => observer.disconnect()
  }, [open])

  return (
    <CalendlyContext.Provider value={{ openPopup }}>
      {children}
    </CalendlyContext.Provider>
  )
}
