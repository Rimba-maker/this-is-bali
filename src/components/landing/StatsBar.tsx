const STATS = [
  { icon: '⭐', label: '15,000+ Five-Star Reviews' },
  { icon: '🏆', label: 'Award Winning Service' },
  { icon: '📋', label: 'Viral Interactive Stamp Menu' },
  { icon: '🌿', label: 'Floating Tables' },
  { icon: '✨', label: '4.9 Star Rating' },
]

export default function StatsBar() {
  return (
    <div
      style={{
        background: '#F5F0E8',
        borderBottom: '1px solid #EDE8DC',
        padding: '1.375rem 0',
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
          gap: '1.25rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
            {i > 0 && (
              <div
                style={{ width: 1, height: 28, background: '#EDE8DC', flexShrink: 0 }}
              />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 50,
                  background: 'rgba(212,97,26,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.0625rem',
                }}
              >
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
