export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/PLACEHOLDER/15min'

// popup helper (script is loaded in layout.tsx via next/script)
export function openCalendlyPopup() {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    if (typeof window.plausible === 'function') window.plausible('Calendly Popup')
  }
  return false
}
