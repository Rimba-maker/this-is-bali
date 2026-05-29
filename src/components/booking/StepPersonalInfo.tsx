'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBookingStore } from '@/store/bookingStore'

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp: z.string().regex(/^\+?[0-9]{8,15}$/, 'Enter a valid phone number'),
  email:    z.string().email('Enter a valid email').optional().or(z.literal('')),
})
type FormData = z.infer<typeof schema>

export default function StepPersonalInfo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = useBookingStore()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:     data.name ?? '',
      whatsapp: data.whatsapp ?? '+62',
      email:    data.email ?? '',
    },
  })

  function onSubmit(values: FormData) {
    updateData(values)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 style={heading}>Almost there</h2>
      <p style={sub}>Your confirmation goes straight to your WhatsApp.</p>

      {/* Full Name */}
      <div style={fieldWrap}>
        <label style={labelStyle}>Full Name *</label>
        <input
          {...register('name')}
          placeholder="e.g. Budi Santoso"
          style={{ ...inputStyle, borderColor: errors.name ? '#c82014' : '#EDE8DC' }}
        />
        {errors.name && <p style={errStyle}>{errors.name.message}</p>}
      </div>

      {/* WhatsApp */}
      <div style={fieldWrap}>
        <label style={labelStyle}>WhatsApp Number *</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 8,
              border: '1.5px solid #EDE8DC',
              background: '#F5F0E8',
              fontSize: '1rem',
              color: 'rgba(10,10,10,0.65)',
              flexShrink: 0,
            }}
          >
            🇮🇩 +62
          </div>
          <input
            {...register('whatsapp')}
            placeholder="81234567890"
            type="tel"
            style={{ ...inputStyle, flex: 1, borderColor: errors.whatsapp ? '#c82014' : '#EDE8DC' }}
          />
        </div>
        {errors.whatsapp && <p style={errStyle}>{errors.whatsapp.message}</p>}
        <p style={{ fontSize: '0.8125rem', color: 'rgba(10,10,10,0.45)', marginTop: '0.375rem' }}>
          We&apos;ll use this to send your booking confirmation.
        </p>
      </div>

      {/* Email */}
      <div style={{ marginBottom: '2.5rem' }}>
        <label style={labelStyle}>Email Address <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
        <input
          {...register('email')}
          placeholder="you@email.com"
          type="email"
          style={{ ...inputStyle, borderColor: errors.email ? '#c82014' : '#EDE8DC' }}
        />
        {errors.email && <p style={errStyle}>{errors.email.message}</p>}
      </div>

      <div style={{ display: 'flex', gap: '0.875rem' }}>
        <button type="button" onClick={onBack} style={btnBack}>← Back</button>
        <button type="submit" style={btnActive}>Review Booking →</button>
      </div>
    </form>
  )
}

const heading: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 600, color: '#0A0A0A', marginBottom: '0.5rem' }
const sub: React.CSSProperties = { color: 'rgba(10,10,10,0.56)', fontSize: '1rem', marginBottom: '2rem' }
const fieldWrap: React.CSSProperties = { marginBottom: '1.5rem' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '0.625rem' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1.5px solid #EDE8DC', fontSize: '1rem', color: '#0A0A0A', background: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }
const errStyle: React.CSSProperties = { color: '#c82014', fontSize: '0.8125rem', marginTop: '0.375rem' }
const btnActive: React.CSSProperties = { background: '#D4611A', color: '#fff', border: 'none', borderRadius: 50, padding: '0.8125rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.01em' }
const btnBack: React.CSSProperties = { background: 'transparent', color: 'rgba(10,10,10,0.60)', border: '1.5px solid #EDE8DC', borderRadius: 50, padding: '0.8125rem 1.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }
