'use client'

import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const STEPS = [
  {
    number: '01',
    title: 'Casting & Style Lock',
    body: 'Week one: brand session, model casting, and a signed-off style guide that locks the look.',
  },
  {
    number: '02',
    title: 'Submit Mondays',
    body: "Drop product photos into your shared folder. That's your entire workload.",
  },
  {
    number: '03',
    title: 'Delivered Fridays',
    body: 'Finished visuals in your folder, every week, in all three ad formats.',
  },
  {
    number: '04',
    title: 'Refine',
    body: 'Two revision rounds per batch, returned within 48 hours.',
  },
]

export function Process() {
  return (
    <motion.section
      id="process"
      className="bg-white [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-content px-6">
        <motion.div variants={fadeInUp}>
          <SectionLabel hairline>The Process</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 max-w-[20ch] font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
        >
          From signing to your first delivery in two weeks.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={fadeInUp}>
              <Card className="h-full px-7 py-8">
                <span className="font-display text-[40px] font-semibold leading-none text-gold">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-[22px] leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-grey">
                  {step.body}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
