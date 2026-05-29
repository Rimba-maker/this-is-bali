export type SeatingPreference = 'sky_table' | 'garden' | 'indoor' | 'no_preference'
export type OccasionType = 'birthday' | 'anniversary' | 'date_night' | 'family' | 'celebration'
export type BookingStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  reference: string
  date: string
  time: string
  party_size: number
  seating: SeatingPreference
  occasions: OccasionType[]
  notes: string
  name: string
  whatsapp: string
  email: string
  status: BookingStatus
  created_at: string
  updated_at: string
}

export interface BookingFormData {
  date: string
  time: string
  party_size: number
  seating: SeatingPreference
  occasions: OccasionType[]
  notes: string
  name: string
  whatsapp: string
  email: string
}
