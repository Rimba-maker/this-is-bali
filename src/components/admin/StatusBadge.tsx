import type { BookingStatus } from '@/types'

const CONFIG: Record<BookingStatus, { label: string; bg: string; color: string }> = {
  pending:   { label: 'Pending',   bg: '#FEF3C7', color: '#92400E' },
  confirmed: { label: 'Confirmed', bg: '#DBEAFE', color: '#1E40AF' },
  seated:    { label: 'Seated',    bg: '#EDE9FE', color: '#5B21B6' },
  completed: { label: 'Completed', bg: '#D1FAE5', color: '#065F46' },
  cancelled: { label: 'Cancelled', bg: '#F3F4F6', color: '#6B7280' },
}

export default function StatusBadge({ status }: { status: BookingStatus }) {
  const c = CONFIG[status]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.625rem',
        borderRadius: 50,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: c.bg,
        color: c.color,
        whiteSpace: 'nowrap',
      }}
    >
      {c.label}
    </span>
  )
}
