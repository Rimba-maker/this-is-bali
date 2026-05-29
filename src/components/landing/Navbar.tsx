'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
          background: scrolled ? '#0A0A0A' : 'transparent',
          boxShadow: scrolled
            ? '0 1px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)'
            : 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1875rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#fff',
            }}
          >
            THIS IS <span style={{ color: '#D4611A' }}>BALI</span>
          </Link>

          {/* Desktop links */}
          <nav style={{ display: 'flex', gap: '2.25rem', alignItems: 'center' }} aria-label="Main navigation">
            {['Experience', 'Menu', 'Reviews', 'Visit Us'].map((label, i) => {
              const hrefs = ['#about', '#menu', '#reviews', '#location']
              return (
                <Link
                  key={label}
                  href={hrefs[i]}
                  style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    display: 'none',
                  }}
                  className="md-link"
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            {scrolled && (
              <Link href="/booking" className="btn-nav">
                Book Table
              </Link>
            )}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 150,
          }}
        />
      )}

      {/* Mobile drawer */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 280,
          background: '#0A0A0A',
          zIndex: 200,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="Mobile navigation"
      >
        <button
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.375rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
        {[
          ['Experience', '#about'],
          ['The Menu', '#menu'],
          ['Reviews', '#reviews'],
          ['Visit Us', '#location'],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={() => setDrawerOpen(false)}
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.82)',
              fontSize: '1.0625rem',
              fontWeight: 500,
              padding: '0.875rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/booking"
          onClick={() => setDrawerOpen(false)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
            background: '#D4611A',
            color: '#fff',
            borderRadius: 50,
            padding: '0.8125rem 1.5rem',
            fontWeight: 600,
            fontSize: '0.9375rem',
          }}
        >
          Reserve a Table
        </Link>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .md-link { display: block !important; }
        }
        .btn-nav {
          display: inline-flex;
          align-items: center;
          background: #D4611A;
          color: #fff;
          border-radius: 50px;
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          transition: background 0.2s ease;
        }
        .btn-nav:hover { background: #B85416; }
      `}</style>
    </>
  )
}
