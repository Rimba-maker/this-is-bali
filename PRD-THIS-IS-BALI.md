# PRD — THIS IS BALI: React + Node.js Rebuild
**Version:** 1.0  
**Author:** Caesar Bimantara  
**Date:** May 2026  
**Status:** Ready for Development

---

## 1. Overview

### 1.1 Background
PT Unicorn Food & Services operates THIS IS BALI — Bali's highest-rated Indonesian restaurant (15,000+ reviews, 4.9★ on Google). The current website runs on WordPress and suffers from slow performance, limited flexibility, and no owned customer data infrastructure. This project rebuilds the landing page, booking flow, and adds an admin dashboard as a modern React + Node.js application.

### 1.2 Goals
- Replicate and improve the THIS IS BALI web experience
- Build a complete, owned booking flow (no third-party dependency)
- Create an admin dashboard for booking management
- Achieve Lighthouse score ≥ 90 (vs. current WordPress)
- Capture customer data (WA, email) directly into company-owned database

### 1.3 Out of Scope (v1)
- Full CMS / content editing by non-developers
- Payment integration
- Multi-language support
- Açaí Queen brand (separate project)

---

## 2. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR/SSG for SEO, fast routing, API routes built-in |
| Styling | Tailwind CSS v4 + Shadcn UI | Rapid development, consistent design system |
| Animation | Framer Motion | Smooth transitions matching brand feel |
| Backend | Next.js API Routes (Node.js) | No separate server needed, same repo |
| Database | Supabase (PostgreSQL) | Free tier, real-time, row-level security |
| Deployment | Vercel | Zero-config, free tier, instant previews |
| Forms | React Hook Form + Zod | Type-safe validation |
| State | Zustand | Lightweight, minimal boilerplate |

> **Note on "Node.js backend" requirement:** Next.js API Routes run on Node.js runtime. This satisfies the requirement while keeping the codebase unified. If a fully separate Express server is required, the API routes can be extracted with minimal refactoring.

---

## 3. Project Structure

```
this-is-bali/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Landing page
│   │   ├── layout.tsx                    # Root layout + metadata
│   │   ├── booking/
│   │   │   ├── page.tsx                  # Booking flow (multi-step)
│   │   │   └── confirmation/
│   │   │       └── page.tsx              # Booking confirmation page
│   │   ├── admin/
│   │   │   ├── page.tsx                  # Admin dashboard (PIN protected)
│   │   │   └── login/
│   │   │       └── page.tsx              # Admin login
│   │   └── api/
│   │       └── bookings/
│   │           ├── route.ts              # GET (list) + POST (create)
│   │           └── [id]/
│   │               └── route.ts          # PATCH (update status)
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── FoodGallery.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── booking/
│   │   │   ├── BookingShell.tsx          # Multi-step container
│   │   │   ├── StepDatetime.tsx          # Step 1
│   │   │   ├── StepPartySize.tsx         # Step 2
│   │   │   ├── StepPreference.tsx        # Step 3
│   │   │   ├── StepOccasion.tsx          # Step 4
│   │   │   ├── StepPersonalInfo.tsx      # Step 5
│   │   │   ├── StepReview.tsx            # Step 6
│   │   │   └── ProgressBar.tsx
│   │   └── admin/
│   │       ├── StatsCards.tsx
│   │       ├── BookingTable.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── FilterBar.tsx
│   │       └── BookingDetailModal.tsx
│   ├── lib/
│   │   ├── supabase.ts                   # Supabase client
│   │   ├── validations.ts                # Zod schemas
│   │   └── utils.ts                      # Helpers (cn, formatDate, etc.)
│   ├── store/
│   │   └── bookingStore.ts               # Zustand booking state
│   └── types/
│       └── index.ts                      # TypeScript interfaces
├── public/
│   ├── images/                           # Static images
│   └── videos/                           # Hero video (optimized)
├── .env.local                            # Supabase keys
├── README.md
└── package.json
```

---

## 4. Feature Specifications

---

### 4.1 Landing Page

#### 4.1.1 Navbar
- Fixed top, transparent → solid black on scroll
- Logo (left) + nav links (center/right): Our Menu, Book a Table, Visit Us, Contact Us
- CTA button: "Book Table" → `/booking`
- Mobile: hamburger menu with slide-in drawer
- Smooth scroll behavior

