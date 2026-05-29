'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/store/bookingStore'
import { formatDate, formatTime } from '@/lib/utils'

const SEATING_LABELS: Record<string, string> = {
  sky_table:     '🏔️ Sky Table',
  garden:        '🌿 Garden Area',
  indoor:        '🪑 Indoor',
  no_preference: '✨ No Preference',
}
const OCCASION_LABELS: Record<string, string> = {
  birthday:    '🎂 Birthday',
  anniversary: '💍 Anniversary',
  date_night:  '💑 Date Night',
  family:      '👨‍👩‍👧 Family Gathering',
  celebration: '🎉 Celebration',
}

export default function StepReview({ onBack }: { onBack: () => void }) {
  const { data, reset } = useBookingStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function confirm() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong')
      // Navigate first, then reset — avoids re-rendering this step with empty data
      router.push(`/booking/confirmation?id=${json.booking.id}&ref=${json.booking.reference}`)
      setTimeout(() => reset(), 300)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit booking. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={heading}>Here&apos;s your booking summary</h2>
      <p style={sub}>All good? Confirm and your table is secured.</p>

      <div style={{ ...card, marginBottom: '2rem' }}>
        {[
          ['📅 Date',         formatDate(data.date ?? '')],
          ['🕐 Time',         formatTime(data.time ?? '')],
          ['👥 Party Size',   `${data.party_size} guest${(data.party_size ?? 1) > 1 ? 's' : ''}`],
          ['🪑 Seating',      SEATING_LABELS[data.seating ?? 'no_preference']],
          ['🎉 Occasion',     (data.occasions ?? []).length > 0
            ? (data.occasions ?? []).map((o) => OCCASION_LABELS[o]).join(', ')
            : 'None'],
          ['📝 Notes',        data.notes || '—'],
          ['👤 Name',         data.name ?? ''],
          ['💬 WhatsApp',     data.whatsapp ?? ''],
          ['📧 Email',        data.email || '—'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', padding: '0.875rem 0', borderBottom: '1px solid #F5F0E8' }}>
            <span style={{ width: 140, fontSize: '0.875rem', fontWeight: 600, color: 'rgba(10,10,10,0.55)', flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: '0.9375rem', color: '#0A0A0A' }}>{value}</span>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ background: 'rgba(200,32,20,0.08)', border: '1px solid rgba(200,32,20,0.3)', borderRadius: 8, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#c82014', fontSize: '0.9375rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={btnBack} disabled={loading}>← Back</button>
        <button
          onClick={confirm}
          disabled={loading}
          style={{ ...btnActive, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
        >
          {loading ? 'Confirming...' : 'Confirm Booking ✓'}
        </button>
      </div>
    </div>
  )
}

const heading: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 600, color: '#0A0A0A', marginBottom: '0.5rem' }
const sub: React.CSSProperties = { color: 'rgba(10,10,10,0.56)', fontSize: '1rem', marginBottom: '2rem' }
const card: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: '0 1rem', boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.10)' }
const btnActive: React.CSSProperties = { background: '#D4611A', color: '#fff', border: 'none', borderRadius: 50, padding: '0.8125rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.01em' }
const btnBack: React.CSSProperties = { background: 'transparent', color: 'rgba(10,10,10,0.60)', border: '1.5px solid #EDE8DC', borderRadius: 50, padding: '0.8125rem 1.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }
