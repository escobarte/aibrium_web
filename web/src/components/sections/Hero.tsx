'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HERO_LOGO } from '@/lib/catalogues'
import { fadeInUp, stagger } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { CalendlyButton } from '@/components/ui/CalendlyButton'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-cream"
      style={{
        // Warm radial from #242018 near the image toward ink.
        backgroundImage:
          'radial-gradient(60% 80% at 75% 40%, #242018 0%, #1A1A1A 70%)',
      }}
    >
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-16 lg:py-32">
        {/* Text — first in DOM: on mobile it leads; on lg it fills the left column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel onDark>Creative Studio · Fashion &amp; Lifestyle</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            // Playfair Display optical tuning (2026-07-28, face swap from EB
            // Garamond). Size + scale unchanged; only tracking + leading moved.
            // -0.02em: Playfair sets wider than EB Garamond at display sizes.
            // 1.08: Playfair's cap+descender span is ~0.98em vs EB Garamond's
            // ~0.93em, so 1.05 left ~40% less air between wrapped lines — and
            // this H1 wraps to 2 lines at 1440px, 3 at 390px.
            className="mt-6 font-display font-semibold tracking-[-0.02em] text-cream [font-size:clamp(44px,6vw,84px)] [line-height:1.08]"
          >
            Your brand&apos;s own models. New visuals every week.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-[52ch] font-body text-[18px] leading-relaxed text-[#B9B2A6]"
          >
            Aibrium Studio casts exclusive digital models for fashion and
            lifestyle brands — then delivers campaign-quality on-model visuals of
            your products, week after week. No photoshoots, no studios, no
            waiting.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <CalendlyButton size="lg">Book a 30-min Call</CalendlyButton>
            <Button variant="secondary" onDark size="lg" href="#work">
              See the Work
            </Button>
          </motion.div>

          {/*
            Mobile/tablet facts — the two facts that live in the floating cards
            on desktop. This block exists only as a stand-in for a HIDDEN visual.

            TRIAL 2026-07-28 (pair with the visual block below): the visual now
            shows on mobile WITH both floating cards, so this block would print
            DELIVERY / YOUR MODEL a second time. Hidden for the duration of the
            trial. To end the trial, restore `mt-10 flex flex-col gap-5 lg:hidden`
            here and `hidden lg:block` on the visual — those two lines are the
            whole change.
          */}
          <motion.div
            variants={fadeInUp}
            className="hidden"
          >
            <div>
              <SectionLabel onDark>Delivery</SectionLabel>
              <p className="mt-1.5 font-body text-[17px] leading-snug text-cream">
                Finished visuals every Friday
              </p>
            </div>
            <div>
              <SectionLabel onDark>Your Model</SectionLabel>
              <p className="mt-1.5 font-body text-[17px] leading-snug text-cream">
                Exclusive to your brand — never reused
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/*
          Visual — second in DOM so desktop gets text-left / visual-right from
          natural grid flow.

          TRIAL 2026-07-28 — THIS LINE IS THE SWITCH. Was `relative hidden
          lg:block` (desktop-only). Now shown at every width, and `order-first`
          lifts it ABOVE the heading on mobile; `lg:order-none` hands the order
          back to DOM flow at lg, so desktop is byte-identical to before.
          To end the trial: restore `relative hidden lg:block` here and
          `mt-10 flex flex-col gap-5 lg:hidden` on the facts block above.

          Everything below sizes itself off the card, and every mobile value is
          overridden at `lg:` with the pre-trial desktop value — so the trial
          cannot touch desktop.
        */}
        <div className="relative order-first block lg:order-none">
          {/* Soft gold bloom behind the image */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-0 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(138,109,59,0.28), transparent 70%)',
            }}
          />
          {/*
            The light card. Its cream fill + 7/5 ratio are what the placeholder
            image used to supply, so the panel keeps the exact footprint the
            floating cards below are positioned against. The logo is transparent
            (RGBA), so the black + gold artwork sits directly on this cream fill
            — no box behind it. Light card only, never the ink bg.

            lg:p-32 is what keeps the horizontal lockup clear of the two
            floating cards on DESKTOP. Those cards have FIXED heights (75px /
            72.5px, from py-4 + their line heights) at a fixed top-10 / bottom-10
            inset, while this card is fluid (456px→544px wide across lg→1200px+),
            so the clear band between them is only `cardH - 227`. Because the
            lockup is wide and the cards sit at opposite corners, staying inside
            that band clears BOTH of them at any width. Padding in the same fixed
            px units as the cards' fixed heights caps the logo at `cardH - 256`
            tall and holds across the whole desktop range: 148.0×69.7 at lg,
            281.6×132.6 at 1200px+, each clearing card A by 13px and card B by
            15.5px. Enlarging the mark means moving the floating cards out of the
            band — not reducing this padding.

            BELOW lg (trial), p-32 cannot apply: at 390px the card is only
            342×244.3, so 128px padding would give the logo a NEGATIVE box.
            px-[8%] py-[23.6%] instead. Padding percentages resolve against the
            card's WIDTH, and card height = width/1.4 (aspect-[7/5]), so 23.6%
            of width == 33% of height — the padding scales WITH the card and the
            lockup holds a constant ~51% of card width, the same proportion as
            desktop. At 390px: logo 176.1×82.9 at y 80.7→163.6, clearing the
            shrunken card A (ends 71.3) by 9.5px and card B (starts 174.3) by
            10.7px. At 768px: logo 370.6×174.5, clearances 97px / 98px — the
            floating cards keep their fixed heights while the card grows, so the
            margins only widen from here.
          */}
          <div className="relative z-10 flex aspect-[7/5] items-center justify-center overflow-hidden rounded-xl bg-cream px-[8%] py-[23.6%] lg:p-32">
            <Image
              src={HERO_LOGO}
              alt="Aibrium Studio"
              // 850×400 = 2.125:1, the trimmed file's real 3211×1512 artwork
              // ratio (2.1237) — NOT 1:1. Reserves the correct box up front, so
              // nothing shifts, and keeps the srcset candidates sane.
              width={850}
              height={400}
              // The hero mark: load it immediately, don't lazy it.
              priority
              // Capped by the padded box above, centred by the flex container.
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>

          {/*
            Floating info-cards (true facts only). TRIAL 2026-07-28: these now
            show on mobile too. Every base value is the shrunken mobile one and
            every `lg:` value is the untouched desktop one, so desktop renders
            exactly as before. Mobile sizes are chosen to keep both cards single
            -line: wrapping would make them taller and squeeze the clear band the
            logo sits in. Widths at 390px come to ~201px (card A, from x 16) and
            ~274px (card B, right edge x 374) inside a 390px viewport — and the
            section's own overflow-hidden makes a sideways scroll impossible even
            if a glyph estimate is off.
          */}
          <div className="pointer-events-none absolute inset-0 z-20 block">
            <div className="absolute -left-2 top-4 rounded-md bg-cream/95 px-3 py-2.5 text-ink shadow-float backdrop-blur-sm lg:-left-6 lg:top-10 lg:px-5 lg:py-4">
              <p className="font-label text-[10px] font-medium uppercase tracking-[0.22em] text-gold-deep lg:text-[11px]">
                Delivery
              </p>
              <p className="mt-1 font-display text-[13px] leading-tight lg:text-[18px]">
                Finished visuals every Friday
              </p>
            </div>

            <div className="absolute -right-2 bottom-4 flex items-center gap-2 rounded-md bg-white/95 px-3 py-2.5 text-ink shadow-float backdrop-blur-sm lg:-right-4 lg:bottom-10 lg:gap-3 lg:px-5 lg:py-4">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink font-display text-[13px] text-cream lg:h-9 lg:w-9 lg:text-[15px]">
                A
              </span>
              <div>
                <p className="font-label text-[10px] font-medium uppercase tracking-[0.22em] text-gold-deep lg:text-[11px]">
                  Your model
                </p>
                <p className="mt-1 font-display text-[12px] leading-tight lg:text-[16px]">
                  Exclusive to your brand — never reused
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