#### 4.1.2 Hero Section
- Full-viewport height
- Background: autoplay looped video (muted, no controls) with dark overlay
- Headline: "The WORLD's Best Indonesian Restaurant"
- Subheadline: "Visit THIS IS BALI Today And Experience Award Winning Authentic Balinese Food And Desserts In The Heart Of Ubud."
- Two CTAs: "RESERVE A TABLE" (primary) + "VISIT US NOW" (secondary → Google Maps)
- Social proof: Google 4.9★ badge + "15,000 Reviews"
- AirAsia partner logo
- Entrance animation: fade-in + slide-up (Framer Motion)

**Improvement over original:** Lazy-load video with poster image fallback. On mobile, replace video with static optimized image (performance).

#### 4.1.3 Stats / Highlights Bar
Horizontal scrollable on mobile, grid on desktop:
- 15,000+ 5-Star Reviews
- Award Winning Service & Design
- Viral Interactive Stamp Menu
- Floating Tables
- 4.9 Star Rating

#### 4.1.4 About / Experience Section
Three-column grid (stacks on mobile):
1. **Unique Ambience** — Japandi tropical fusion interior
2. **Award-Winning Service** — Heartfelt hospitality
3. **Award-Winning Chefs** — Fresh, MSG-free, homemade

Each: image (aspect-ratio fixed) + heading + paragraph + CTA link.

**Improvement:** Scroll-triggered entrance animations per card (staggered).

#### 4.1.5 Food Gallery
- Masonry or 3-column grid layout
- 6 food images (fetched from Supabase storage or static)
- Hover: subtle zoom + overlay with dish name
- "View Full Menu" CTA → external PDF link

#### 4.1.6 Reviews / Testimonials Section
- Carousel (auto-rotate, 5s interval, pause on hover)
- Each card: star rating, review text, reviewer name, country flag
- 5–6 seeded testimonials (from real Google reviews)
- Background: dark section for contrast

#### 4.1.7 Location / Visit Section
- Hours: Daily 11:00 AM – 11:00 PM (Kitchen closes 10:30 PM)
- Address: Jl. Monkey Forest No.06, Ubud
- Embedded Google Maps iframe
- WhatsApp CTA button
- "Book a Table" CTA

#### 4.1.8 Footer
- Logo
- Nav links
- Social media icons (Instagram, Facebook, TripAdvisor)
- Address + hours
- Copyright: PT Unicorn Food And Services

---

### 4.2 Booking Flow

Multi-step form at `/booking`. State managed via Zustand (persists across steps).

#### Step 1 — Date & Time
**Fields:**
- Date picker (calendar UI, disabled: past dates + Mondays if closed)
- Time slot selector (visual buttons, not dropdown):
  - Lunch: 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00
  - Dinner: 17:00, 17:30, 18:00, 18:30, 19:00, 19:30, 20:00, 20:30, 21:00

**Validation:** Date required, time required. Date must be today or future.

#### Step 2 — Party Size
**Fields:**
- Party size selector: 1–12 (visual number buttons)
- Groups of 10+: show info text "For groups of 10+, please contact us via WhatsApp"

**UX Note:** Show estimated table layout hint (e.g., "We'll seat you at our cozy 2-top" for 1–2 pax).

#### Step 3 — Seating Preference
**Fields:**
- Radio cards (visual):
  - 🏔️ Sky Table — Most popular, limited availability
  - 🌿 Garden Area — Tropical, relaxed
  - 🪑 Indoor — Cozy, air-conditioned
  - No Preference

**Note:** Sky Table = subject to availability, not guaranteed.

#### Step 4 — Special Occasion
**Fields:**
- Occasion selector (optional, multi-select chips):
  - 🎂 Birthday
  - 💍 Anniversary
  - 💑 Date Night
  - 👨‍👩‍👧 Family Gathering
  - 🎉 Celebration
  - None
- Free text: "Any special requests or notes?" (max 300 chars)

#### Step 5 — Personal Info
**Fields:**
- Full Name (required)
- WhatsApp Number (required, with country code selector, default +62)
- Email Address (optional)

**Validation (Zod):**
```typescript
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsapp: z.string().regex(/^\+?[0-9]{8,15}$/, "Invalid phone number"),
  email: z.string().email().optional().or(z.literal("")),
})
```

#### Step 6 — Review & Confirm
Summary card showing all selections:
- Date, Time
- Party size
- Seating preference
- Occasion(s)
- Name + WA + Email

Primary CTA: "Confirm Booking" → calls `POST /api/bookings`

On success: redirect to `/booking/confirmation?id={bookingId}`

#### Confirmation Page
- Animated checkmark (Framer Motion)
- Booking reference number (8-char uppercase)
- Summary of booking details
- "Add to WhatsApp" button → opens WA with pre-filled message to restaurant
- "Back to Home" button

