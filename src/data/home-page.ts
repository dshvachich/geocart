import type { HomePageData } from '@/domain/entities'
import { catalogRepository } from '@/data/repositories'

export const getHomePageData = async (): Promise<HomePageData> => {
  const [categories, products] = await Promise.all([
    catalogRepository.getCategoryTree(),
    catalogRepository.getPopularProducts(),
  ])

  return {
    categories,
    products,
  }
}
