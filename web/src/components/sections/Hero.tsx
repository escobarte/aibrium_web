'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HERO_IMAGE } from '@/lib/catalogues'
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
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 md:min-h-[88vh] md:grid-cols-2 md:gap-16 md:py-32">
        {/* Visual — first in DOM so it sits above text on mobile */}
        <div className="relative order-1 md:order-2">
          {/* Soft gold bloom behind the image */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-0 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(138,109,59,0.28), transparent 70%)',
            }}
          />
          <div className="relative z-10 overflow-hidden rounded-xl">
            <Image
              src={HERO_IMAGE}
              alt="On-model campaign visual produced by Aibrium Studio"
              width={1400}
              height={1000}
              priority
              // TODO: remove unoptimized once real /public images replace placeholders.
              unoptimized
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Floating info-cards (true facts only) — hidden on mobile */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
            <div className="absolute -left-6 top-10 rounded-md bg-cream/95 px-5 py-4 text-ink shadow-float backdrop-blur-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
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
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                  Your model
                </p>
                <p className="mt-1 font-display text-[16px] leading-tight">
                  Exclusive to your brand — never reused
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <motion.div
          className="order-2 md:order-1"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel>Creative Studio · Fashion &amp; Lifestyle</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-display font-semibold text-cream [font-size:clamp(44px,6vw,84px)] [line-height:1.05]"
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
            <CalendlyButton size="lg">Book a 15-min Call</CalendlyButton>
            <Button variant="secondary" onDark size="lg" href="#work">
              See the Work
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
