import type { Metadata } from 'next'
import { AppProvider } from '@/app-shell/app-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Geocart',
  description: 'Product discovery platform in Georgia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
