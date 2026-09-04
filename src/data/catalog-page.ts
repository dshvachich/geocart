import type { CatalogPageData } from '@/domain/entities'
import { catalogRepository } from '@/data/repositories'

export const getCatalogPageData = async (): Promise<CatalogPageData> => {
  const categories = await catalogRepository.getCategoryTree()

  return {
    categories,
  }
}
