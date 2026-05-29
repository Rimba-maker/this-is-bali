'use client'

import Image from 'next/image'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import Reveal from './Reveal'

const DISHES = [
  {
    src: 'https://images.unsplash.com/photo-1680169590313-9a14f3cd8148?w=900&h=900&fit=crop&auto=format&q=80',
    name: 'Nasi Campur Bali',
    alt: 'Indonesian local delicacy served in small bowls',
  },
  {
    src: 'https://images.unsplash.com/photo-1613653739328-e86ebd77c9c8?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Lawar Putih',
    alt: 'Traditional Indonesian Lalapan dish arrangement',
  },
  {
    src: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Sate Lilit Ikan',
    alt: 'Person holding Madura satay skewers',
  },
  {
    src: 'https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Bebek Betutu',
    alt: 'Indonesian rice plate with shrimp and vegetables',
  },
  {
    src: 'https://images.unsplash.com/photo-1542990254-7174ee186dd1?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Dadar Gulung',
    alt: 'Flat lay photography of cooked food in Ubud Bali',
  },
  {
    src: 'https://images.unsplash.com/photo-1662364368432-ebea02c6e1da?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Es Daluman',
    alt: 'Tropical coconut drink with beach umbrellas',
  },
  {
    src: 'https://images.unsplash.com/photo-1680674814945-7945d913319c?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Gado-Gado',
    alt: 'Indonesian rice and meat plate',
  },
  {
    src: 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600&h=600&fit=crop&auto=format&q=80',
    name: 'Nasi Goreng Spesial',
    alt: 'Indonesian fried rice with vegetables',
  },
]

const GAP = 12 // px between cards on mobile

