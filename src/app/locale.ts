import { cookies, headers } from 'next/headers'
import { normalizeLocale, type SupportedLocale } from '@/domain/types/locale'
import { LOCALE_COOKIE_NAME } from '@/utils/locale-utils'

export const getRequestLocale = async (): Promise<SupportedLocale> => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value

  if (cookieLocale) {
    return normalizeLocale(cookieLocale)
  }

  const headersList = await headers()

  return normalizeLocale(headersList.get('accept-language'))
}
