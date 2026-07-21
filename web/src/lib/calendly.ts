export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/PLACEHOLDER/15min'

// popup helper (script is loaded in layout.tsx via next/script)
export function openCalendlyPopup() {
  // @ts-expect-error Calendly is injected by the external widget script
  if (typeof window !== 'undefined' && window.Calendly) {
    // @ts-expect-error Calendly is injected by the external widget script
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    // @ts-expect-error Plausible is injected by the analytics script
    if (typeof window.plausible === 'function') window.plausible('Calendly Popup')
  }
  return false
}
