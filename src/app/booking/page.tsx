import BookingShell from '@/components/booking/BookingShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Table — THIS IS BALI',
  description: 'Reserve your table at THIS IS BALI, Ubud\'s most celebrated restaurant.',
}

export default function BookingPage() {
  return <BookingShell />
}
