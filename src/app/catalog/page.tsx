import { CatalogPage } from '@/app-shell/pages/catalog/catalog-page'
import { getCatalogPageData } from '@/data/catalog-page'
import {
  normalizeSearchParams,
  type RouteSearchParams,
} from '@/utils/search-query-utils'

export const dynamic = 'force-dynamic'

type CatalogRouteProps = {
  searchParams?: Promise<RouteSearchParams>
}

export default async function Catalog({ searchParams }: CatalogRouteProps) {
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getCatalogPageData()

  return (
    <CatalogPage
      data={data}
      selectedCategoryId={normalizedSearchParams.category}
    />
  )
}
