export default function LocationSection() {
  return (
    <section id="location" style={{ background: '#F5F0E8', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="loc-grid">
          {/* Info */}
          <div>
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
              Find Us
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)',
                fontWeight: 600,
                color: '#0A0A0A',
                margin: '0.5rem 0 2rem',
              }}
            >
              In the heart of Ubud
            </h2>

            {[
              {
                icon: '📍',
                label: 'Address',
                text: 'Jl. Monkey Forest No.06\nUbud, Gianyar, Bali 80571',
              },
              {
                icon: '🕐',
                label: 'Opening Hours',
                text: 'Daily · 11:00 AM – 11:00 PM',
                note: 'Kitchen closes at 10:30 PM',
              },
              {
                icon: '💬',
                label: 'WhatsApp Reservation',
                text: 'For groups of 10+ guests, contact us directly via WhatsApp.',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 50,
                    background: 'rgba(212,97,26,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.0625rem',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0A0A0A',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {item.label}
                  </h4>
                  <p style={{ color: 'rgba(10,10,10,0.56)', fontSize: '0.9375rem', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {item.text}
                  </p>
                  {item.note && (
                    <p style={{ color: '#D4611A', fontSize: '0.875rem', marginTop: '0.2rem' }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a
                href="https://wa.me/62"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#D4611A',
                  color: '#fff',
                  borderRadius: 50,
                  padding: '0.8125rem 1.875rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                }}
              >
                💬 WhatsApp Us
              </a>
              <a
                href="/booking"
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
                Book a Table
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.10)',
            }}
          >
            {/* Replace with actual Google Maps embed:
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%" height="360" style={{border:0}} allowFullScreen loading="lazy"
              />
            */}
            <div
              style={{
                width: '100%',
                height: 360,
                background: 'linear-gradient(135deg, #2D4A2D 0%, #1a2e1a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.875rem',
                color: 'rgba(255,255,255,0.65)',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2.75rem' }}>🗺</span>
              <p style={{ fontSize: '0.875rem' }}>Jl. Monkey Forest No.06, Ubud</p>
              <a
                href="https://maps.google.com/?q=Jl+Monkey+Forest+No+06+Ubud+Bali"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.75)',
                  borderRadius: 50,
                  padding: '0.5rem 1.25rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .loc-grid {
          display: grid;
          gap: 3rem;
        }
        @media (min-width: 768px) {
          .loc-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </section>
  )
}
