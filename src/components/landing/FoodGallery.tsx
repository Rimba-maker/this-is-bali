import Image from 'next/image'

const DISHES = [
  {
    src: 'https://images.unsplash.com/photo-1680169590313-9a14f3cd8148?w=800&h=1066&fit=crop&auto=format&q=80',
    name: 'Nasi Campur Bali',
    alt: 'Indonesian local delicacy served in small bowls',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1613653739328-e86ebd77c9c8?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Lawar Putih',
    alt: 'Traditional Indonesian Lalapan dish arrangement',
  },
  {
    src: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Sate Lilit Ikan',
    alt: 'Person holding Madura satay skewers',
  },
  {
    src: 'https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Bebek Betutu',
    alt: 'Indonesian rice plate with shrimp and vegetables',
  },
  {
    src: 'https://images.unsplash.com/photo-1542990254-7174ee186dd1?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Dadar Gulung',
    alt: 'Flat lay photography of cooked food in Ubud Bali',
  },
  {
    src: 'https://images.unsplash.com/photo-1662364368432-ebea02c6e1da?w=800&h=600&fit=crop&auto=format&q=80',
    name: 'Es Daluman',
    alt: 'Tropical coconut drink with beach umbrellas',
  },
]

export default function FoodGallery() {
  return (
    <section id="menu" className="gal-section">
      <div className="gal-container">
        <div className="gal-header">
          <span className="gal-eyebrow">Our Food</span>
          <h2 className="gal-title">Food that earns its reviews</h2>
          <p className="gal-subtitle">Every dish is a love letter to Bali — plated with precision, remembered forever.</p>
        </div>

        <div className="gal-grid">
          {DISHES.map(dish => (
            <div key={dish.name} className={`gal-item${dish.tall ? ' gal-item--tall' : ''}`}>
              <div className={`gal-thumb${dish.tall ? ' gal-thumb--tall' : ''}`}>
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  fill
                  className="gal-photo"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="gal-overlay" aria-hidden="true">
                <span className="gal-dish-name">{dish.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gal-cta">
          <a href="#" className="gal-btn">View Full Menu →</a>
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

        /* Grid: 2 cols mobile, 3 cols desktop */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: auto;
          gap: 0.5rem;
        }
        @media (min-width: 768px) {
          .gal-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          .gal-item--tall {
            grid-row: span 2;
          }
        }

        .gal-item {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          cursor: pointer;
          background: #e8dcc8;
        }

        /* Base aspect ratio */
        .gal-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        /* Tall item: only taller on desktop where row-span works */
        @media (min-width: 768px) {
          .gal-thumb--tall {
            aspect-ratio: unset;
            position: absolute;
            inset: 0;
          }
          .gal-item--tall {
            aspect-ratio: unset;
          }
        }

        .gal-photo {
          object-fit: cover;
          transition: transform 0.45s ease;
        }
        .gal-item:hover .gal-photo { transform: scale(1.05); }

        .gal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 0.875rem;
        }
        .gal-item:hover .gal-overlay { opacity: 1; }
        /* Always show dish name on touch devices */
        @media (hover: none) {
          .gal-overlay { opacity: 1; }
        }
        .gal-dish-name {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

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
        .gal-btn:hover {
          background: #D4611A;
          color: #fff;
        }
      `}</style>
    </section>
  )
}
