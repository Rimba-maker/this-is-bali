'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Booking, BookingStatus } from '@/types'
import StatusBadge from './StatusBadge'
import { formatDate, formatDateShort, formatTime } from '@/lib/utils'

const STATUSES: BookingStatus[] = ['pending', 'confirmed', 'seated', 'completed', 'cancelled']

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings]     = useState<Booking[]>([])
  const [loading, setLoading]       = useState(true)
  const [date, setDate]             = useState('')
  const [statusFilter, setFilter]   = useState<string>('all')
  const [selected, setSelected]     = useState<Booking | null>(null)
  const [tab, setTab]               = useState<'overview' | 'bookings'>('bookings')

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '200' })
    if (date) params.set('date', date)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    const res = await fetch(`/api/bookings?${params}`)
    if (res.status === 401) { router.replace('/admin/login'); return }
    const json = await res.json()
    setBookings(json.bookings ?? [])
    setLoading(false)
  }, [date, statusFilter, router])

  useEffect(() => { load() }, [load])

  // Auto-refresh every 60s
  useEffect(() => {
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [load])

  async function updateStatus(id: string, status: BookingStatus) {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s)
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.replace('/admin/login')
  }

  // Stats
  const today = new Date().toISOString().split('T')[0]
  const todayAll   = bookings.filter((b) => b.date === today)
  const pending    = bookings.filter((b) => b.status === 'pending').length
  const covers     = todayAll.reduce((s, b) => s + b.party_size, 0)
  const peakHour   = (() => {
    const counts: Record<string, number> = {}
    todayAll.forEach((b) => { counts[b.time] = (counts[b.time] ?? 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
  })()

  function exportCSV() {
    const headers = ['Reference','Date','Time','Name','WhatsApp','Email','Party','Seating','Occasions','Notes','Status','Created']
    const rows = bookings.map((b) => [
      b.reference, b.date, b.time, b.name, b.whatsapp, b.email,
      b.party_size, b.seating, b.occasions.join(';'), b.notes,
      b.status, b.created_at,
    ])
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = `tib-bookings-${date}.csv`
    a.click()
  }

  return (
    <div style={{ minHeight: '100svh', background: '#F5F0E8' }}>
      {/* Top nav */}
      <header
        style={{
          background: '#0A0A0A',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '0.06em', color: '#fff' }}>
          THIS IS <span style={{ color: '#D4611A' }}>BALI</span>{' '}
          <span style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          <button
            onClick={load}
            style={{ background: 'rgba(255,255,255,0.10)', border: 'none', borderRadius: 8, color: 'rgba(255,255,255,0.70)', padding: '0.375rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer' }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={logout}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.20)', borderRadius: 8, color: 'rgba(255,255,255,0.60)', padding: '0.375rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer' }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: '#EDE8DC', borderRadius: 8, padding: 4, width: 'fit-content' }}>
          {(['overview', 'bookings'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '0.375rem 1rem',
                borderRadius: 6,
                border: 'none',
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#0A0A0A' : 'rgba(10,10,10,0.55)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: "Today's Bookings", value: todayAll.length, icon: '📅' },
              { label: 'Pending',          value: pending,          icon: '⏳' },
              { label: 'Covers Today',     value: covers,           icon: '👥' },
              { label: 'Peak Hour',        value: peakHour,         icon: '📈' },
            ].map((s) => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '0.25rem' }}>{s.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(10,10,10,0.55)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings tab */}
        {tab === 'bookings' && (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="All dates"
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1.5px solid #EDE8DC', fontSize: '0.9375rem', background: '#fff', color: date ? '#0A0A0A' : 'rgba(10,10,10,0.40)', outline: 'none' }}
              />
              {date && (
                <button
                  onClick={() => setDate('')}
                  style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1.5px solid #EDE8DC', background: '#fff', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', color: 'rgba(10,10,10,0.60)' }}
                >
                  ✕ Clear date
                </button>
              )}
              <button
                onClick={() => setDate(new Date().toISOString().split('T')[0])}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1.5px solid #EDE8DC', background: date === new Date().toISOString().split('T')[0] ? '#F5F0E8' : '#fff', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer' }}
              >
                Today
              </button>
              <select
                value={statusFilter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1.5px solid #EDE8DC', fontSize: '0.9375rem', background: '#fff', color: '#0A0A0A', outline: 'none' }}
              >
                <option value="all">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={exportCSV}
                  style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1.5px solid #EDE8DC', background: '#fff', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}
                >
                  ↓ Export CSV
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(10,10,10,0.45)' }}>Loading...</div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(10,10,10,0.45)' }}>No bookings found for this filter.</div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #F5F0E8', background: '#FAFAFA' }}>
                        {['Reference','Date & Time','Name','Party','Seating','Status','Actions'].map((h) => (
                          <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.50)', whiteSpace: 'nowrap' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr
                          key={b.id}
                          style={{ borderBottom: '1px solid #F5F0E8', transition: 'background 0.15s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#FAFAFA')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                        >
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#D4611A', whiteSpace: 'nowrap' }}>{b.reference}</td>
                          <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 500 }}>{formatDateShort(b.date)}</div>
                            <div style={{ color: 'rgba(10,10,10,0.50)', fontSize: '0.8125rem' }}>{formatTime(b.time)}</div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ fontWeight: 500 }}>{b.name}</div>
                            <div style={{ color: 'rgba(10,10,10,0.45)', fontSize: '0.8125rem' }}>{b.whatsapp}</div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{b.party_size}</td>
                          <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>{b.seating.replace('_', ' ')}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <select
                              value={b.status}
                              onChange={(e) => updateStatus(b.id, e.target.value as BookingStatus)}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem', outline: 'none' }}
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <a
                                href={`https://wa.me/${b.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                style={{ padding: '0.25rem 0.5rem', borderRadius: 6, background: '#D1FAE5', color: '#065F46', fontSize: '0.8125rem', fontWeight: 600 }}
                              >
                                WA
                              </a>
                              <button
                                onClick={() => setSelected(b)}
                                style={{ padding: '0.25rem 0.5rem', borderRadius: 6, background: '#F5F0E8', color: '#0A0A0A', fontSize: '0.8125rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
        >
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 520, maxHeight: '90svh', overflowY: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)' }}>Booking Detail</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#D4611A', letterSpacing: '0.05em' }}>{selected.reference}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#F5F0E8', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <StatusBadge status={selected.status} />
            </div>

            {[
              ['Date',     formatDate(selected.date)],
              ['Time',     formatTime(selected.time)],
              ['Name',     selected.name],
              ['WhatsApp', selected.whatsapp],
              ['Email',    selected.email || '—'],
              ['Party',    `${selected.party_size} guests`],
              ['Seating',  selected.seating.replace('_', ' ')],
              ['Occasion', selected.occasions.join(', ') || 'None'],
              ['Notes',    selected.notes || '—'],
              ['Created',  new Date(selected.created_at).toLocaleString('en-ID')],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', padding: '0.75rem 0', borderBottom: '1px solid #F5F0E8' }}>
                <span style={{ width: 110, fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(10,10,10,0.50)', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</span>
                <span style={{ fontSize: '0.9375rem', color: '#0A0A0A' }}>{v}</span>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value as BookingStatus)}
                style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: 8, border: '1.5px solid #EDE8DC', fontSize: '0.9375rem', background: '#fff', color: '#0A0A0A', outline: 'none' }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  const msg = `Halo ${selected.name}!\nKonfirmasi reservasi Anda di THIS IS BALI:\n📅 ${formatDate(selected.date)}, ${formatTime(selected.time)}\n👥 ${selected.party_size} orang\n🪑 ${selected.seating.replace('_', ' ')}\nReferensi: ${selected.reference}\nKami menantikan kedatangan Anda! 🌴`
                  navigator.clipboard.writeText(msg)
                }}
                style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: '#F5F0E8', border: 'none', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}
              >
                📋 Copy WA Message
              </button>
              <a
                href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: '#D1FAE5', color: '#065F46', fontSize: '0.875rem', fontWeight: 600 }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
