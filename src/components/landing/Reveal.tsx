'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span'
}

/**
 * Scroll-reveal wrapper — fades + slides up once when it enters the viewport.
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </MotionTag>
  )
}
