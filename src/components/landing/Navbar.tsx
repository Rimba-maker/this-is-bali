'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  ['Experience', '#about'],
  ['Menu', '#menu'],
  ['Reviews', '#reviews'],
  ['Visit Us', '#location'],
]

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

  const close = () => setDrawerOpen(false)

  return (
    <>
      <header className={`tib-nav${scrolled ? ' tib-nav--scrolled' : ''}`}>
        <div className="tib-nav__inner">
          <Link href="/" className="tib-nav__logo">
            THIS IS <span>BALI</span>
          </Link>

          {/* Desktop links */}
          <nav className="tib-nav__links" aria-label="Main navigation">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} href={href} className="tib-nav__link">{label}</Link>
            ))}
          </nav>

          <div className="tib-nav__actions">
            {/* Desktop CTA — fades in after scroll */}
            <Link
              href="/booking"
              className={`tib-nav__cta${scrolled ? ' tib-nav__cta--visible' : ''}`}
              tabIndex={scrolled ? 0 : -1}
            >
              Book Table
            </Link>
            {/* Mobile hamburger — hidden on desktop */}
            <button
              className="tib-nav__burger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`tib-drawer-overlay${drawerOpen ? ' tib-drawer-overlay--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className={`tib-drawer${drawerOpen ? ' tib-drawer--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <button className="tib-drawer__close" onClick={close} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        {NAV_LINKS.map(([label, href]) => (
          <Link key={label} href={href} className="tib-drawer__link" onClick={close}>{label}</Link>
        ))}
        <Link href="/booking" className="tib-drawer__cta" onClick={close}>
          Reserve a Table
        </Link>
      </nav>

      <style>{`
        /* ── Navbar ── */
        .tib-nav {
          position: fixed;
          inset: 0 0 auto 0;
          height: 68px;
          display: flex;
          align-items: center;
          z-index: 100;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .tib-nav--scrolled {
          background: #0A0A0A;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.08);
        }
        .tib-nav__inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .tib-nav__logo {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #fff;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tib-nav__logo span { color: #D4611A; }

        .tib-nav__links {
          display: none;
          align-items: center;
          gap: 2rem;
          flex: 1;
          justify-content: center;
        }
        .tib-nav__link {
          color: rgba(255,255,255,0.80);
          font-size: 0.9375rem;
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .tib-nav__link:hover { color: #fff; }

        .tib-nav__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        /* Desktop CTA — hidden until scroll */
        .tib-nav__cta {
          display: none;
          align-items: center;
          background: #D4611A;
          color: #fff;
          border-radius: 50px;
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          min-height: 40px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, background 0.2s ease;
        }
        .tib-nav__cta--visible {
          opacity: 1;
          pointer-events: auto;
        }
        .tib-nav__cta:hover { background: #B85416; }
        .tib-nav__cta:active { transform: scale(0.96); }

        /* Hamburger — mobile only */
        .tib-nav__burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 10px 8px;
          background: none;
          border: none;
          cursor: pointer;
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
        }
        .tib-nav__burger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: opacity 0.2s ease;
        }

        /* ── Overlay ── */
        .tib-drawer-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 150;
          backdrop-filter: blur(2px);
        }
        .tib-drawer-overlay--open { display: block; }

        /* ── Drawer ── */
        .tib-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(300px, 85vw);
          background: #0A0A0A;
          z-index: 200;
          transform: translateX(100%);
          transition: transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .tib-drawer--open { transform: translateX(0); }
        .tib-drawer__close {
          align-self: flex-end;
          background: rgba(255,255,255,0.08);
          border: none;
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }
        .tib-drawer__close:hover { background: rgba(255,255,255,0.14); }
        .tib-drawer__link {
          display: block;
          color: rgba(255,255,255,0.80);
          font-size: 1.0625rem;
          font-weight: 500;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: color 0.2s ease;
        }
        .tib-drawer__link:hover { color: #fff; }
        .tib-drawer__cta {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
          background: #D4611A;
          color: #fff;
          border-radius: 50px;
          padding: 0.875rem 1.5rem;
          font-weight: 600;
          font-size: 0.9375rem;
          transition: background 0.2s ease;
        }
        .tib-drawer__cta:hover { background: #B85416; }

        /* ── Breakpoint: desktop ── */
        @media (min-width: 768px) {
          .tib-nav__inner { padding: 0 2rem; }
          .tib-nav__links { display: flex; }
          .tib-nav__cta { display: inline-flex; }
          .tib-nav__burger { display: none; }
        }
      `}</style>
    </>
  )
}
