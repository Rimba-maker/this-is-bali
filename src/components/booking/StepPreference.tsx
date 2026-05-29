'use client'

import { useBookingStore } from '@/store/bookingStore'
import type { SeatingPreference } from '@/types'

const OPTIONS: { value: SeatingPreference; emoji: string; title: string; desc: string }[] = [
  { value: 'sky_table',      emoji: '🏔️', title: 'Sky Table',    desc: 'Our most-requested spot. Book early — spaces fill fast.' },
  { value: 'garden',         emoji: '🌿', title: 'Garden Area',  desc: 'Tropical, open-air seating surrounded by lush greenery.' },
  { value: 'indoor',         emoji: '🪑', title: 'Indoor',       desc: 'Cozy, air-conditioned dining room — perfect for families.' },
  { value: 'no_preference',  emoji: '✨', title: 'No Preference', desc: 'Let us choose the best available spot for your group.' },
]

export default function StepPreference({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = useBookingStore()
  const selected = data.seating ?? 'no_preference'

  return (
    <div>
      <h2 style={heading}>Where would you like to sit?</h2>
      <p style={sub}>Pick where you&apos;d like to sit — we&apos;ll do our best to make it happen.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem', marginBottom: '2.5rem' }}>
        {OPTIONS.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => updateData({ seating: opt.value })}
              style={{
                padding: '1.25rem',
                borderRadius: 12,
                border: active ? '2px solid #D4611A' : '1.5px solid #EDE8DC',
                background: active ? 'rgba(212,97,26,0.06)' : '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: active ? '0 0 0 3px rgba(212,97,26,0.12)' : 'none',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.625rem' }}>{opt.emoji}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: active ? '#D4611A' : '#0A0A0A', marginBottom: '0.375rem' }}>
                {opt.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(10,10,10,0.56)', lineHeight: 1.5 }}>{opt.desc}</div>
            </button>
          )
        })}
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