---

### 4.3 Backend — API Routes

#### `POST /api/bookings`
Creates a new booking.

**Request body:**
```typescript
{
  date: string,          // "2026-06-15"
  time: string,          // "18:00"
  party_size: number,    // 2
  seating: string,       // "sky_table" | "garden" | "indoor" | "no_preference"
  occasions: string[],   // ["birthday", "anniversary"]
  notes: string,         // optional
  name: string,
  whatsapp: string,
  email: string          // optional
}
```

**Response:**
```typescript
{
  success: true,
  booking: {
    id: string,
    reference: string,   // e.g. "TIB-A7X2K9"
    ...fields
  }
}
```

**Logic:**
1. Validate with Zod schema
2. Generate reference code: `TIB-` + 6 random alphanumeric chars
3. Insert to Supabase `bookings` table
4. Return booking data

#### `GET /api/bookings`
Returns list of bookings. Admin-only (PIN checked via header or cookie).

**Query params:** `?date=2026-06-15` `?status=pending` `?limit=50&offset=0`

#### `PATCH /api/bookings/[id]`
Updates booking status.

**Request body:** `{ status: "confirmed" | "seated" | "completed" | "cancelled" }`

---

### 4.4 Database Schema (Supabase)

```sql
-- Bookings table
create table bookings (
  id            uuid default gen_random_uuid() primary key,
  reference     text unique not null,
  date          date not null,
  time          text not null,
  party_size    integer not null check (party_size >= 1 and party_size <= 20),
  seating       text not null default 'no_preference',
  occasions     text[] default '{}',
  notes         text default '',
  name          text not null,
  whatsapp      text not null,
  email         text default '',
  status        text not null default 'pending'
                  check (status in ('pending', 'confirmed', 'seated', 'completed', 'cancelled')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Index for admin queries
create index bookings_date_idx on bookings(date);
create index bookings_status_idx on bookings(status);
create index bookings_created_at_idx on bookings(created_at desc);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on bookings
  for each row execute function update_updated_at();
```

---

### 4.5 Admin Dashboard

Accessible at `/admin`. Protected by a simple PIN (stored in env var: `ADMIN_PIN`).

#### Admin Login (`/admin/login`)
- Single PIN input (4–6 digits)
- On correct PIN: set `admin_session` cookie (httpOnly, 8h expiry) → redirect to `/admin`
- On wrong PIN: shake animation + error message
- Max 5 attempts, then 15-min lockout (tracked in localStorage)

#### Dashboard Layout
- Sidebar (desktop) / bottom tab bar (mobile)
- Sections: Overview, Bookings, Calendar

#### Overview Tab — Stats Cards
Four stat cards (auto-refresh every 60s):

| Card | Metric |
|---|---|
| Today's Bookings | Count of bookings for today |
| Pending Confirmation | Count with status = pending |
| Covers Today | Sum of party_size for today's bookings |
| Peak Hour | Most booked time slot today |

#### Bookings Tab — Main Table
Columns: Reference, Date, Time, Name, Party, Seating, Occasion, Status, Actions

**Filters:**
- Date picker (default: today)
- Status filter: All / Pending / Confirmed / Seated / Completed / Cancelled

**Per-row actions:**
- Status dropdown (inline update)
- WhatsApp button → opens `https://wa.me/{whatsapp}` (direct contact)
- View details (modal with full booking info)

**Status badge colors:**
- Pending → Yellow
- Confirmed → Blue
- Seated → Purple
- Completed → Green
- Cancelled → Red/Gray

#### Booking Detail Modal
Full booking card with:
- All fields
- Status update dropdown
- Timestamps (created, last updated)
- "Copy WA Message" button — copies pre-formatted message:
  ```
  Halo {name}! 
  Konfirmasi reservasi Anda di THIS IS BALI:
  📅 {date}, {time}
  👥 {party_size} orang
  🪑 {seating}
  Referensi: {reference}
  Kami menantikan kedatangan Anda! 🌴
  ```

#### Bookings Export
"Export CSV" button → downloads all bookings for selected date range as CSV.

---

## 5. Design System

### 5.1 Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--brand-black` | `#0A0A0A` | Primary background, navbar |
| `--brand-white` | `#FAFAFA` | Text on dark backgrounds |
| `--brand-orange` | `#D4611A` | Primary CTA, accents |
| `--brand-cream` | `#F5F0E8` | Light section backgrounds |
| `--brand-green` | `#2D4A2D` | Tropical accent, footer |
| `--gray-muted` | `#6B6B6B` | Secondary text |

