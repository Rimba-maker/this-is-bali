'use client'

import { useBookingStore } from '@/store/bookingStore'
import type { OccasionType } from '@/types'

const OCCASIONS: { value: OccasionType; emoji: string; label: string }[] = [
  { value: 'birthday',    emoji: '🎂', label: 'Birthday' },
  { value: 'anniversary', emoji: '💍', label: 'Anniversary' },
  { value: 'date_night',  emoji: '💑', label: 'Date Night' },
  { value: 'family',      emoji: '👨‍👩‍👧', label: 'Family Gathering' },
  { value: 'celebration', emoji: '🎉', label: 'Celebration' },
]

export default function StepOccasion({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = useBookingStore()
  const selected = data.occasions ?? []

  function toggle(val: OccasionType) {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val]
    updateData({ occasions: next })
  }

  return (
    <div>
      <h2 style={heading}>Any special occasion? <span style={{ fontWeight: 400, fontSize: '1.25rem' }}>(optional)</span></h2>
      <p style={sub}>Let us know so we can make your visit extra memorable.</p>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2rem' }}>
        {OCCASIONS.map((occ) => {
          const active = selected.includes(occ.value)
          return (
            <button
              key={occ.value}
              onClick={() => toggle(occ.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.5rem 1rem',
                borderRadius: 50,
                border: active ? '2px solid #D4611A' : '1.5px solid #EDE8DC',
                background: active ? 'rgba(212,97,26,0.08)' : '#fff',
                color: active ? '#D4611A' : 'rgba(10,10,10,0.70)',
                fontSize: '0.9375rem',
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{occ.emoji}</span>
              <span>{occ.label}</span>
            </button>
          )
        })}
      </div>

      {/* Notes */}
      <div style={{ marginBottom: '2.5rem' }}>
        <label style={labelStyle}>Special requests or notes (optional)</label>
        <textarea
          maxLength={300}
          rows={4}
          placeholder="E.g. window seat preferred, dietary restrictions, celebration setup..."
          value={data.notes ?? ''}
          onChange={(e) => updateData({ notes: e.target.value })}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            borderRadius: 8,
            border: '1.5px solid #EDE8DC',
            fontSize: '0.9375rem',
            color: '#0A0A0A',
            background: '#fff',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
          }}
        />
        <div style={{ textAlign: 'right', fontSize: '0.8125rem', color: 'rgba(10,10,10,0.40)', marginTop: '0.375rem' }}>
          {(data.notes ?? '').length}/300
        </div>
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
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '0.75rem' }
const btnActive: React.CSSProperties = { background: '#D4611A', color: '#fff', border: 'none', borderRadius: 50, padding: '0.8125rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.01em' }
const btnBack: React.CSSProperties = { background: 'transparent', color: 'rgba(10,10,10,0.60)', border: '1.5px solid #EDE8DC', borderRadius: 50, padding: '0.8125rem 1.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }
