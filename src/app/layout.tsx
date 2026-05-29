import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: "THIS IS BALI — The World's Best Indonesian Restaurant in Ubud",
  description:
    'Experience award-winning authentic Balinese food in Ubud. 15,000+ 5-star reviews. Book your table now.',
  openGraph: {
    title: "THIS IS BALI — The World's Best Indonesian Restaurant in Ubud",
    description:
      'Experience award-winning authentic Balinese food in Ubud. 15,000+ 5-star reviews.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'THIS IS BALI',
              description:
                "Bali's highest-rated Indonesian restaurant with 15,000+ 5-star reviews.",
              url: 'https://thisisbali.com',
              telephone: '+62',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Monkey Forest No.06',
                addressLocality: 'Ubud',
                addressRegion: 'Bali',
                postalCode: '80571',
                addressCountry: 'ID',
              },
              servesCuisine: 'Indonesian, Balinese',
              priceRange: '$$',
              openingHours: 'Mo-Su 11:00-23:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '15000',
              },
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
