// Real booking URL lives here as a literal so the site works with zero config
// on any host. NEXT_PUBLIC_CALENDLY_URL is an OPTIONAL override; when unset the
// literal below is always used (never undefined, never breaks the build).
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/hello-aibrium'

// popup helper (script is loaded in layout.tsx via next/script)
export function openCalendlyPopup() {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    if (typeof window.plausible === 'function') window.plausible('Calendly Popup')
  }
  return false
}
