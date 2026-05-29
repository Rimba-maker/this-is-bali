'use client'

import Link from 'next/link'
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
  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  return (
    <div style={{ minHeight: '100svh', background: '#F5F0E8', paddingTop: 80, paddingBottom: '4rem' }}>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 68,
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.06em', color: '#fff' }}
        >
          THIS IS <span style={{ color: '#D4611A' }}>BALI</span>
        </Link>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.60)', fontSize: '0.875rem', fontWeight: 500 }}>
          ← Back to site
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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

        {/* Step card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          {step === 1 && <StepDatetime onNext={next} />}
          {step === 2 && <StepPartySize onNext={next} onBack={back} />}
          {step === 3 && <StepPreference onNext={next} onBack={back} />}
          {step === 4 && <StepOccasion onNext={next} onBack={back} />}
          {step === 5 && <StepPersonalInfo onNext={next} onBack={back} />}
          {step === 6 && <StepReview onBack={back} />}
        </div>

        {/* Trust footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: 'rgba(10,10,10,0.40)',
            fontSize: '0.8125rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span>🔒 Your data is secure</span>
          <span>✅ Free cancellation</span>
          <span>💬 Confirmation via WhatsApp</span>
        </div>
      </div>
    </div>
  )
}
