import type { Category, Product } from '@/domain/entities'
import { catalogRepository } from '@/data/repositories'
import { geocartCategories } from '@/data/geocart-home'

export type HomePageData = {
  categories: Category[]
  products: Product[]
}

export const getHomePageData = async (): Promise<HomePageData> => {
  const products = await catalogRepository.getPopularProducts()

  return {
    categories: geocartCategories,
    products,
  }
}
