import { redirect } from 'next/navigation'
import { FiltersPage } from '@/app-shell/pages/search/filters-page'
import { getSearchFiltersPageData } from '@/data/search-page'
import {
  createSearchHref,
  normalizeSearchParams,
  SEARCH_FILTERS_PAGE_PATH,
  type RouteSearchParams,
} from '@/utils/search-query-utils'

export const dynamic = 'force-dynamic'

type SearchFiltersRouteProps = {
  searchParams?: Promise<RouteSearchParams>
}

export default async function SearchFilters({
  searchParams,
}: SearchFiltersRouteProps) {
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getSearchFiltersPageData({
    searchParams: normalizedSearchParams,
  })

  if (!normalizedSearchParams.category && data.selectedCategoryId) {
    redirect(
      createSearchHref(
        {
          ...normalizedSearchParams,
          category: data.selectedCategoryId,
        },
        SEARCH_FILTERS_PAGE_PATH,
      ),
    )
  }

  return <FiltersPage data={data} searchParams={normalizedSearchParams} />
}
