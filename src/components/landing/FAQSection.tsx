'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'What are your operating hours?',
    a: "We're open daily from 11:00 AM to 11:00 PM. Last orders are accepted at 10:15 PM.",
  },
  {
    q: 'Do I need a reservation, or can I walk in?',
    a: 'Walk-ins are always welcome! However, we highly recommend booking in advance — especially for weekends and peak hours — to secure your preferred seating.',
  },
  {
    q: 'Is the food halal?',
    a: 'Yes. All our suppliers are halal certified. No pork or lard is processed in our kitchen.',
  },
  {
    q: 'Do you have vegetarian, vegan, or gluten-free options?',
    a: 'Absolutely. Vegan-friendly and vegetarian selections are available throughout the menu. Gluten-free options include our Beef Rendang Bowl and Grilled Honey Chicken Bowl. All food is MSG-free with no preservatives or additives.',
  },
  {
    q: 'Can you help celebrate a special occasion?',
    a: 'We love celebrating with you! Complimentary mini cakes are provided upon request for birthdays, honeymoons, and anniversaries. Let us know when booking.',
  },
  {
    q: 'Is there parking nearby?',
    a: 'Street parking directly outside is limited. Public parking is available at Lapangan Astina Ubud (the soccer fields), approximately a 5-minute walk away.',
  },
  {
    q: 'Is the restaurant accessible for elderly or wheelchair users?',
    a: 'There are only 2 small steps at the entrance, which is manageable with assistance. Please contact us in advance and we will do our best to accommodate you.',
  },
  {
    q: 'Is there air conditioning?',
    a: 'Yes, climate-controlled indoor dining is available for guests who prefer a cooler environment.',
  },
  {
    q: 'Are pets allowed?',
    a: 'We love animals, but pets are not permitted inside the restaurant to ensure the comfort of all our guests.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-eyebrow">Got Questions?</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know before your visit.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {open === i ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4611A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  )}
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq-answer"
                style={{ maxHeight: open === i ? '400px' : '0' }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="faq-footer-note">
          Still have questions?{' '}
          <a href="https://wa.me/62" target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </p>
      </div>

      <style>{`
        .faq-section {
          background: #fff;
          padding: 4rem 0;
        }
        @media (min-width: 768px) { .faq-section { padding: 6rem 0; } }

        .faq-container {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        @media (min-width: 768px) { .faq-container { padding: 0 2rem; } }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .faq-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4611A;
          margin-bottom: 0.625rem;
        }
        .faq-title {
          font-family: var(--font-display);
          font-size: clamp(1.625rem, 3.5vw, 2.375rem);
          font-weight: 600;
          color: #0A0A0A;
          margin: 0 0 0.75rem;
        }
        .faq-subtitle {
          color: rgba(10,10,10,0.55);
          font-size: 1rem;
          margin: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid #EDE8DC;
        }

        .faq-item {
          border-bottom: 1px solid #EDE8DC;
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 0;
          background: none;
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: #0A0A0A;
          cursor: pointer;
          font-family: var(--font-body);
          line-height: 1.5;
          transition: color 0.2s ease;
        }
        .faq-question:hover { color: #D4611A; }
        .faq-item--open .faq-question { color: #D4611A; }

        .faq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(212,97,26,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .faq-item--open .faq-icon { background: rgba(212,97,26,0.14); }

        .faq-answer {
          overflow: hidden;
          transition: max-height 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .faq-answer p {
          padding: 0 0 1.25rem;
          color: rgba(10,10,10,0.62);
          font-size: 0.9375rem;
          line-height: 1.7;
          margin: 0;
        }

        .faq-footer-note {
          text-align: center;
          margin-top: 2.5rem;
          font-size: 0.9375rem;
          color: rgba(10,10,10,0.55);
        }
        .faq-footer-note a {
          color: #D4611A;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(212,97,26,0.35);
          text-underline-offset: 3px;
        }
        .faq-footer-note a:hover { text-decoration-color: #D4611A; }
      `}</style>
    </section>
  )
}
