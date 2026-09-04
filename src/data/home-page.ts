import type { HomePageData } from '@/domain/entities'
import type { SupportedLocale } from '@/domain/types/locale'
import { catalogRepository } from '@/data/repositories'

type GetInitialHomePageDataParams = {
  locale?: SupportedLocale
}

export const getInitialHomePageData = async ({
  locale,
}: GetInitialHomePageDataParams = {}): Promise<HomePageData> => {
  const [categories, products] = await Promise.all([
    catalogRepository.getCategoryTree({ locale }),
    catalogRepository.getPopularProducts({ locale }),
  ])

  return {
    categories,
    products,
  }
}
