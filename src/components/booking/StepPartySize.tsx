'use client'

import { useBookingStore } from '@/store/bookingStore'

const HINTS: Record<number, string> = {
  1: 'Perfect for a solo dining experience',
  2: "We'll seat you at one of our cozy 2-tops",
  3: 'Great for a small group',
  4: 'Ideal for a family or friends gathering',
}

export default function StepPartySize({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = useBookingStore()
  const size = data.party_size ?? 2
  const hint = size <= 4 ? HINTS[size] : size >= 10 ? null : `We'll arrange the perfect table for ${size} guests`

  return (
    <div>
      <h2 style={heading}>How many guests?</h2>
      <p style={sub}>Select the number of people in your party.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.5rem' }}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => updateData({ party_size: n })}
            style={{
              width: 52,
              height: 52,
              borderRadius: 8,
              border: size === n ? '2px solid #D4611A' : '1.5px solid #EDE8DC',
              background: size === n ? 'rgba(212,97,26,0.08)' : '#fff',
              color: size === n ? '#D4611A' : 'rgba(10,10,10,0.70)',
              fontSize: '1.0625rem',
              fontWeight: size === n ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Hint */}
      <div
        style={{
          minHeight: 52,
          padding: '0.875rem 1rem',
          borderRadius: 8,
          background: size >= 10 ? 'rgba(212,97,26,0.08)' : '#F5F0E8',
          border: '1px solid',
          borderColor: size >= 10 ? '#D4611A' : '#EDE8DC',
          marginBottom: '2.5rem',
        }}
      >
        {size >= 10 ? (
          <p style={{ color: '#D4611A', fontSize: '0.9375rem', fontWeight: 500 }}>
            💬 For groups of 10+, please also contact us via{' '}
            <a href="https://wa.me/62" style={{ fontWeight: 700 }}>WhatsApp</a>{' '}
            so we can arrange the best seating for your group.
          </p>
        ) : (
          <p style={{ color: 'rgba(10,10,10,0.65)', fontSize: '0.9375rem' }}>{hint}</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.875rem' }}>
        <button onClick={onBack} style={btnBack}>← Back</button>
        <button onClick={onNext} style={btnActive}>Continue →</button>
      </div>
    </div>
  )
}

const heading: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 600, color: '#0A0A0A', marginBottom: '0.5rem' }
const sub: React.CSSProperties = { color: 'rgba(10,10,10,0.56)', fontSize: '1rem', marginBottom: '2rem' }
const btnActive: React.CSSProperties = { background: '#D4611A', color: '#fff', border: 'none', borderRadius: 50, padding: '0.8125rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.01em' }
const btnBack: React.CSSProperties = { background: 'transparent', color: 'rgba(10,10,10,0.60)', border: '1.5px solid #EDE8DC', borderRadius: 50, padding: '0.8125rem 1.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }
