import Image from 'next/image'

const DISHES = [
  {
    src: 'https://images.unsplash.com/photo-1680169590313-9a14f3cd8148?w=800&h=1066&fit=crop&auto=format&q=80',
    name: 'Nasi Campur Bali',
    alt: 'Indonesian local delicacy served in small bowls',
    span: true,
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
    <section id="menu" style={{ background: '#FAFAFA', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ display: 'inline-block', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4611A', marginBottom: '0.75rem' }}>
            Our Food
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)', fontWeight: 600, color: '#0A0A0A', marginBottom: '0.875rem' }}>
            Food that earns its reviews
          </h2>
          <p style={{ color: 'rgba(10,10,10,0.56)', fontSize: '1.0625rem' }}>
            Every dish is a love letter to Bali — plated with precision, remembered forever.
          </p>
        </div>

        <div className="gallery-grid">
          {DISHES.map((dish) => (
            <div key={dish.name} className={`g-item${dish.span ? ' g-span' : ''}`}>
              <div className={`g-thumb-wrap${dish.span ? ' g-tall' : ''}`}>
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="g-img"
                />
              </div>
              <div className="g-overlay">
                <span style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: 600 }}>
                  {dish.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: '#D4611A',
              border: '1.5px solid #D4611A',
              borderRadius: 50,
              padding: '0.8125rem 1.875rem',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            View Full Menu →
          </a>
        </div>
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.625rem;
        }
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.875rem;
          }
          .g-span { grid-row: span 2; }
          .g-span .g-thumb-wrap { aspect-ratio: 3/4; }
        }
        .g-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
        }
        .g-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
        }
        .g-item:hover .g-img { transform: scale(1.05); }
        .g-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.68) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .g-item:hover .g-overlay { opacity: 1; }
      `}</style>
    </section>
  )
}
