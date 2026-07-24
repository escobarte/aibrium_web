'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CalendlyButton } from '@/components/ui/CalendlyButton'

type Tier = {
  name: string
  price: string
  cadence?: string
  features: string[]
  popular?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'CORE',
    price: '$3,900',
    cadence: '/mo',
    features: [
      '40 visuals monthly',
      '1 exclusive model',
      '1 brand',
      'Weekly delivery',
      '2 revision rounds',
    ],
  },
  {
    name: 'ENGINE',
    price: '$5,900',
    cadence: '/mo',
    popular: true,
    features: [
      '70 visuals monthly',
      'Up to 3 exclusive models',
      'Monthly strategy call',
    ],
  },
  {
    name: 'FULL STUDIO',
    price: '$8,900',
    cadence: '/mo',
    features: [
      '120 visuals monthly',
      'Up to 5 exclusive models',
      'Up to 2 brands',
      'Priority delivery',
    ],
  },
]

export function Pricing() {
  return (
    <motion.section
      id="pricing"
      className="bg-cream [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-content px-6">
        <motion.div variants={fadeInUp}>
          <SectionLabel hairline>Pricing</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
        >
          Start with a pilot. Scale when it works.
        </motion.h2>

        {/* Featured PILOT card */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 rounded-md border border-gold-deep bg-white p-8 shadow-card md:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[62ch]">
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-[30px] font-semibold leading-none text-ink">
                  THE PILOT
                </h3>
                <span className="font-display text-[30px] font-semibold leading-none text-gold-deep">
                  $900
                </span>
              </div>
              <p className="mt-4 font-body text-[16px] leading-relaxed text-grey">
                Two weeks · We cast your first exclusive model and deliver 12–15
                finished visuals of one product line. Continue after, and the
                full $900 is credited to your first month — the pilot ends up
                free.
              </p>
            </div>
            <div className="flex-none">
              <CalendlyButton size="lg">Start with the Pilot</CalendlyButton>
            </div>
          </div>
        </motion.div>

        {/* Three tier cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              className={cn(
                'relative flex h-full flex-col rounded-md bg-white p-8 shadow-card',
                tier.popular
                  ? 'border border-gold-deep lg:-translate-y-2'
                  : 'border border-[var(--hairline)]',
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 rounded-btn bg-gold px-3 py-1 font-label text-[11px] font-medium uppercase tracking-[0.08em] text-ink">
                  Most Popular
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[24px] font-semibold leading-none text-ink">
                  {tier.name}
                </h3>
              </div>
              <p className="mt-4 font-display leading-none text-ink">
                <span className="text-[34px] font-semibold">{tier.price}</span>
                {tier.cadence && (
                  <span className="ml-1 font-body text-[15px] text-grey">
                    {tier.cadence}
                  </span>
                )}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="font-body text-[15px] leading-relaxed text-grey"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 font-body text-[14px] text-grey"
        >
          Quarterly prepay −8% · 3-month minimum · every visual delivered in
          1:1, 4:5, and 9:16.
        </motion.p>
      </div>
    </motion.section>
  )
}
