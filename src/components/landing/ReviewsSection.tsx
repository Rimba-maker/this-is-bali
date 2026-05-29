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

const GAP = 16 // px — matches CSS gap below

function getVisible() {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640)  return 2
  return 1
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0)
  const trackRef   = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)

  const slideTo = useCallback((idx: number) => {
    if (!trackRef.current || !wrapRef.current) return
    const vis     = getVisible()
    const max     = Math.max(0, REVIEWS.length - vis)
    const next    = Math.max(0, Math.min(idx, max))
    const wrapW   = wrapRef.current.offsetWidth
    const cardW   = (wrapW - GAP * (vis - 1)) / vis
    const offset  = next * (cardW + GAP)
    trackRef.current.style.transform = `translateX(${-offset}px)`
    setCurrent(next)
  }, [])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const vis  = getVisible()
        const max  = Math.max(0, REVIEWS.length - vis)
        const next = c >= max ? 0 : c + 1
        slideTo(next)
        return next
      })
    }, 5000)
  }, [slideTo])

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    startTimer()
    const onResize = () => { slideTo(0) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { stopTimer(); window.removeEventListener('resize', onResize) }
  }, [slideTo, startTimer, stopTimer])

  return (
    <section id="reviews" className="rv-section">
      <div className="rv-container">
        {/* Header */}
        <div className="rv-header">
          <span className="rv-eyebrow">What Guests Say</span>
          <h2 className="rv-title">15,000 reasons to visit</h2>
        </div>

        {/* Carousel */}
        <div
          ref={wrapRef}
          className="rv-viewport"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          <div ref={trackRef} className="rv-track">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="rv-card" role="group" aria-label={`Review ${i + 1} of ${REVIEWS.length}`}>
                <div className="rv-card__stars" aria-label="5 stars">★★★★★</div>
                <p className="rv-card__text">{r.text}</p>
                <div className="rv-card__author">
                  <div className="rv-card__flag" aria-hidden="true">{r.flag}</div>
                  <div>
                    <div className="rv-card__name">{r.name}</div>
                    <div className="rv-card__from">{r.from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="rv-dots" role="tablist" aria-label="Review navigation">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to review ${i + 1}`}
              className={`rv-dot${i === current ? ' rv-dot--active' : ''}`}
              onClick={() => { stopTimer(); slideTo(i); }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .rv-section {
          background: #2D4A2D;
          padding: 4rem 0;
          overflow: hidden;
        }
        @media (min-width: 768px) { .rv-section { padding: 6rem 0; } }

        .rv-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .rv-container { padding: 0 2rem; } }

        .rv-header { text-align: center; margin-bottom: 2.5rem; }
        .rv-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
          margin-bottom: 0.625rem;
        }
        .rv-title {
          font-family: var(--font-display);
          font-size: clamp(1.625rem, 3.5vw, 2.5rem);
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        /* Viewport clips overflow */
        .rv-viewport { overflow: hidden; }

        /* Track slides horizontally */
        .rv-track {
          display: flex;
          gap: ${GAP}px;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        /* Cards — width driven by JS but need a floor */
        .rv-card {
          flex: 0 0 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          padding: 1.5rem;
          box-sizing: border-box;
        }
        @media (min-width: 640px)  { .rv-card { flex: 0 0 calc(50% - ${GAP / 2}px); } }
        @media (min-width: 1024px) { .rv-card { flex: 0 0 calc(33.333% - ${Math.round(GAP * 2 / 3)}px); } }

        .rv-card__stars {
          color: #f0c040;
          font-size: 0.9375rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .rv-card__text {
          color: rgba(255,255,255,0.82);
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.9375rem;
          line-height: 1.70;
          margin-bottom: 1.25rem;
        }
        .rv-card__author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .rv-card__flag {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .rv-card__name {
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
          line-height: 1.3;
        }
        .rv-card__from {
          color: rgba(255,255,255,0.55);
          font-size: 0.8125rem;
        }

        /* Dots */
        .rv-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.75rem;
        }
        .rv-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          /* expand touch target */
          position: relative;
        }
        .rv-dot::before {
          content: '';
          position: absolute;
          inset: -8px;
        }
        .rv-dot--active {
          background: #D4611A;
          transform: scale(1.4);
        }
      `}</style>
    </section>
  )
}
