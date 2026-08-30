'use client'

import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import type { Location } from '@/domain/types/location'

class AppStore {
  language = 'EN'
  favoritesCount = 15
  location: Location = {
    city: 'Tbilisi',
    country: 'Georgia',
  }

  constructor() {
    makeAutoObservable(this)
  }

  setLanguage(language: string) {
    this.language = language
  }

  setLocation(location: Location) {
    this.location = location
  }
}

export const appStore = new AppStore()
export const AppStoreContext = createContext<AppStore>(appStore)
