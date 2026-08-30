'use client'

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { CategoryBar } from '@/app-shell/components/category-bar'
import { Footer } from '@/app-shell/components/footer'
import { HeroCarousel } from '@/app-shell/components/hero-carousel'
import { Navbar } from '@/app-shell/components/navbar'
import { ProductGrid } from '@/app-shell/components/product-grid'
import { SectionLoader } from '@/app-shell/components/section-loader'
import { MainStoreContext } from './main-store'

export const MainPage = observer(() => {
  const mainStore = useContext(MainStoreContext)

  return (
    <main className="geocart-page">
      <Navbar />
      <CategoryBar categories={mainStore.categories} />
      <HeroCarousel banner={mainStore.banner} />
      <ProductGrid products={mainStore.products} />
      <SectionLoader />
      <Footer />
    </main>
  )
})
