import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="ft-footer">
      <div className="ft-container">
        <div className="ft-grid">
          {/* Brand */}
          <div className="ft-brand">
            <div className="ft-logo">THIS IS <span>BALI</span></div>
            <p className="ft-brand__desc">
              Award-winning authentic Balinese cuisine in the heart of Ubud.
              Rated 4.9★ with over 15,000 Google reviews.
            </p>
            <div className="ft-socials">
              {[['IG', 'Instagram'], ['FB', 'Facebook'], ['TA', 'TripAdvisor']].map(([abbr, label]) => (
                <a key={label} href="#" aria-label={label} className="ft-social">{abbr}</a>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <h4 className="ft-col-title">Visit</h4>
            <ul className="ft-links">
              {[['Our Story', '#about'], ['The Menu', '#menu'], ['Directions', '#location'], ['Reviews', '#reviews']].map(([label, href]) => (
                <li key={label}><Link href={href} className="ft-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Reserve */}
          <div>
            <h4 className="ft-col-title">Reserve</h4>
            <ul className="ft-links">
              {[['Book a Table', '/booking'], ['WhatsApp', 'https://wa.me/62'], ['Group Booking', '#contact']].map(([label, href]) => (
                <li key={label}><Link href={href} className="ft-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="ft-col-title">Hours</h4>
            <ul className="ft-links">
              {['Daily: 11 AM – 11 PM', 'Kitchen closes 10:30 PM', 'Jl. Monkey Forest No.06', 'Ubud, Bali'].map(line => (
                <li key={line} className="ft-text">{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p>© 2026 PT Unicorn Food And Services. All rights reserved.</p>
          <p>THIS IS BALI · Ubud, Bali, Indonesia</p>
        </div>
      </div>

      <style>{`
        .ft-footer {
          background: #2D4A2D;
          color: rgba(255,255,255,0.68);
          padding: 3.5rem 0 2rem;
        }
        @media (min-width: 768px) { .ft-footer { padding: 5rem 0 2rem; } }

        .ft-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .ft-container { padding: 0 2rem; } }

        .ft-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 768px) {
          .ft-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2.5rem;
          }
        }

        /* Brand spans full width on mobile */
        .ft-brand {
          grid-column: 1 / -1;
        }
        @media (min-width: 768px) {
          .ft-brand { grid-column: auto; }
        }

        .ft-logo {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .ft-logo span { color: #D4611A; }
        .ft-brand__desc {
          font-size: 0.875rem;
          line-height: 1.65;
          max-width: 260px;
          margin: 0 0 1.25rem;
        }

        .ft-socials { display: flex; gap: 0.5rem; }
        .ft-social {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.70);
          font-size: 0.75rem;
          font-weight: 700;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .ft-social:hover { background: rgba(255,255,255,0.16); color: #fff; }

        .ft-col-title {
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          margin: 0 0 1rem;
        }
        .ft-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .ft-link {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.68);
          transition: color 0.2s ease;
        }
        .ft-link:hover { color: #fff; }
        .ft-text {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.68);
        }

        .ft-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.09);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ft-bottom p {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }
      `}</style>
    </footer>
  )
}
