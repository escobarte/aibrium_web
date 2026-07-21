'use client'

import { openCalendlyPopup } from '@/lib/calendly'
import { trackMailtoClick } from '@/lib/analytics'

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
          {/* Column 1 — wordmark */}
          <div>
            <p className="font-display text-[22px] font-semibold leading-none">
              Aibrium. <span className="text-gold">Studio</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed text-[#B9B2A6]">
              Creative studio for fashion &amp; lifestyle brands.
            </p>
          </div>

          {/* Column 2 — contact */}
          <div className="flex flex-col gap-4 text-[14px]">
            <div>
              <p className="mb-1 text-[12px] uppercase tracking-[0.22em] text-gold">
                General
              </p>
              <a
                href="mailto:hello@aibrium.com"
                onClick={trackMailtoClick}
                className="transition-colors hover:text-gold"
              >
                hello@aibrium.com
              </a>
            </div>
            <div>
              <p className="mb-1 text-[12px] uppercase tracking-[0.22em] text-gold">
                Production
              </p>
              <a
                href="mailto:office@aibriumstudio.com"
                onClick={trackMailtoClick}
                className="transition-colors hover:text-gold"
              >
                office@aibriumstudio.com
              </a>
            </div>
          </div>

          {/* Column 3 — nav */}
          <nav className="flex flex-col gap-3 text-[14px]">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={openCalendlyPopup}
              className="text-left transition-colors hover:text-gold"
            >
              Book a call
            </button>
          </nav>
        </div>

        {/* Bottom legal line */}
        <div className="mt-14 border-t border-white/10 pt-8 text-[13px] text-[#B9B2A6]">
          © 2026 «Mining capital LLC» SRL, t/a Aibrium Studio · Chișinău,
          Republic of Moldova ·{' '}
          <a href="/privacy" className="transition-colors hover:text-gold">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
