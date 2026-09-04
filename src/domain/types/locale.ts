export const SUPPORTED_LOCALES = ['en', 'ru', 'ka'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en'

export const normalizeLocale = (value: string | null | undefined): SupportedLocale => {
  const locale = value?.toLowerCase().split(/[-_,;]/)[0]

  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : DEFAULT_LOCALE
}
