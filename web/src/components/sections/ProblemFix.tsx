'use client'

import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const FACTS = [
  'Weekly delivery, every Friday',
  'Models exclusive to your brand',
  'Every visual in 3 ad-ready formats',
]

export function ProblemFix() {
  return (
    <motion.section
      className="bg-cream [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-content px-6">
        <motion.div variants={fadeInUp}>
          <SectionLabel hairline>Why We Exist</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 max-w-[18ch] font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
        >
          Great visuals shouldn&apos;t require a production.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-[68ch] font-body text-[18px] leading-relaxed text-grey"
        >
          Booking models, hiring photographers, renting studios, waiting weeks
          for edits — for 10 usable images. Meanwhile your ads and feed need
          fresh creative every single week. That gap is exactly what Aibrium
          closes.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((fact) => (
            <motion.div key={fact} variants={fadeInUp}>
              <Card className="h-full px-7 py-8">
                <p className="font-display text-[24px] leading-snug text-ink">
                  {fact}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
