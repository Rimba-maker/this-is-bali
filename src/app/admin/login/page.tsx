'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS   = 15 * 60 * 1000

export default function AdminLogin() {
  const router = useRouter()
  const [pin, setPin]           = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [shake, setShake]       = useState(false)
  const [locked, setLocked]     = useState(false)
  const [lockLeft, setLockLeft] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    checkLock()
  }, [])

  function checkLock() {
    if (typeof window === 'undefined') return
    const until = parseInt(localStorage.getItem('admin_lock_until') ?? '0', 10)
    if (Date.now() < until) {
      setLocked(true)
      setLockLeft(Math.ceil((until - Date.now()) / 60000))
      const t = setInterval(() => {
        const rem = until - Date.now()
        if (rem <= 0) { setLocked(false); clearInterval(t) }
        else setLockLeft(Math.ceil(rem / 60000))
      }, 10000)
    }
  }

  function recordAttempt() {
    const key  = 'admin_attempts'
    const prev = parseInt(localStorage.getItem(key) ?? '0', 10)
    const next = prev + 1
    localStorage.setItem(key, String(next))
    if (next >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCKOUT_MS
      localStorage.setItem('admin_lock_until', String(until))
      localStorage.removeItem(key)
      setLocked(true)
      setLockLeft(15)
    }
  }

  async function submit() {
    if (locked || loading || pin.length < 4) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (res.ok) {
        localStorage.removeItem('admin_attempts')
        router.replace('/admin')
      } else {
        recordAttempt()
        setShake(true)
        setError('Incorrect PIN. Please try again.')
        setPin('')
        setTimeout(() => setShake(false), 600)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        background: '#F5F0E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 380,
          boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center',
          animation: shake ? 'shake 0.5s ease' : 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.06em', color: '#0A0A0A', marginBottom: '0.5rem' }}>
          THIS IS <span style={{ color: '#D4611A' }}>BALI</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'rgba(10,10,10,0.50)', marginBottom: '2rem' }}>Admin Dashboard</p>

        {locked ? (
          <div style={{ padding: '1rem', background: 'rgba(200,32,20,0.08)', borderRadius: 8, color: '#c82014', fontSize: '0.9375rem' }}>
            Too many attempts. Try again in {lockLeft} minute{lockLeft !== 1 ? 's' : ''}.
          </div>
        ) : (
          <>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '0.75rem' }}>
              Enter PIN
            </label>
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: 8,
                border: error ? '1.5px solid #c82014' : '1.5px solid #EDE8DC',
                fontSize: '1.5rem',
                letterSpacing: '0.3em',
                textAlign: 'center',
                color: '#0A0A0A',
                outline: 'none',
                marginBottom: '0.75rem',
                background: '#fff',
              }}
              placeholder="••••••"
            />
            {error && (
              <p style={{ color: '#c82014', fontSize: '0.8125rem', marginBottom: '1rem' }}>{error}</p>
            )}
            <button
              onClick={submit}
              disabled={loading || pin.length < 4}
              style={{
                width: '100%',
                background: pin.length >= 4 ? '#D4611A' : '#EDE8DC',
                color: pin.length >= 4 ? '#fff' : 'rgba(10,10,10,0.35)',
                border: 'none',
                borderRadius: 50,
                padding: '0.8125rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: pin.length >= 4 ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s ease',
              }}
            >
              {loading ? 'Checking...' : 'Enter'}
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
