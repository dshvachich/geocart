import { redirect } from 'next/navigation'
import { CatalogPage } from '@/app-shell/pages/catalog/catalog-page'
import { getRequestLocale } from '@/app/locale'
import { getCatalogPageData } from '@/data/catalog-page'
import {
  findCategoryPath,
  hasCategoryChildren,
} from '@/domain/helpers/category-tree.helpers'
import {
  createSearchHref,
  normalizeSearchParams,
  type RouteSearchParams,
} from '@/utils/search-query-utils'

export const dynamic = 'force-dynamic'

type CatalogRouteProps = {
  searchParams?: Promise<RouteSearchParams>
}

export default async function CatalogRoute({ searchParams }: CatalogRouteProps) {
  const locale = await getRequestLocale()
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getCatalogPageData({ locale })
  const selectedCategoryPath = normalizedSearchParams.category
    ? findCategoryPath(data.categories, normalizedSearchParams.category)
    : null
  const selectedCategory = selectedCategoryPath?.[selectedCategoryPath.length - 1]

  if (selectedCategory && !hasCategoryChildren(selectedCategory)) {
    redirect(createSearchHref({ category: selectedCategory.id }))
  }

  return (
    <CatalogPage
      data={data}
      selectedCategoryId={normalizedSearchParams.category}
    />
  )
}
