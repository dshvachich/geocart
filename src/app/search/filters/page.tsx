import { Suspense } from 'react'
import { SearchFiltersLoadingPage } from '@/app-shell/pages/search/search-filters-loading-page'
import { getRequestLocale } from '@/app/locale'
import { SearchFiltersContent } from './search-filters-content'
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

  return (
    <Suspense
      key={createSearchHref(normalizedSearchParams, SEARCH_FILTERS_PAGE_PATH)}
      fallback={<SearchFiltersLoadingPage searchParams={normalizedSearchParams} />}
    >
      <SearchFiltersContent locale={locale} searchParams={normalizedSearchParams} />
    </Suspense>
  )
}
