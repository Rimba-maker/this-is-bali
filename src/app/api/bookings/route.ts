import { NextRequest, NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { generateReference } from '@/lib/utils'
import { cookies } from 'next/headers'

// Simple in-memory rate limiter: 5 submissions per IP per hour
const rateMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 })
  }

  const reference = generateReference()
  const supabase = createAdminClient()

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({ ...parsed.data, reference })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'Failed to create booking. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, booking }, { status: 201 })
}

export async function GET(req: NextRequest) {
  // Admin only
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (session !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const date   = searchParams.get('date')
  const status = searchParams.get('status')
  const limit  = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 200)
  const offset = parseInt(searchParams.get('offset') ?? '0', 10)

  const supabase = createAdminClient()
  let query = supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (date)   query = query.eq('date', date)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ bookings: data })
}
