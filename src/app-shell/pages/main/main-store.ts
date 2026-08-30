'use client'

import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { geocartBanner, geocartCategories, geocartProducts } from '@/data/geocart-home'

class MainStore {
  banner = geocartBanner
  categories = geocartCategories
  products = geocartProducts

  constructor() {
    makeAutoObservable(this)
  }
}

export const mainStore = new MainStore()
export const MainStoreContext = createContext<MainStore>(mainStore)
export default MainStore
