'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { catalogues, type Catalogue } from '@/lib/catalogues'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Lightbox } from '@/components/ui/Lightbox'

export function Work() {
  const [active, setActive] = useState<Catalogue | null>(null)
  const [index, setIndex] = useState(0)

  const openCatalogue = (catalogue: Catalogue) => {
    setIndex(0)
    setActive(catalogue)
  }

  return (
    <motion.section
      id="work"
      className="bg-white [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-content px-6">
        <motion.div variants={fadeInUp}>
          <SectionLabel hairline>The Work</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-6 font-display font-semibold text-ink [font-size:clamp(30px,4vw,52px)] [line-height:1.1]"
        >
          Judge us by the images.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {catalogues.map((catalogue) => (
            <motion.button
              key={catalogue.slug}
              type="button"
              variants={fadeInUp}
              onClick={() => openCatalogue(catalogue)}
              aria-label={`Open ${catalogue.name} gallery`}
              className="block text-left"
            >
              <Card interactive className="overflow-hidden">
                <div className="overflow-hidden">
                  <Image
                    src={catalogue.cover}
                    alt={`${catalogue.name} — ${catalogue.category}`}
                    width={1000}
                    height={1250}
                    // TODO: remove unoptimized once real /public images replace placeholders.
                    unoptimized
                    className="h-auto w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-6 py-5">
                  <h3 className="font-display text-[24px] leading-tight text-ink">
                    {catalogue.name}
                  </h3>
                  <p className="mt-1 font-body text-[14px] text-grey">
                    {catalogue.category}
                  </p>
                </div>
              </Card>
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 max-w-[68ch] font-body text-[14px] text-grey"
        >
          Sample collections produced by Aibrium Studio. Client work is shown only
          with written permission.
        </motion.p>
      </div>

      <Lightbox
        catalogue={active}
        index={index}
        onClose={() => setActive(null)}
        onIndexChange={setIndex}
      />

      {/*
        ────────────────────────────────────────────────────────────────
        FUTURE PROOF SLOT (Block 4 → Block 5) — intentionally empty.
        Slot in when first clients convert:
          - client logos strip
          - named testimonials
          - a case-study block
        Do NOT fabricate logos / testimonials / results. Empty proof
        stays empty until real proof exists.
        ────────────────────────────────────────────────────────────────
      */}
    </motion.section>
  )
}
