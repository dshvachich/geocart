import { redirect } from 'next/navigation'
import { SearchFiltersPage } from '@/app-shell/pages/search/search-filters-page'
import { getRequestLocale } from '@/app/locale'
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

export default async function SearchFiltersRoute({
  searchParams,
}: SearchFiltersRouteProps) {
  const locale = await getRequestLocale()
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getSearchFiltersPageData({
    locale,
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

  return <SearchFiltersPage data={data} searchParams={normalizedSearchParams} />
}
