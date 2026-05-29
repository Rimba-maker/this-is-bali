'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 620,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Background photo — warm café at night through foliage */}
      <Image
        src="https://images.unsplash.com/photo-1776378147907-1600a9821e0b?w=1600&h=900&fit=crop&auto=format&q=80"
        alt="THIS IS BALI restaurant atmosphere"
        fill
        priority
        style={{ objectFit: 'cover', opacity: 0.55 }}
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 45%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 860,
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            background: 'rgba(255,255,255,0.11)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 50,
            padding: '0.375rem 0.875rem',
            color: 'rgba(255,255,255,0.88)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.375rem',
          }}
        >
          <span style={{ color: '#D4611A' }}>●</span> Ubud&apos;s Most Celebrated Table
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '1.25rem',
          }}
        >
          The <em>World&apos;s</em> Best<br />Indonesian Restaurant
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
            color: 'rgba(255,255,255,0.76)',
            lineHeight: 1.68,
            maxWidth: 580,
            margin: '0 auto 2rem',
          }}
        >
          Visit THIS IS BALI and experience award-winning authentic Balinese food
          and desserts in the heart of Ubud.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.875rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <Link
            href="/booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#D4611A',
              color: '#fff',
              borderRadius: 50,
              padding: '0.8125rem 1.875rem',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Reserve a Table
          </Link>
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
              padding: '0.8125rem 1.875rem',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Visit Us Now
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.875rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 50,
              padding: '0.5rem 1rem',
              color: '#fff',
              fontSize: '0.875rem',
            }}
          >
            <span style={{ color: '#f0c040', letterSpacing: '0.04em' }}>★★★★★</span>
            <strong style={{ fontWeight: 700, fontSize: '1rem' }}>4.9</strong>
            <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.8125rem' }}>
              · 15,000+ Google Reviews
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 50,
              padding: '0.5rem 1rem',
              color: 'rgba(255,255,255,0.88)',
              fontSize: '0.875rem',
            }}
          >
            <span>✈</span>
            <span>AirAsia Official Partner</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.375rem',
          color: 'rgba(255,255,255,0.40)',
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M7 1v16M1 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
