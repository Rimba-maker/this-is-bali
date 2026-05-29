const DISHES = [
  { emoji: '🍛', name: 'Nasi Campur Bali',  bg: 'linear-gradient(135deg, #e0ceb0 0%, #c0a882 100%)', span: true },
  { emoji: '🥗', name: 'Lawar Putih',        bg: 'linear-gradient(135deg, #d4c4a4 0%, #b8a07c 100%)' },
  { emoji: '🍢', name: 'Sate Lilit Ikan',    bg: 'linear-gradient(135deg, #ccc0a0 0%, #a89474 100%)' },
  { emoji: '🫕', name: 'Bebek Betutu',       bg: 'linear-gradient(135deg, #ddd0b8 0%, #b8a480 100%)' },
  { emoji: '🍮', name: 'Dadar Gulung',       bg: 'linear-gradient(135deg, #d0c0a8 0%, #ac9070 100%)' },
  { emoji: '🥤', name: 'Es Daluman',         bg: 'linear-gradient(135deg, #c8b498 0%, #a48868 100%)' },
]

export default function FoodGallery() {
  return (
    <section id="menu" style={{ background: '#FAFAFA', padding: '6rem 0' }}>
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
              color: '#D4611A',
              marginBottom: '0.75rem',
            }}
          >
            Our Food
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)',
              fontWeight: 600,
              color: '#0A0A0A',
              marginBottom: '0.875rem',
            }}
          >
            Food that earns its reviews
          </h2>
          <p style={{ color: 'rgba(10,10,10,0.56)', fontSize: '1.0625rem' }}>
            Every dish is a love letter to Bali — plated with precision, remembered forever.
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {DISHES.map((dish) => (
            <div key={dish.name} className={`g-item${dish.span ? ' g-span' : ''}`}>
              <div
                className={`g-thumb${dish.span ? ' g-thumb-tall' : ''}`}
                style={{ background: dish.bg }}
              >
                <span style={{ fontSize: '2.75rem' }}>{dish.emoji}</span>
              </div>
              <div className="g-overlay">
                <span style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: 600 }}>
                  {dish.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
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
          .g-thumb-tall { aspect-ratio: 3/4 !important; }
        }
        .g-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
        }
        .g-thumb {
          width: 100%;
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease;
        }
        .g-item:hover .g-thumb { transform: scale(1.05); }
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
