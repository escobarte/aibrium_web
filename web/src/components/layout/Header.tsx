'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CalendlyButton } from '@/components/ui/CalendlyButton'

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Solid = after scroll OR when the mobile menu is open (needs a readable bg).
  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid
          ? 'bg-cream text-ink shadow-[0_1px_0_var(--hairline)]'
          : 'bg-transparent text-cream',
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[22px] font-semibold leading-none"
        >
          Aibrium. <span className="text-gold">Studio</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-label text-[14px] transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <CalendlyButton>Book a Call</CalendlyButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden"
        >
          {menuOpen ? (
            <X strokeWidth={1.5} className="h-6 w-6" />
          ) : (
            <Menu strokeWidth={1.5} className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile slide-in menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--hairline)] bg-cream px-6 pb-8 pt-4 text-ink md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-label text-[16px] transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4">
            <CalendlyButton className="w-full">Book a Call</CalendlyButton>
          </div>
        </nav>
      )}
    </header>
  )
}
