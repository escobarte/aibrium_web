'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

// Casting-board candidate thumbnails (placeholders — on-brand palette).
// TODO: swap for real candidate visuals when assets arrive.
const CANDIDATES = Array.from(
  { length: 4 },
  (_, i) =>
    `https://placehold.co/600x800/1A1A1A/F7F3EC.png?text=Candidate+${i + 1}`,
)

const STEPS = [
  {
    title: 'We cast',
    body: 'Candidates styled to your brief',
  },
  {
    title: 'You choose',
    body: 'Your model, your call',
  },
  {
    title: 'We lock',
    body: 'Same face, every image, exclusively yours',
  },
]

export function ExclusiveModels() {
  return (
    <motion.section
      className="bg-cream [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Casting board visual */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 gap-4 rounded-md border border-[var(--hairline)] bg-white p-4 shadow-card"
        >
          {CANDIDATES.map((src, i) => (
            <div key={src} className="overflow-hidden rounded">
              <Image
                src={src}
                alt={`Casting candidate ${i + 1}`}
                width={600}
                height={800}
                // TODO: remove unoptimized once real /public images replace placeholders.
                unoptimized
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Text */}
        <div>
          <motion.div variants={fadeInUp}>
            <SectionLabel hairline>Your Models</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
          >
            Cast once. Yours forever.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-[60ch] font-body text-[18px] leading-relaxed text-grey"
          >
            Every brand we work with gets its own models — cast for your
            aesthetic, chosen by you, and locked to your brand. We present 3–5
            candidates; you pick. From that moment, your model appears only in
            your visuals — never in anyone else&apos;s. Your audience gets to
            know your faces the way they&apos;d know brand ambassadors.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <motion.div key={step.title} variants={fadeInUp}>
                <h3 className="font-display text-[22px] leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-grey">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
