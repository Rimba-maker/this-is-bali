'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const ref = params.get('ref') ?? 'TIB-XXXXXX'

  const waMsg = encodeURIComponent(
    `Halo THIS IS BALI! Saya ingin mengonfirmasi reservasi saya.\nReferensi: ${ref}\nTerima kasih! 🌴`
  )

  return (
    <div style={{ minHeight: '100svh', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4611A 0%, #B85416 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '2.5rem',
            boxShadow: '0 8px 24px rgba(212,97,26,0.30)',
          }}
        >
          ✓
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.375rem)',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '0.75rem',
            }}
          >
            You&apos;re all set!
          </h1>
          <p style={{ color: 'rgba(10,10,10,0.60)', fontSize: '1.0625rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Your table at THIS IS BALI has been reserved. We&apos;re looking forward to welcoming you.
          </p>

          {/* Reference pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              background: '#fff',
              border: '1.5px solid #EDE8DC',
              borderRadius: 12,
              padding: '1rem 1.5rem',
              marginBottom: '2.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)', marginBottom: '0.25rem' }}>
                Booking Reference
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#D4611A', letterSpacing: '0.05em' }}>
                {ref}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href={`https://wa.me/62?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#25D366',
                color: '#fff',
                borderRadius: 50,
                padding: '0.8125rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              💬 Message Us on WhatsApp
            </a>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'rgba(10,10,10,0.55)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
              }}
            >
              ← Back to THIS IS BALI
            </Link>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.8125rem', color: 'rgba(10,10,10,0.40)' }}>
            Questions? WhatsApp us at{' '}
            <a href="https://wa.me/62" style={{ color: '#D4611A', fontWeight: 600 }}>+62 ...</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100svh', background: '#F5F0E8' }} />}>
      <ConfirmationContent />
    </Suspense>
  )
}
