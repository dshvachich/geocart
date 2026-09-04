import type { CatalogPageData } from '@/domain/entities'
import type { SupportedLocale } from '@/domain/types/locale'
import { catalogRepository } from '@/data/repositories'

type GetCatalogPageDataParams = {
  locale?: SupportedLocale
}

export const getCatalogPageData = async ({
  locale,
}: GetCatalogPageDataParams = {}): Promise<CatalogPageData> => {
  const categories = await catalogRepository.getCategoryTree({ locale })

  return {
    categories,
  }
}
