'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBookingStore } from '@/store/bookingStore'
import { formatDateShort, formatTime } from '@/lib/utils'
import ProgressBar from './ProgressBar'
import StepDatetime from './StepDatetime'
import StepPartySize from './StepPartySize'
import StepPreference from './StepPreference'
import StepOccasion from './StepOccasion'
import StepPersonalInfo from './StepPersonalInfo'
import StepReview from './StepReview'

const SEATING_LABELS: Record<string, string> = {
  sky_table: 'Sky Table',
  garden: 'Garden Area',
  indoor: 'Indoor',
  no_preference: 'No Preference',
}

const PERKS = [
  'Instant confirmation via WhatsApp',
  'Free cancellation, any time',
  'Complimentary cake for celebrations',
]

export default function BookingShell() {
  const { step, setStep, data } = useBookingStore()
  const prevStep = useRef(step)
  const dir = step >= prevStep.current ? 1 : -1

  const next = () => { prevStep.current = step; setStep(step + 1) }
  const back = () => { prevStep.current = step; setStep(step - 1) }

  // Build live summary chips from filled data
  const summary: { icon: React.ReactNode; label: string }[] = []
  if (data.date) summary.push({ icon: <IconCal />, label: formatDateShort(data.date) })
  if (data.time) summary.push({ icon: <IconClock />, label: formatTime(data.time) })
  if (data.party_size) summary.push({ icon: <IconUsers />, label: `${data.party_size} ${data.party_size === 1 ? 'guest' : 'guests'}` })
  if (data.seating && data.seating !== 'no_preference') summary.push({ icon: <IconChair />, label: SEATING_LABELS[data.seating] })

  return (
    <div className="bk-shell">
      {/* ── Left visual panel ── */}
      <aside className="bk-visual">
        <div className="bk-visual__overlay" />
        <div className="bk-visual__inner">
          <Link href="/" className="bk-logo">THIS IS <span>BALI</span></Link>

          <div className="bk-visual__mid">
            <h1 className="bk-visual__title">Reserve your table at Ubud&apos;s finest</h1>
            <p className="bk-visual__sub">A few quick steps and your seat is secured. The rest of the evening is ours to make unforgettable.</p>

            <ul className="bk-perks">
              {PERKS.map(p => (
                <li key={p}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {p}
                </li>
              ))}
            </ul>

            {/* Live reservation summary */}
            <AnimatePresence>
              {summary.length > 0 && (
                <motion.div
                  className="bk-summary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bk-summary__label">Your reservation</span>
                  <div className="bk-summary__chips">
                    <AnimatePresence mode="popLayout">
                      {summary.map(s => (
                        <motion.span
                          key={s.label}
                          className="bk-chip"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.22 }}
                        >
                          {s.icon}
                          {s.label}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bk-visual__proof">
            <span className="bk-stars">★★★★★</span>
            <span>4.9 · 15,000+ Google Reviews</span>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <main className="bk-form">
        <div className="bk-form__top">
          <Link href="/" className="bk-back">← Back to site</Link>
        </div>

        <div className="bk-form__inner">
          <ProgressBar current={step} />

          <div className="bk-card">
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
        </div>
      </main>

      <style>{`
        .bk-shell {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          background: #F5F0E8;
        }
        @media (min-width: 1024px) {
          .bk-shell { flex-direction: row; }
        }

        /* ── Visual panel ── */
        .bk-visual {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(160deg, #201408 0%, #0a0a0a 60%, #14250f 100%),
            url('https://images.unsplash.com/photo-1775476784484-cd4f5a5101b5?w=900&h=1200&fit=crop&auto=format&q=80');
          background-size: cover;
          background-position: center;
          color: #fff;
          padding: 1.5rem;
        }
        @media (min-width: 1024px) {
          .bk-visual {
            position: sticky;
            top: 0;
            height: 100svh;
            width: 42%;
            max-width: 520px;
            padding: 2.5rem;
          }
        }
        .bk-visual__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(155deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.78) 100%);
        }
        .bk-visual__inner {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .bk-logo {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #fff;
          flex-shrink: 0;
        }
        .bk-logo span { color: #D4611A; }

        .bk-visual__mid {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem 0;
        }
        @media (min-width: 1024px) {
          .bk-visual__mid { padding: 2rem 0; }
        }
        .bk-visual__title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 0.875rem;
        }
        .bk-visual__sub {
          color: rgba(255,255,255,0.70);
          font-size: 0.9375rem;
          line-height: 1.65;
          margin: 0 0 1.5rem;
          max-width: 380px;
        }
        /* Hide the long sub copy on small mobile to keep header compact */
        @media (max-width: 1023px) {
          .bk-visual__sub { display: none; }
        }

        .bk-perks {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .bk-perks li {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.85);
        }
        @media (max-width: 1023px) {
          .bk-perks { display: none; }
        }

        /* Live summary */
        .bk-summary {
          border-top: 1px solid rgba(255,255,255,0.14);
          padding-top: 1.25rem;
        }
        .bk-summary__label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 0.75rem;
        }
        .bk-summary__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .bk-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #fff;
        }
        .bk-chip svg { color: #D4611A; }

        .bk-visual__proof {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.70);
          flex-shrink: 0;
        }
        .bk-stars { color: #f0c040; letter-spacing: 0.04em; }
        @media (max-width: 1023px) {
          .bk-visual { padding-bottom: 1.25rem; }
          .bk-visual__mid { padding: 1.25rem 0 0.75rem; }
        }

        /* ── Form panel ── */
        .bk-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F5F0E8;
        }
        .bk-form__top {
          display: flex;
          justify-content: flex-end;
          padding: 1.25rem 1.5rem 0;
        }
        @media (min-width: 1024px) {
          .bk-form__top { padding: 1.75rem 2.5rem 0; }
        }
        .bk-back {
          color: rgba(10,10,10,0.50);
          font-size: 0.875rem;
          font-weight: 500;
          min-height: 44px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .bk-back:hover { color: #0A0A0A; }

        .bk-form__inner {
          flex: 1;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem 1.25rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .bk-form__inner { padding: 2rem 2rem 3rem; }
        }

        .bk-card {
          background: #fff;
          border-radius: 16px;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          box-shadow: 0 0 0.5px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.07);
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

/* ── Inline icons for summary chips ── */
function IconCal() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
}
function IconClock() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function IconUsers() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function IconChair() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 19v2M18 19v2M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6M4 11h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"/></svg>
}
