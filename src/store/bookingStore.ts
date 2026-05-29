import { create } from 'zustand'
import type { BookingFormData, SeatingPreference, OccasionType } from '@/types'

interface BookingState {
  step: number
  data: Partial<BookingFormData>
  setStep: (step: number) => void
  updateData: (partial: Partial<BookingFormData>) => void
  reset: () => void
}

const initialData: Partial<BookingFormData> = {
  party_size: 2,
  seating: 'no_preference',
  occasions: [],
  notes: '',
  email: '',
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  data: initialData,
  setStep: (step) => set({ step }),
  updateData: (partial) => set((s) => ({ data: { ...s.data, ...partial } })),
  reset: () => set({ step: 1, data: initialData }),
}))