### 5.2 Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | Playfair Display | 700 | 56–80px |
| Heading | Playfair Display | 600 | 32–48px |
| Subheading | Inter | 500 | 18–24px |
| Body | Inter | 400 | 14–16px |
| UI / Labels | Inter | 500 | 12–14px |

Load via `next/font/google`.

### 5.3 Spacing & Layout
- Max content width: 1280px
- Section padding: `py-24` (desktop), `py-16` (mobile)
- Grid: 12-column, gap-6
- Border radius: `rounded-lg` (8px) for cards, `rounded-full` for pills

### 5.4 Animation Principles (Framer Motion)
```typescript
// Standard entrance
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

// Staggered children
const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

---

## 6. Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Hero video load | Poster image first, video lazy after |
| Images | All via `next/image` (WebP, lazy, priority on hero) |

---

## 7. SEO

- `metadata` export per page (Next.js App Router)
- OG image for social sharing (hero image)
- Structured data: `Restaurant` schema (JSON-LD)
- Canonical URL
- Sitemap via `next-sitemap`

```typescript
// app/layout.tsx
export const metadata = {
  title: "THIS IS BALI — The World's Best Indonesian Restaurant in Ubud",
  description: "Experience award-winning authentic Balinese food in Ubud. 15,000+ 5-star reviews. Book your table now.",
  openGraph: {
    images: ["/og-image.jpg"],
  },
}
```

---

## 8. Security

- Admin PIN via env var (`ADMIN_PIN`), never exposed to client
- API routes: validate all inputs with Zod before DB insert
- Supabase RLS enabled: public can only INSERT bookings, cannot SELECT
- Admin reads go through authenticated server-side API routes only
- Cookie: `httpOnly`, `secure`, `sameSite: strict`
- Rate limiting: max 5 booking submissions per IP per hour (simple in-memory or Upstash Redis)

---

## 9. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-only, never expose to client
ADMIN_PIN=1234                      # change before production
NEXT_PUBLIC_SITE_URL=https://thisisbali-demo.vercel.app
```

---

## 10. Development Timeline

| Day | Deliverable |
|---|---|
| Day 1 AM | Project setup: Next.js + Tailwind + Supabase + Vercel deploy (blank) |
| Day 1 PM | Landing page: Navbar, Hero, Stats, About sections |
| Day 2 AM | Landing page: Gallery, Reviews, Location, Footer — complete |
| Day 2 PM | Booking flow: all 6 steps + Zustand state + Zod validation |
| Day 3 AM | API routes + Supabase integration + confirmation page |
| Day 3 PM | Admin dashboard: login, stats cards, booking table, modal |
| Day 3 EOD | Polish, Lighthouse audit, README, final deploy |

---

## 11. Deployment

- **Platform:** Vercel (free tier)
- **Domain:** `thisisbali-demo.vercel.app` (or custom if available)
- **Branch strategy:** `main` → production, `dev` → preview
- **Supabase:** Free tier (500MB storage, 50k rows, 2GB bandwidth)

---

## 12. What Would Be Improved With More Time

1. **WhatsApp confirmation automation** — trigger WA message to customer via Fonnte/WA Business API on booking creation
2. **Real-time seat availability** — show how many slots remain per time + date
3. **Digital Stamp Card** — loyalty system tied to WA number
4. **Analytics dashboard** — booking trends, peak days, conversion rate from landing → booking
5. **CMS integration** — allow non-developer to update menu, photos, and operating hours
6. **Multi-language** — EN, JP, KR, ZH for international tourist segments
7. **Email confirmation** — via Resend API, with branded HTML template
8. **Celebration upsell flow** — if occasion selected, show add-on packages (cake, decoration) before confirmation

---

## 13. Submission Checklist

- [ ] GitHub repository (public or shared access)
- [ ] Live URL on Vercel
- [ ] Admin credentials: URL `/admin/login`, PIN: `{ADMIN_PIN}`
- [ ] Sample bookings seeded for demo purposes
- [ ] README.md with setup instructions
- [ ] `.env.example` file (no real keys)

---

## 14. Notes on AI-Assisted Development

This project is developed using AI-assisted workflows (Claude, GitHub Copilot) for:
- Component scaffolding and boilerplate
- Schema and validation generation
- Copy refinement
- Code review suggestions

This is intentional and aligns with the job description's emphasis on "ability to use modern AI-assisted workflows effectively." AI accelerates execution — all architectural decisions, code review, and product judgment remain the developer's responsibility.

---

*PRD v1.0 — Caesar Bimantara — May 2026*
