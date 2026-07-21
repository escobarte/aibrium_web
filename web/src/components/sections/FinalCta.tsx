'use client'

import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CalendlyInline } from '@/components/ui/CalendlyInline'

export function FinalCta() {
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
          <SectionLabel hairline>Next Step</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
        >
          Fifteen minutes. Bring a product.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-[68ch] font-body text-[18px] leading-relaxed text-grey"
        >
          Book a call and we&apos;ll show you exactly what your products look
          like on your own model — or email us a product link and we&apos;ll
          send you free samples first. Either way, you judge real work, not
          promises.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-10">
          <CalendlyInline />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 font-body text-[16px] text-grey"
        >
          Prefer email?{' '}
          <a
            href="mailto:hello@aibrium.com"
            className="font-medium text-ink underline decoration-gold underline-offset-4 transition-colors hover:text-gold"
          >
            hello@aibrium.com
          </a>{' '}
          — we reply within 24 hours, Monday to Friday.
        </motion.p>
      </div>
    </motion.section>
  )
}
