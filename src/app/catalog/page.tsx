import { CatalogPage } from '@/app-shell/pages/catalog/catalog-page'
import { getRequestLocale } from '@/app/locale'
import { getCatalogPageData } from '@/data/catalog-page'
import {
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

  return (
    <CatalogPage
      data={data}
      selectedCategoryId={normalizedSearchParams.category}
    />
  )
}
