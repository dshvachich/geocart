import { CategoryBar } from '@/app-shell/components/category-bar'
import { Footer } from '@/app-shell/components/footer'
import { MobileTabbar } from '@/app-shell/components/mobile-tabbar'
import { Navbar } from '@/app-shell/components/navbar'
import { ProductGrid } from '@/app-shell/components/product-grid'
import { SectionLoader } from '@/app-shell/components/section-loader'
import type { Category, Product } from '@/domain/entities'

type MainPageProps = {
  categories: Category[]
  products: Product[]
}

export const MainPage = ({ categories, products }: MainPageProps) => (
  <main className="geocart-page">
    <Navbar />
    <CategoryBar categories={categories} />
    <ProductGrid products={products} />
    <SectionLoader />
    <Footer />
    <MobileTabbar />
  </main>
)
