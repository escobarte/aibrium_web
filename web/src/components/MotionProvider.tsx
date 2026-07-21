'use client'

import { MotionConfig } from 'framer-motion'

// reducedMotion="user" makes ALL Framer Motion animations respect the OS
// "reduce motion" setting: transform/layout animation is disabled, so nothing
// moves or fades-up for those users. This is the JS-side counterpart to the
// prefers-reduced-motion CSS block in globals.css (which only covers CSS
// transitions/animations, not Framer's rAF-driven motion).
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
