import type { Metadata, Viewport } from 'next'
import { Montserrat, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import { brand } from '@/lib/config/brand'
// @ts-ignore: import global CSS side effect
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || brand.siteUrl

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.seo.titleDefault,
    template: brand.seo.titleTemplate,
  },
  description: brand.seo.description,
  keywords: [
    'maquinaria japonesa España',
    'mini excavadora japonesa',
    'maquinaria japonesa segunda mano',
    'mini tractor japonés',
    'Kubota segunda mano España',
    'Yanmar segunda mano España',
    'Komatsu segunda mano España',
    'maquinaria compacta japonesa',
    'mini excavadora Kubota España',
    'maquinaria importada de Japón',
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: brand.seo.locale,
    url: siteUrl,
    siteName: brand.seo.siteName,
    title: brand.seo.titleDefault,
    description: brand.seo.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: brand.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.seo.twitterTitle,
    description: brand.seo.twitterDescription,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ClerkProvider>
          {children}
        </ClerkProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
