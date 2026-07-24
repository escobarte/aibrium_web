// Real booking URL lives here as a literal so the site works with zero config
// on any host. NEXT_PUBLIC_CALENDLY_URL is an OPTIONAL override; when unset the
// literal below is always used (never undefined, never breaks the build).
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/hello-aibrium'

// Low-level widget calls (the external widget script is loaded in layout.tsx).
// Popup lifecycle/state + Back-button handling live in CalendlyProvider — call
// openPopup() from useCalendly() rather than these directly.

export function initCalendlyPopup() {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    if (typeof window.plausible === 'function') window.plausible('Calendly Popup')
  }
}

// Closes/destroys the popup via Calendly's own API (not element-hiding), so the
// widget doesn't leak state or stack duplicate iframes on reopen.
export function closeCalendlyPopup() {
  if (typeof window !== 'undefined' && window.Calendly?.closePopupWidget) {
    window.Calendly.closePopupWidget()
  }
}
