'use client'

import { makeAutoObservable } from 'mobx'
import i18n from '@/i18n'
import {
  DEFAULT_LOCALE,
  normalizeLocale,
  type SupportedLocale,
} from '@/domain/types/locale'
import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY } from '@/utils/locale-utils'

export class AppStore {
  language: SupportedLocale = DEFAULT_LOCALE
  isLanguageMenuOpen = false
  isNavbarCompact = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  get languageLabel() {
    return this.language.toUpperCase()
  }

  setLanguage(language: string) {
    const nextLanguage = normalizeLocale(language)
    this.isLanguageMenuOpen = false

    if (nextLanguage === this.language) {
      return
    }

    this.language = nextLanguage
    this.persistLanguage(nextLanguage)
    this.updateDocumentLanguage(nextLanguage)

    void i18n.changeLanguage(nextLanguage).finally(() => {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    })
  }

  setNavbarCompact(isCompact: boolean) {
    this.isNavbarCompact = isCompact
  }

  syncLanguage(language: string | null | undefined) {
    const nextLanguage = normalizeLocale(language)

    if (nextLanguage === this.language) {
      return
    }

    this.language = nextLanguage
    this.updateDocumentLanguage(nextLanguage)
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen
  }

  private persistLanguage(language: SupportedLocale) {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, language)
    } catch {
      // localStorage can be unavailable in private mode.
    }

    document.cookie = `${LOCALE_COOKIE_NAME}=${language}; path=/; max-age=31536000; samesite=lax`
  }

  private updateDocumentLanguage(language: SupportedLocale) {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.lang = language
  }
}
