import type { Metadata } from 'next'
import { AppProvider } from '@/app-shell/app-provider'
import { getRequestLocale } from '@/app/locale'
import type { SupportedLocale } from '@/domain/types/locale'
import './globals.css'

const metadataDescriptions = {
  en: 'Product discovery platform in Georgia.',
  ru: 'Платформа для поиска товаров в Грузии.',
  ka: 'პროდუქტების აღმოჩენის პლატფორმა საქართველოში.',
} satisfies Record<SupportedLocale, string>

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getRequestLocale()

  return {
    title: 'Geocart',
    description: metadataDescriptions[locale],
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getRequestLocale()

  return (
    <html lang={locale}>
      <body>
        <AppProvider initialLocale={locale}>{children}</AppProvider>
      </body>
    </html>
  )
}
