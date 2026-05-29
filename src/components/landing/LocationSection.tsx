function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

const ITEMS = [
  { Icon: PinIcon,  label: 'Address',               text: 'Jl. Monkey Forest No.06\nUbud, Gianyar, Bali 80571' },
  { Icon: ClockIcon,label: 'Opening Hours',          text: 'Daily · 11:00 AM – 11:00 PM', note: 'Kitchen closes at 10:30 PM' },
  { Icon: ChatIcon, label: 'Group Bookings',   text: 'Planning a group visit? Message us on WhatsApp and we\'ll arrange the best experience for your party.' },
]

export default function LocationSection() {
  return (
    <section id="location" className="loc-section">
      <div className="loc-container">
        <div className="loc-grid">
          {/* Info */}
          <div>
            <span className="loc-eyebrow">Find Us</span>
            <h2 className="loc-title">In the heart of Ubud</h2>

            <div className="loc-items">
              {ITEMS.map(({ Icon, label, text, note }) => (
                <div key={label} className="loc-item">
                  <div className="loc-item__icon"><Icon /></div>
                  <div className="loc-item__body">
                    <h4 className="loc-item__label">{label}</h4>
                    <p className="loc-item__text" style={{ whiteSpace: 'pre-line' }}>{text}</p>
                    {note && <p className="loc-item__note">{note}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="loc-ctas">
              <a href="https://wa.me/62" target="_blank" rel="noopener noreferrer" className="loc-btn loc-btn--fill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                WhatsApp Us
              </a>
              <a href="/booking" className="loc-btn loc-btn--outline">
                Book a Table
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="loc-map">
            <iframe
              src="https://maps.google.com/maps?q=-8.5081513,115.2642473&z=17&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="THIS IS BALI — Jl. Monkey Forest No.06, Ubud on Google Maps"
            />
          </div>
        </div>
      </div>

      <style>{`
        .loc-section {
          background: #F5F0E8;
          padding: 4rem 0;
        }
        @media (min-width: 768px) { .loc-section { padding: 6rem 0; } }

        .loc-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .loc-container { padding: 0 2rem; } }

        .loc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .loc-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            gap: 3.5rem;
          }
        }

        .loc-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4611A;
          margin-bottom: 0.5rem;
        }
        .loc-title {
          font-family: var(--font-display);
          font-size: clamp(1.625rem, 3.5vw, 2.5rem);
          font-weight: 600;
          color: #0A0A0A;
          margin: 0.375rem 0 2rem;
          line-height: 1.2;
        }

        .loc-items { display: flex; flex-direction: column; gap: 1.375rem; }
        .loc-item { display: flex; align-items: flex-start; gap: 1rem; }
        .loc-item__icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(212,97,26,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .loc-item__label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0A0A0A;
          margin: 0 0 0.25rem;
        }
        .loc-item__text {
          color: rgba(10,10,10,0.56);
          font-size: 0.9375rem;
          line-height: 1.55;
          margin: 0;
        }
        .loc-item__note {
          color: #D4611A;
          font-size: 0.875rem;
          margin: 0.25rem 0 0;
        }

        .loc-ctas {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .loc-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 0.9375rem;
          letter-spacing: -0.01em;
          white-space: nowrap;
          min-height: 44px;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .loc-btn--fill {
          background: #D4611A;
          color: #fff;
          border: 1.5px solid #D4611A;
        }
        .loc-btn--fill:hover { background: #B85416; border-color: #B85416; }
        .loc-btn--outline {
          background: transparent;
          color: #D4611A;
          border: 1.5px solid #D4611A;
        }
        .loc-btn--outline:hover { background: rgba(212,97,26,0.07); }
        .loc-btn--wire {
          background: transparent;
          color: rgba(255,255,255,0.80);
          border: 1.5px solid rgba(255,255,255,0.55);
        }
        .loc-btn--wire:hover { background: rgba(255,255,255,0.10); }

        .loc-map {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.10);
        }
      `}</style>
    </section>
  )
}
