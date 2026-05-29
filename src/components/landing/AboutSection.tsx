'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const CARDS = [
  {
    src: 'https://images.unsplash.com/photo-1775476784484-cd4f5a5101b5?w=800&h=600&fit=crop&auto=format&q=80',
    alt: 'Tropical restaurant dining area with lush greenery',
    title: 'Unique Ambience',
    body: 'A Japandi tropical fusion interior — raw timber, lush greenery, and open sky. Every corner is designed to slow you down and make you stay a little longer.',
    cta: 'Explore the space',
    href: '#about',
  },
  {
    src: 'https://images.unsplash.com/photo-1778053790481-b3ba188adec6?w=800&h=600&fit=crop&auto=format&q=80',
    alt: 'Woven pendant lights hang from a leafy ceiling in restaurant',
    title: 'Award-Winning Service',
    body: "Heartfelt hospitality rooted in Balinese tradition. Our team doesn't just serve — they make every visit feel like you're the only guest in the room.",
    cta: 'Meet the team',
    href: '#about',
  },
  {
    src: 'https://images.unsplash.com/flagged/photo-1561350117-501b4661f8d4?w=800&h=600&fit=crop&auto=format&q=80',
    alt: 'Chef holding fry pan in professional kitchen',
    title: 'Award-Winning Chefs',
    body: 'Fresh, MSG-free, and made from scratch every morning. Our chefs bring traditional Balinese recipes to life using the finest local ingredients.',
    cta: 'View the menu',
    href: '#menu',
  },
]

export default function AboutSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('abt-card--visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    refs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="abt-section">
      <div className="abt-container">
        <div className="abt-header">
          <span className="abt-eyebrow">The Experience</span>
          <h2 className="abt-title">Where Bali&apos;s soul meets your table</h2>
          <p className="abt-subtitle">Three reasons our guests keep coming back — and bringing everyone they love.</p>
        </div>

        <div className="abt-grid">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={el => { refs.current[i] = el }}
              className="abt-card"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="abt-card__img">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="abt-card__photo"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="abt-card__body">
                <h3 className="abt-card__title">{card.title}</h3>
                <p className="abt-card__text">{card.body}</p>
                <a href={card.href} className="abt-card__cta">{card.cta} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .abt-section {
          background: #F5F0E8;
          padding: 4rem 0;
        }
        @media (min-width: 768px) { .abt-section { padding: 6rem 0; } }

        .abt-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .abt-container { padding: 0 2rem; } }

        .abt-header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto 3rem;
        }
        .abt-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4611A;
          margin-bottom: 0.625rem;
        }
        .abt-title {
          font-family: var(--font-display);
          font-size: clamp(1.625rem, 3.5vw, 2.5rem);
          font-weight: 600;
          line-height: 1.2;
          color: #0A0A0A;
          margin: 0 0 0.75rem;
        }
        .abt-subtitle {
          color: rgba(10,10,10,0.55);
          font-size: 1rem;
          line-height: 1.65;
          margin: 0;
        }

        /* Grid — 1 col mobile, 3 col desktop */
        .abt-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .abt-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .abt-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Card — entrance animation */
        .abt-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease;
        }
        .abt-card--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .abt-card:hover {
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.12);
        }
        .abt-card__img {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .abt-card__photo {
          object-fit: cover;
          transition: transform 0.45s ease;
        }
        .abt-card:hover .abt-card__photo {
          transform: scale(1.04);
        }
        .abt-card__body { padding: 1.375rem; }
        .abt-card__title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: #0A0A0A;
          margin: 0 0 0.5rem;
        }
        .abt-card__text {
          color: rgba(10,10,10,0.56);
          font-size: 0.9375rem;
          line-height: 1.65;
          margin: 0 0 1rem;
        }
        .abt-card__cta {
          color: #D4611A;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: gap 0.2s ease;
        }
        .abt-card__cta:hover { gap: 0.5rem; }

        /* 2-col: last card spans full width on 640–1023 */
        @media (min-width: 640px) and (max-width: 1023px) {
          .abt-grid .abt-card:last-child {
            grid-column: 1 / -1;
            max-width: calc(50% - 0.625rem);
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
