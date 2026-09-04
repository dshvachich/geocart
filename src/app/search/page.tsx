import { redirect } from 'next/navigation'
import { SearchPage } from '@/app-shell/pages/search/search-page'
import { getSearchPageData } from '@/data/search-page'
import {
  createSearchHref,
  normalizeSearchParams,
  type RouteSearchParams,
} from '@/utils/search-query-utils'

export const dynamic = 'force-dynamic'

type SearchRouteProps = {
  searchParams?: Promise<RouteSearchParams>
}

export default async function Search({ searchParams }: SearchRouteProps) {
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getSearchPageData({
    searchParams: normalizedSearchParams,
  })

  if (!normalizedSearchParams.category && data.selectedCategoryId) {
    redirect(
      createSearchHref({
        ...normalizedSearchParams,
        category: data.selectedCategoryId,
      }),
    )
  }

  return <SearchPage data={data} searchParams={normalizedSearchParams} />
}
