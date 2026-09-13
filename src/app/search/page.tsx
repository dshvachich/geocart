import { notFound, redirect } from 'next/navigation'
import { CatalogRequestError } from '@/domain/entities/catalog-request-error'
import { SearchPage } from '@/app-shell/pages/search/search-page'
import { getRequestLocale } from '@/app/locale'
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

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const locale = await getRequestLocale()
  const normalizedSearchParams = normalizeSearchParams(await searchParams)
  const data = await getSearchPageData({
    locale,
    searchParams: normalizedSearchParams,
  }).catch((error: unknown) => {
    if (error instanceof CatalogRequestError && error.kind === 'not-found') {
      notFound()
    }

    throw error
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
