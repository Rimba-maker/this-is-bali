'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBookingStore } from '@/store/bookingStore'
import ProgressBar from './ProgressBar'
import StepDatetime from './StepDatetime'
import StepPartySize from './StepPartySize'
import StepPreference from './StepPreference'
import StepOccasion from './StepOccasion'
import StepPersonalInfo from './StepPersonalInfo'
import StepReview from './StepReview'

export default function BookingShell() {
  const { step, setStep } = useBookingStore()
  const prevStep = useRef(step)
  const dir = step >= prevStep.current ? 1 : -1

  const next = () => { prevStep.current = step; setStep(step + 1) }
  const back = () => { prevStep.current = step; setStep(step - 1) }

  return (
    <div style={{ minHeight: '100svh', background: '#F5F0E8', paddingTop: 80, paddingBottom: '4rem' }}>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 68,
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}
      >
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.06em', color: '#fff' }}
        >
          THIS IS <span style={{ color: '#D4611A' }}>BALI</span>
        </Link>
        <Link
          href="/"
          style={{ color: 'rgba(255,255,255,0.60)', fontSize: '0.875rem', fontWeight: 500, minHeight: 44, display: 'flex', alignItems: 'center', transition: 'color 0.2s ease' }}
        >
          ← Back to site
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.5rem',
            }}
          >
            Reserve Your Table
          </h1>
          <p style={{ color: 'rgba(10,10,10,0.56)', fontSize: '1rem' }}>
            Takes less than 2 minutes — and your table awaits.
          </p>
        </div>

        <ProgressBar current={step} />

        {/* Step card with slide transition */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 0 0.5px rgba(0,0,0,0.10), 0 4px 20px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ x: dir * 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
              exit={{ x: dir * -28, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } }}
            >
              {step === 1 && <StepDatetime onNext={next} />}
              {step === 2 && <StepPartySize onNext={next} onBack={back} />}
              {step === 3 && <StepPreference onNext={next} onBack={back} />}
              {step === 4 && <StepOccasion onNext={next} onBack={back} />}
              {step === 5 && <StepPersonalInfo onNext={next} onBack={back} />}
              {step === 6 && <StepReview onBack={back} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust badges — SVG icons */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '1.75rem',
            color: 'rgba(10,10,10,0.40)',
            fontSize: '0.8125rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your data is secure
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Free cancellation
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Confirmation via WhatsApp
          </span>
        </div>
      </div>
    </div>
  )
}
