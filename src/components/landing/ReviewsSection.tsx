'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import GoogleIcon from '@/components/icons/GoogleIcon'
import Reveal from './Reveal'

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

const SWIPE_THRESHOLD = 35 // px — minimum drag to trigger slide

export default function ReviewsSection() {
  const [current, setCurrent]     = useState(0)
  const [dragging, setDragging]   = useState(false)
  const [dragDelta, setDragDelta] = useState(0)

  const trackRef   = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const startXRef      = useRef(0)
  const startYRef      = useRef(0)
  const isDragging     = useRef(false)
  const intentLocked   = useRef<'horizontal' | 'vertical' | null>(null)

  // Base transform for current slide
  const baseOffset = useCallback((idx: number) => {
    if (!wrapRef.current) return 0
    return -(idx * wrapRef.current.offsetWidth)
  }, [])

  // Apply transform to track
  const applyTransform = useCallback((px: number, animated: boolean) => {
    if (!trackRef.current) return
    trackRef.current.style.transition = animated
      ? 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none'
    trackRef.current.style.transform = `translateX(${px}px)`
  }, [])

  const slideTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(idx, REVIEWS.length - 1))
    setCurrent(next)
    applyTransform(baseOffset(next), true)
  }, [applyTransform, baseOffset])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = c >= REVIEWS.length - 1 ? 0 : c + 1
        if (wrapRef.current && trackRef.current) {
          trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          trackRef.current.style.transform = `translateX(${-(next * wrapRef.current.offsetWidth)}px)`
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
    const onResize = () => slideTo(0)
    window.addEventListener('resize', onResize, { passive: true })
    return () => { stopTimer(); window.removeEventListener('resize', onResize) }
  }, [slideTo, startTimer, stopTimer])

  // ── Pointer events (handles both mouse drag + touch swipe) ──

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button === 2) return
    stopTimer()
    isDragging.current = true
    intentLocked.current = null
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    setDragging(false) // don't show drag cursor until intent confirmed
    setDragDelta(0)
  }, [stopTimer])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current

    // Lock intent on first significant movement
    if (!intentLocked.current) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return // too small to judge
      intentLocked.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    }

    // Vertical scroll — let browser handle, abort drag
    if (intentLocked.current === 'vertical') {
      isDragging.current = false
      applyTransform(baseOffset(current), true)
      return
    }

    // Horizontal swipe — take over
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragDelta(dx)
    applyTransform(baseOffset(current) + dx, false)
  }, [applyTransform, baseOffset, current])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) { startTimer(); return }
    isDragging.current = false
    intentLocked.current = null
    setDragging(false)

    const delta = e.clientX - startXRef.current
    setDragDelta(0)

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      const next = delta < 0
        ? Math.min(current + 1, REVIEWS.length - 1)
        : Math.max(current - 1, 0)
      slideTo(next)
    } else {
      applyTransform(baseOffset(current), true)
    }
    startTimer()
  }, [current, slideTo, applyTransform, baseOffset, startTimer])

  return (
    <section id="reviews" className="rv-section">
      <div className="rv-container">
        {/* Header */}
        <Reveal className="rv-header">
          <span className="rv-eyebrow">What Guests Say</span>
          <h2 className="rv-title">15,000 reasons to visit</h2>
        </Reveal>

        {/* Carousel */}
        <div
          ref={wrapRef}
          className={`rv-viewport${dragging ? ' rv-viewport--dragging' : ''}`}
          onMouseEnter={() => { if (!isDragging.current) stopTimer() }}
          onMouseLeave={() => { if (!isDragging.current) startTimer() }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={trackRef} className="rv-track">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className="rv-card"
                role="group"
                aria-label={`Review ${i + 1} of ${REVIEWS.length}`}
                aria-hidden={i !== current}
              >
                <div className="rv-card__top">
                  <div className="rv-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <div className="rv-card__google">
                    <GoogleIcon size={18} />
                    <span>Google Review</span>
                  </div>
                </div>
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

          {/* Desktop drag hint — fades after first interaction */}
          {!dragging && current === 0 && (
            <div className="rv-drag-hint" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              drag or swipe
            </div>
          )}
        </div>

        {/* Dots */}
        <div className="rv-dots" role="tablist" aria-label="Review navigation">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Review ${i + 1} — ${REVIEWS[i].name}`}
              className={`rv-dot${i === current ? ' rv-dot--active' : ''}`}
              onClick={() => { stopTimer(); slideTo(i); startTimer() }}
            />
          ))}
        </div>

        <p className="rv-counter" aria-live="polite">
          {current + 1} / {REVIEWS.length}
        </p>
      </div>

      <style>{`
        .rv-section {
          background: #2D4A2D;
          padding: 4rem 0;
          overflow: hidden;
        }
        @media (min-width: 768px) { .rv-section { padding: 6rem 0; } }

        .rv-container {
          max-width: 860px;
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

        /* Viewport */
        .rv-viewport {
          overflow: hidden;
          position: relative;
          border-radius: 16px;
          user-select: none;
          -webkit-user-select: none;
          /* KEY: allow vertical scroll but let JS handle horizontal swipe */
          touch-action: pan-y;
        }
        .rv-viewport--dragging {
          cursor: grabbing;
        }
        .rv-viewport:not(.rv-viewport--dragging) {
          cursor: grab;
        }
        @media (hover: none) {
          .rv-viewport, .rv-viewport--dragging { cursor: default; }
        }

        /* Track */
        .rv-track {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
          /* Disable pointer events on children during drag to avoid interference */
        }
        .rv-viewport--dragging .rv-track {
          pointer-events: none;
        }

        /* Card */
        .rv-card {
          flex: 0 0 100%;
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 2rem;
          box-sizing: border-box;
        }
        @media (min-width: 768px) { .rv-card { padding: 2.5rem; } }

        /* Stars + Google logo row */
        .rv-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .rv-card__stars {
          color: #f0c040;
          font-size: 1.0625rem;
          letter-spacing: 0.06em;
        }
        .rv-card__google {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255,255,255,0.50);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .rv-card__text {
          color: rgba(255,255,255,0.85);
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.72;
          margin: 0 0 1.5rem;
          /* Prevent text drag interfering with carousel drag */
          pointer-events: none;
        }
        .rv-card__author {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }
        .rv-card__flag {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .rv-card__name { color: #fff; font-size: 1rem; font-weight: 600; }
        .rv-card__from { color: rgba(255,255,255,0.55); font-size: 0.875rem; margin-top: 0.125rem; }

        /* Drag hint — desktop only, fades after first card */
        .rv-drag-hint {
          position: absolute;
          bottom: 1rem;
          right: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          pointer-events: none;
          animation: hintFade 3s ease 1.5s forwards;
          opacity: 0;
        }
        @keyframes hintFade {
          0%   { opacity: 0; transform: translateX(4px); }
          20%  { opacity: 1; transform: translateX(0); }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (hover: none) { .rv-drag-hint { display: none; } }

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
          background: rgba(255,255,255,0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, width 0.25s ease;
          position: relative;
        }
        .rv-dot::before {
          content: '';
          position: absolute;
          inset: -8px;
        }
        .rv-dot--active {
          background: #D4611A;
          transform: scale(1.2);
          width: 24px;
          border-radius: 4px;
        }

        /* Counter */
        .rv-counter {
          text-align: center;
          margin-top: 0.875rem;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </section>
  )
}
