'use client'

import { useBookingStore } from '@/store/bookingStore'

const LUNCH  = ['11:00','11:30','12:00','12:30','13:00','13:30','14:00']
const DINNER = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00']

function today() {
  return new Date().toISOString().split('T')[0]
}

export default function StepDatetime({ onNext }: { onNext: () => void }) {
  const { data, updateData } = useBookingStore()
  const canNext = !!data.date && !!data.time

  return (
    <div>
      <h2 style={heading}>When would you like to visit?</h2>
      <p style={sub}>Choose from lunch or dinner — we&apos;ll hold your spot.</p>

      {/* Date picker */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Select Date</label>
        <input
          type="date"
          min={today()}
          value={data.date ?? ''}
          onChange={(e) => updateData({ date: e.target.value, time: undefined })}
          style={inputStyle}
        />
      </div>

      {/* Time slots */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>Lunch (11 AM – 2 PM)</label>
        <div style={slotGrid}>
          {LUNCH.map((t) => (
            <SlotBtn key={t} time={t} selected={data.time === t} onSelect={() => updateData({ time: t })} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <label style={labelStyle}>Dinner (5 PM – 9 PM)</label>
        <div style={slotGrid}>
          {DINNER.map((t) => (
            <SlotBtn key={t} time={t} selected={data.time === t} onSelect={() => updateData({ time: t })} />
          ))}
        </div>
      </div>

      <button onClick={onNext} disabled={!canNext} style={canNext ? btnActive : btnDisabled}>
        Continue →
      </button>
    </div>
  )
}

function SlotBtn({ time, selected, onSelect }: { time: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: 8,
        border: selected ? '2px solid #D4611A' : '1.5px solid #EDE8DC',
        background: selected ? 'rgba(212,97,26,0.08)' : '#fff',
        color: selected ? '#D4611A' : 'rgba(10,10,10,0.70)',
        fontSize: '0.875rem',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {time}
    </button>
  )
}

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
  fontWeight: 600,
  color: '#0A0A0A',
  marginBottom: '0.5rem',
}
const sub: React.CSSProperties = {
  color: 'rgba(10,10,10,0.56)',
  fontSize: '1rem',
  marginBottom: '2rem',
}
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#0A0A0A',
  marginBottom: '0.75rem',
}
const inputStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 280,
  padding: '0.75rem 1rem',
  borderRadius: 8,
  border: '1.5px solid #EDE8DC',
  fontSize: '1rem',
  color: '#0A0A0A',
  background: '#fff',
  outline: 'none',
}
const slotGrid: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
}
const btnActive: React.CSSProperties = {
  background: '#D4611A',
  color: '#fff',
  border: 'none',
  borderRadius: 50,
  padding: '0.8125rem 2rem',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '-0.01em',
  transition: 'background 0.2s ease, transform 0.2s ease',
}
const btnDisabled: React.CSSProperties = {
  ...btnActive,
  background: '#EDE8DC',
  color: 'rgba(10,10,10,0.35)',
  cursor: 'not-allowed',
}
