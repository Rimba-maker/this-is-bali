'use client'

import { useEffect, useRef } from 'react'

const CARDS = [
  {
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #ddd0b8 0%, #b8a480 100%)',
    title: 'Unique Ambience',
    body: 'A Japandi tropical fusion interior — raw timber, lush greenery, and open sky. Every corner is designed to slow you down and make you stay a little longer.',
    cta: 'Explore the space',
    href: '#about',
  },
  {
    emoji: '🏅',
    bg: 'linear-gradient(135deg, #d0c0a8 0%, #ac9070 100%)',
    title: 'Award-Winning Service',
    body: 'Heartfelt hospitality rooted in Balinese tradition. Our team doesn\'t just serve — they make every visit feel like you\'re the only guest in the room.',
    cta: 'Meet the team',
    href: '#about',
  },
  {
    emoji: '👨‍🍳',
    bg: 'linear-gradient(135deg, #c8b498 0%, #a48868 100%)',
    title: 'Award-Winning Chefs',
    body: 'Fresh, MSG-free, and made from scratch every morning. Our chefs bring traditional Balinese recipes to life using the finest local ingredients.',
    cta: 'View the menu',
    href: '#menu',
  },
]

export default function AboutSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" style={{ background: '#F5F0E8', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D4611A',
              marginBottom: '0.75rem',
            }}
          >
            The Experience
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)',
              fontWeight: 600,
              lineHeight: 1.18,
              color: '#0A0A0A',
              marginBottom: '0.875rem',
            }}
          >
            Where Bali&apos;s soul meets your table
          </h2>
          <p style={{ color: 'rgba(10,10,10,0.56)', fontSize: '1.0625rem', lineHeight: 1.68 }}>
            Three reasons our guests keep coming back — and bringing everyone they love.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { refs.current[i] = el }}
              className="exp-card"
              style={{
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.10)',
                opacity: 0,
                transform: 'translateY(22px)',
                transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s, box-shadow 0.25s ease`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.5rem',
                }}
              >
                {card.emoji}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1875rem',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '0.5rem',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(10,10,10,0.56)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}
                >
                  {card.body}
                </p>
                <a
                  href={card.href}
                  style={{
                    color: '#D4611A',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  {card.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-card.card-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .exp-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </section>
  )
}
