'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInUp, stagger } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

const ITEMS = [
  {
    q: 'Are these real photographs?',
    a: "They're AI-powered productions run by human art direction and quality control — that's how we deliver weekly at this price. To your customers, they read as campaign photography. Judge for yourself in the work above, or ask us for a free sample with your own product.",
  },
  {
    q: 'Will my model ever appear for another brand?',
    a: 'Never. Every model is cast for one client and contractually exclusive. When an engagement ends, the model is retired — not recycled.',
  },
  {
    q: "What if I don't love the candidates?",
    a: "We re-run the casting. You approve your model before any production starts — we'd rather cast twice than lock a face you're not in love with.",
  },
  {
    q: 'How accurate are the products?',
    a: 'Product accuracy is a quality-control step on every image — logos, colors, materials, and for apparel, the true cut and fit. You approve every visual before it goes anywhere.',
  },
  {
    q: 'Can we keep our photographer?',
    a: "Please do. Shoots are great for hero campaigns; we're the weekly volume in between that no shoot schedule can sustain.",
  },
  {
    q: 'What do we need to provide?',
    a: "Clear product photos each Monday, brand references at onboarding, and your feedback. That's the entire workload on your side.",
  },
  {
    q: 'Do you produce video?',
    a: "Not yet — current technology doesn't meet our quality bar, and we don't ship anything below it. The moment it does, our clients will be first to know.",
  },
]

export function Faq() {
  // All closed by default; one open at a time.
  const [open, setOpen] = useState<number | null>(null)

  return (
    <motion.section
      id="faq"
      className="bg-white [padding-block:clamp(72px,12vw,128px)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-content px-6">
        <motion.div variants={fadeInUp}>
          <SectionLabel hairline>FAQ</SectionLabel>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-10 max-w-[820px]">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="border-b border-[var(--hairline)]"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[22px] leading-tight text-ink">
                      {item.q}
                    </span>
                    <Plus
                      strokeWidth={1.5}
                      className={cn(
                        'h-5 w-5 flex-none text-gold-deep transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[68ch] pb-6 font-body text-[16px] leading-relaxed text-grey">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
