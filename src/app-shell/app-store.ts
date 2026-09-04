import { makeAutoObservable } from 'mobx'
import type { Location } from '@/domain/types/location'

export class AppStore {
  language = 'EN'
  favoritesCount = 15
  isLanguageMenuOpen = false
  isLocationMenuOpen = false
  isNavbarCompact = false
  location: Location = {
    city: 'Tbilisi',
    country: 'Georgia',
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLanguage(language: string) {
    this.language = language
    this.isLanguageMenuOpen = false
  }

  setLocation(location: Location) {
    this.location = location
    this.isLocationMenuOpen = false
  }

  setNavbarCompact(isCompact: boolean) {
    this.isNavbarCompact = isCompact
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen

    if (this.isLanguageMenuOpen) {
      this.isLocationMenuOpen = false
    }
  }

  toggleLocationMenu() {
    this.isLocationMenuOpen = !this.isLocationMenuOpen

    if (this.isLocationMenuOpen) {
      this.isLanguageMenuOpen = false
    }
  }
}
