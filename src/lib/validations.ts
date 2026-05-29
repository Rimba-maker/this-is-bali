import { z } from 'zod'

export const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  party_size: z.number().int().min(1).max(20),
  seating: z.enum(['sky_table', 'garden', 'indoor', 'no_preference']),
  occasions: z.array(z.enum(['birthday', 'anniversary', 'date_night', 'family', 'celebration'])),
  notes: z.string().max(300).optional().default(''),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp: z.string().regex(/^\+?[0-9]{8,15}$/, 'Invalid phone number'),
  email: z.string().email().optional().or(z.literal('')),
})

export type BookingInput = z.infer<typeof bookingSchema>

export const adminLoginSchema = z.object({
  pin: z.string().min(4).max(6),
})
