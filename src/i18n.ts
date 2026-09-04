'use client'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/domain/types/locale'
import type { SupportedLocale } from '@/domain/types/locale'
import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY } from '@/utils/locale-utils'
import enTranslation from '../public/locales/en/translation.json'
import kaTranslation from '../public/locales/ka/translation.json'
import ruTranslation from '../public/locales/ru/translation.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  ka: {
    translation: kaTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: [...SUPPORTED_LOCALES],
      load: 'languageOnly',
      defaultNS: 'translation',
      initImmediate: false,
      detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
        lookupCookie: LOCALE_COOKIE_NAME,
        lookupLocalStorage: LOCALE_STORAGE_KEY,
        caches: ['cookie', 'localStorage'],
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: {
          path: '/',
          sameSite: 'lax',
        },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })
}

export const syncI18nLanguage = (language: SupportedLocale) => {
  if (i18n.resolvedLanguage === language || i18n.language === language) {
    return
  }

  void i18n.changeLanguage(language)
}

export default i18n
