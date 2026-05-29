const STEPS = ['Date & Time', 'Party Size', 'Seating', 'Occasion', 'Your Info', 'Review']

export default function ProgressBar({ current }: { current: number }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Step labels — desktop */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          marginBottom: '0.75rem',
        }}
      >
        {STEPS.map((label, i) => {
          const step = i + 1
          const done = step < current
          const active = step === current
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              {/* connector */}
              {i > 0 && (
                <div
                  style={{
                    width: 'clamp(1.5rem, 4vw, 3rem)',
                    height: 2,
                    background: done || active ? '#D4611A' : '#EDE8DC',
                    transition: 'background 0.3s ease',
                  }}
                />
              )}
              {/* circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                  background: done ? '#D4611A' : active ? '#D4611A' : '#EDE8DC',
                  color: done || active ? '#fff' : 'rgba(10,10,10,0.45)',
                  flexShrink: 0,
                }}
              >
                {done ? '✓' : step}
              </div>
            </div>
          )
        })}
      </div>

      {/* Current step label */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#D4611A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Step {current} of {STEPS.length} — {STEPS[current - 1]}
        </span>
      </div>
    </div>
  )
}
