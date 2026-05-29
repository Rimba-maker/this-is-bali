'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  prefix?: string
  value: number
  suffix: string
  decimals?: number
  label: string
  sublabel: string
}

const STATS: Stat[] = [
  {
    value: 15000,
    suffix: '+',
    label: 'Google Reviews',
    sublabel: 'Five-star ratings from guests worldwide',
  },
  {
    value: 4.9,
    suffix: '★',
    decimals: 1,
    label: 'Google Rating',
    sublabel: 'Highest-rated restaurant in Ubud',
  },
  {
    prefix: '#',
    value: 1,
    suffix: '',
    label: 'in Ubud',
    sublabel: 'Indonesian restaurant on Google',
  },
]

function useCounter(target: number, decimals = 0, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, decimals, duration])

  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.value, stat.decimals ?? 0, 2200, active)

  const display = stat.decimals
    ? count.toFixed(stat.decimals)
    : count >= 1000
      ? Math.floor(count).toLocaleString()
      : Math.floor(count).toString()

  return (
    <div className="ns-stat">
      <div className="ns-number">
        {stat.prefix && <span className="ns-affix">{stat.prefix}</span>}
        <span className="ns-value">{display}</span>
        {stat.suffix && <span className="ns-affix">{stat.suffix}</span>}
      </div>
      <div className="ns-label">{stat.label}</div>
      <div className="ns-sublabel">{stat.sublabel}</div>
    </div>
  )
}

export default function NumbersSection() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="ns-section">
      <div className="ns-container">
        {STATS.map((stat, i) => (
          <StatItem key={i} stat={stat} active={active} />
        ))}
      </div>

      <style>{`
        .ns-section {
          background: #0A0A0A;
          padding: 4rem 0;
        }
        @media (min-width: 768px) { .ns-section { padding: 5rem 0; } }

        .ns-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .ns-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
        }
        @media (min-width: 768px) { .ns-container { padding: 0 2rem; } }

        .ns-stat {
          text-align: center;
          padding: 0 2rem;
          position: relative;
        }
        /* Vertical divider between stats — desktop only */
        @media (min-width: 640px) {
          .ns-stat:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 10%;
            height: 80%;
            width: 1px;
            background: rgba(255,255,255,0.10);
          }
        }

        .ns-number {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0.125rem;
          line-height: 1;
          margin-bottom: 0.875rem;
        }
        .ns-value {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 6rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .ns-affix {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          font-weight: 700;
          color: #D4611A;
          line-height: 1.2;
          margin-top: 0.25rem;
        }
        /* prefix (#1) align differently */
        .ns-number .ns-affix:first-child {
          margin-top: 0.5rem;
          margin-right: 0.125rem;
        }

        .ns-label {
          font-size: clamp(1rem, 2vw, 1.125rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.375rem;
        }
        .ns-sublabel {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }
      `}</style>
    </section>
  )
}
