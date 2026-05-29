import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" style={{ background: '#2D4A2D', color: 'rgba(255,255,255,0.70)', padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1875rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#fff',
                marginBottom: '0.875rem',
              }}
            >
              THIS IS <span style={{ color: '#D4611A' }}>BALI</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, maxWidth: 240 }}>
              Award-winning authentic Balinese cuisine in the heart of Ubud. Rated 4.9★ with over 15,000 Google reviews.
            </p>
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1.25rem' }}>
              {[['IG', 'Instagram'], ['FB', 'Facebook'], ['TA', 'TripAdvisor']].map(([label, aria]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={aria}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.09)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.125rem' }}>
              Visit
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[['Our Story', '#about'], ['The Menu', '#menu'], ['Directions', '#location'], ['Reviews', '#reviews']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reserve */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.125rem' }}>
              Reserve
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[['Book a Table', '/booking'], ['WhatsApp', 'https://wa.me/62'], ['Group Booking', '#contact']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.125rem' }}>
              Hours
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['Daily: 11 AM – 11 PM', 'Kitchen closes 10:30 PM', 'Jl. Monkey Forest No.06', 'Ubud, Bali'].map((line) => (
                <li key={line} style={{ fontSize: '0.875rem' }}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.38)' }}>
            © 2026 PT Unicorn Food And Services. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.38)' }}>
            THIS IS BALI · Ubud, Bali, Indonesia
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
      `}</style>
    </footer>
  )
}
