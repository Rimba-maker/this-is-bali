'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const REVIEWS = [
  {
    flag: '🇦🇺',
    name: 'Sarah M.',
    from: 'Australia · Google Review',
    text: '"Hands down the best meal of our entire Bali trip. The Nasi Campur was extraordinary — fresh, layered, and unlike anything I\'ve had before. The floating tables made the whole experience magical."',
  },
  {
    flag: '🇬🇧',
    name: 'James & Claire T.',
    from: 'United Kingdom · Google Review',
    text: '"We celebrated our anniversary here and the staff made us feel like royalty. The food quality is exceptional — you can taste the care in every dish. No MSG, genuinely fresh. Absolutely back next trip."',
  },
  {
    flag: '🇺🇸',
    name: 'Amanda K.',
    from: 'United States · Google Review',
    text: '"The stamp menu concept is so fun and interactive. The ambience felt like stepping into a real Balinese home — open, warm, surrounded by nature. Service was prompt and genuinely warm."',
  },
  {
    flag: '🇩🇪',
    name: 'Markus L.',
    from: 'Germany · Google Review',
    text: '"I\'m not usually one to write reviews but THIS IS BALI genuinely deserves every one of its 15,000 stars. We visited twice in 5 days. The Bebek Betutu is reason enough to fly back to Ubud."',
  },
  {
    flag: '🇯🇵',
    name: 'Yuki H.',
    from: 'Japan · Google Review',
    text: '"A true gem in Ubud. The Japandi interior is stunning, the food is authentic and soul-warming, and the view from the floating tables is unforgettable. One of the best restaurants in Southeast Asia."',
  },
]

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getVisible = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 768) return 2
    return 1
  }

  const goTo = useCallback((idx: number) => {
    const vis = getVisible()
    const max = Math.max(0, REVIEWS.length - vis)
    const next = Math.max(0, Math.min(idx, max))
    setCurrent(next)
    if (trackRef.current) {
      const w = trackRef.current.parentElement!.offsetWidth / vis
      trackRef.current.style.transform = `translateX(${-next * w}px)`
    }
  }, [])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const vis = getVisible()
        const max = Math.max(0, REVIEWS.length - vis)
        const next = c >= max ? 0 : c + 1
        if (trackRef.current) {
          const w = trackRef.current.parentElement!.offsetWidth / vis
          trackRef.current.style.transform = `translateX(${-next * w}px)`
        }
        return next
      })
    }, 5000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    startTimer()
    const onResize = () => goTo(0)
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      stopTimer()
      window.removeEventListener('resize', onResize)
    }
  }, [goTo, startTimer, stopTimer])

  return (
    <section id="reviews" style={{ background: '#2D4A2D', padding: '6rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '0.75rem',
            }}
          >
            What Guests Say
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)',
              fontWeight: 600,
              color: '#fff',
            }}
          >
            15,000 reasons to visit
          </h2>
        </div>

        {/* Track */}
        <div
          style={{ overflow: 'hidden' }}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '1.125rem',
              transition: 'transform 0.48s ease',
            }}
          >
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="r-card"
                style={{
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 12,
                  padding: '1.75rem',
                }}
              >
                <div style={{ color: '#f0c040', fontSize: '0.9375rem', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.83)',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: '0.9375rem',
                    lineHeight: 1.72,
                    marginBottom: '1.25rem',
                  }}
                >
                  {r.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.0625rem',
                      flexShrink: 0,
                    }}
                  >
                    {r.flag}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: 600 }}>{r.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8125rem' }}>{r.from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopTimer(); goTo(i); startTimer() }}
              aria-label={`Review ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === current ? '#D4611A' : 'rgba(255,255,255,0.22)',
                transform: i === current ? 'scale(1.35)' : 'scale(1)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .r-card {
          width: calc(100% - 0px);
        }
        @media (min-width: 768px) {
          .r-card { width: calc(50% - 0.5625rem); }
        }
        @media (min-width: 1024px) {
          .r-card { width: calc(33.333% - 0.75rem); }
        }
      `}</style>
    </section>
  )
}
