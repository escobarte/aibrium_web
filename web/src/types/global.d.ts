// Ambient types for the third-party widgets injected at runtime by the
// deferred scripts in layout.tsx (Plausible analytics + Calendly widget).
export {}

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}
