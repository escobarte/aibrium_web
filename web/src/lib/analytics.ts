// Thin wrappers around Plausible custom events. Plausible is injected by the
// deferred script in layout.tsx; every call is a no-op until it loads, so these
// never block or throw.

export function trackMailtoClick() {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible('Mailto Click')
  }
}

export function trackBooking() {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible('Booking')
  }
}