// ─── Mobile Carousel ───────────────────────────────────────────────
function MobileCarousel() {
  const [index, setIndex] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const cardWidth = useCallback(() => {
    if (!wrapRef.current) return 0
    return wrapRef.current.offsetWidth * 0.82
  }, [])

  const snapTo = useCallback((i: number) => {
    const w = cardWidth()
    animate(x, -(i * (w + GAP)), {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    })
    setIndex(i)
  }, [x, cardWidth])

  useEffect(() => {
    const onResize = () => snapTo(index)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [index, snapTo])

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const { offset, velocity } = info
    const w = cardWidth()
    const swipePower = Math.abs(offset.x) * Math.abs(velocity.x)

    if (swipePower > 8000 || Math.abs(offset.x) > w * 0.3) {
      const direction = offset.x < 0 ? 1 : -1
      const next = Math.max(0, Math.min(index + direction, DISHES.length - 1))
      snapTo(next)
    } else {
      snapTo(index)
    }
  }

  return (
    <div className="gal-mobile">
      <div ref={wrapRef} className="gal-mobile__viewport">
        <motion.div
          className="gal-mobile__track"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -((DISHES.length - 1) * (cardWidth() + GAP)),
            right: 0,
          }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {DISHES.map((dish, i) => (
            <motion.div
              key={dish.name}
              className="gal-mobile__card"
              animate={{ scale: i === index ? 1 : 0.94, opacity: i === index ? 1 : 0.65 }}
              transition={{ duration: 0.3 }}
            >
              <div className="gal-mobile__img">
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  fill
                  style={{ objectFit: 'cover', pointerEvents: 'none' }}
                  sizes="82vw"
                  draggable={false}
                />
                <div className="gal-mobile__name">{dish.name}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="gal-mobile__dots">
        {DISHES.map((_, i) => (
          <button
            key={i}
            className={`gal-mobile__dot${i === index ? ' gal-mobile__dot--active' : ''}`}
            onClick={() => snapTo(i)}
            aria-label={`Dish ${i + 1}`}
          />
        ))}
      </div>

      <p className="gal-mobile__counter">{index + 1} / {DISHES.length}</p>
    </div>
  )
}

// ─── Desktop Bento Grid ────────────────────────────────────────────
function DesktopBento() {
  return (
    <motion.div
      className="gal-bento"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {DISHES.map(dish => (
        <motion.div
          key={dish.name}
          className="gb-item"
          variants={{
            hidden: { opacity: 0, scale: 0.92 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
        >
          <Image
            src={dish.src}
            alt={dish.alt}
            fill
            className="gb-photo"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="gb-overlay" aria-hidden="true">
            <span className="gb-name">{dish.name}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────
export default function FoodGallery() {
  return (
    <section id="menu" className="gal-section">
      <div className="gal-container">
        <Reveal className="gal-header">
          <span className="gal-eyebrow">Our Food</span>
          <h2 className="gal-title">Food that earns its reviews</h2>
          <p className="gal-subtitle">Traditional recipes. Fresh ingredients. Zero MSG. This is Balinese food at its best.</p>
        </Reveal>

        {/* Mobile: Framer Motion carousel */}
        <MobileCarousel />

        {/* Desktop: bento grid */}
        <DesktopBento />

        <div className="gal-cta">
          <a href="#" className="gal-btn">See the Full Menu →</a>
        </div>
      </div>

      <style>{`
        .gal-section {
          background: #FAFAFA;
          padding: 4rem 0;
        }
        @media (min-width: 768px) { .gal-section { padding: 6rem 0; } }

        .gal-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .gal-container { padding: 0 2rem; } }

        .gal-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .gal-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4611A;
          margin-bottom: 0.625rem;
        }
        .gal-title {
          font-family: var(--font-display);
          font-size: clamp(1.625rem, 3.5vw, 2.5rem);
          font-weight: 600;
          color: #0A0A0A;
          margin: 0 0 0.75rem;
        }
        .gal-subtitle {
          color: rgba(10,10,10,0.55);
          font-size: 1rem;
          margin: 0;
        }

        /* ── Mobile carousel ── */
        .gal-mobile { display: block; }
        @media (min-width: 768px) { .gal-mobile { display: none; } }

        .gal-mobile__viewport {
          overflow: hidden;
          padding: 0.5rem 0 0.75rem;
          cursor: grab;
        }
        .gal-mobile__viewport:active { cursor: grabbing; }

        .gal-mobile__track {
          display: flex;
          gap: ${GAP}px;
          padding-left: 1.25rem;
          will-change: transform;
          user-select: none;
          -webkit-user-select: none;
        }
        .gal-mobile__card {
          flex: 0 0 82%;
          border-radius: 14px;
          overflow: hidden;
        }
        .gal-mobile__img {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 14px;
          overflow: hidden;
          background: #e8dcc8;
        }
        .gal-mobile__name {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem 1rem 1rem;
          background: linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%);
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
        }
        .gal-mobile__dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .gal-mobile__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(10,10,10,0.18);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s ease, width 0.25s ease;
          position: relative;
        }
        .gal-mobile__dot::before { content: ''; position: absolute; inset: -8px; }
        .gal-mobile__dot--active {
          background: #D4611A;
          width: 22px;
          border-radius: 4px;
        }
        .gal-mobile__counter {
          text-align: center;
          font-size: 0.8125rem;
          color: rgba(10,10,10,0.35);
          margin-top: 0.5rem;
        }

        /* ── Desktop bento grid ── */
        .gal-bento { display: none; }
        @media (min-width: 768px) {
          .gal-bento {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: clamp(150px, 17vw, 215px);
            gap: 0.875rem;
            grid-template-areas:
              "a a b c"
              "a a d d"
              "e f g h";
          }
          /* Map items to bento areas */
          .gb-item:nth-child(1) { grid-area: a; }
          .gb-item:nth-child(2) { grid-area: b; }
          .gb-item:nth-child(3) { grid-area: c; }
          .gb-item:nth-child(4) { grid-area: d; }
          .gb-item:nth-child(5) { grid-area: e; }
          .gb-item:nth-child(6) { grid-area: f; }
          .gb-item:nth-child(7) { grid-area: g; }
          .gb-item:nth-child(8) { grid-area: h; }
        }

        .gb-item {
          position: relative;        /* height comes from the grid cell — no collapse */
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          background: #e8dcc8;
        }
        .gb-photo {
          object-fit: cover;
          transition: transform 0.45s ease;
        }
        .gb-item:hover .gb-photo { transform: scale(1.05); }
        .gb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.70) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .gb-item:hover .gb-overlay { opacity: 1; }
        .gb-name {
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        /* Feature card (Nasi Campur) gets a slightly bigger label */
        .gb-item:nth-child(1) .gb-name { font-size: 1.25rem; }

        /* ── CTA ── */
        .gal-cta { text-align: center; margin-top: 2rem; }
        .gal-btn {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #D4611A;
          border: 1.5px solid #D4611A;
          border-radius: 50px;
          padding: 0.75rem 1.75rem;
          font-weight: 600;
          font-size: 0.9375rem;
          letter-spacing: -0.01em;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gal-btn:hover { background: #D4611A; color: #fff; }
      `}</style>
    </section>
  )
}
