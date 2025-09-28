import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { M_PLUS_Rounded_1c as MPlusRounded } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FiltersProvider } from '@/components/filters-provider'
import { DrilldownProvider } from '@/components/drilldown-provider'

export const metadata: Metadata = {
  title: 'Peblo',
  description: 'Peblo dashboard',
  generator: 'v0.app',
}

const PebloBrand = MPlusRounded({ subsets: ['latin'], weight: ['800','900'], variable: '--font-peblo' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${PebloBrand.variable}`}>
        <FiltersProvider>
          <DrilldownProvider>{children}</DrilldownProvider>
        </FiltersProvider>
        <Analytics />
      </body>
    </html>
  )
}
