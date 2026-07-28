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
            on desktop. Rendered below the CTAs on screens < lg (where the visual
            block is hidden) so the facts never disappear. lg:hidden because the
            floating cards carry them on desktop.
          */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-5 lg:hidden"
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
          Visual — second in DOM, and desktop-only: hidden below lg (card, logo
          and both floating cards), so mobile shows no card at all and the
          section starts straight with the text. It already follows the text in
          source order, so re-enabling it on mobile BELOW the text would be
          `hidden lg:block` → `block` — no markup rewrite.

          (A trial on 2026-07-28 showed it on mobile above the heading; reverted
          the same day. Mobile is deliberately text-only.)
        */}
        <div className="relative hidden lg:block">
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

            p-32 is what keeps the horizontal lockup clear of the two floating
            cards. Those cards have FIXED heights (75px / 72.5px, from py-4 +
            their line heights) at a fixed top-10 / bottom-10 inset, while this
            card is fluid (456px→544px wide across lg→1200px+), so the clear
            band between them is only `cardH - 227`. Because the lockup is wide
            and the cards sit at opposite corners, staying inside that band
            clears BOTH of them at any width. Padding in the same fixed px units
            as the cards' fixed heights caps the logo at `cardH - 256` tall and
            holds across the whole desktop range: 148.0×69.7 at lg, 281.6×132.6
            at 1200px+, each clearing card A by 13px and card B by 15.5px.
            Enlarging the mark means moving the floating cards out of the band —
            not reducing this padding.

            This card only ever renders at lg+, so p-32 needs no mobile
            counterpart. (The 2026-07-28 mobile trial needed px-[8%] py-[23.6%]
            here, because at 390px the card is 342×244.3 and 128px padding gives
            the logo a NEGATIVE box. Reverted with the trial.)
          */}
          <div className="relative z-10 flex aspect-[7/5] items-center justify-center overflow-hidden rounded-xl bg-cream p-32">
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

          {/* Floating info-cards (true facts only) — desktop only via parent gate */}
          <div className="pointer-events-none absolute inset-0 z-20 block">
            <div className="absolute -left-6 top-10 rounded-md bg-cream/95 px-5 py-4 text-ink shadow-float backdrop-blur-sm">
              <p className="font-label text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                Delivery
              </p>
              <p className="mt-1 font-display text-[18px] leading-tight">
                Finished visuals every Friday
              </p>
            </div>

            <div className="absolute -right-4 bottom-10 flex items-center gap-3 rounded-md bg-white/95 px-5 py-4 text-ink shadow-float backdrop-blur-sm">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink font-display text-[15px] text-cream">
                A
              </span>
              <div>
                <p className="font-label text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                  Your model
                </p>
                <p className="mt-1 font-display text-[16px] leading-tight">
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
