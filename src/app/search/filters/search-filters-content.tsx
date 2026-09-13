import { notFound, redirect } from 'next/navigation'
import { SearchFiltersPage } from '@/app-shell/pages/search/search-filters-page'
import { getSearchFiltersPageData } from '@/data/search-page'
import { CatalogRequestError } from '@/domain/entities/catalog-request-error'
import type { SupportedLocale } from '@/domain/types/locale'
import {
  createSearchHref,
  SEARCH_FILTERS_PAGE_PATH,
  type SearchQueryParams,
} from '@/utils/search-query-utils'

type SearchFiltersContentProps = {
  locale: SupportedLocale
  searchParams: SearchQueryParams
}

export const SearchFiltersContent = async ({
  locale,
  searchParams,
}: SearchFiltersContentProps) => {
  const data = await getSearchFiltersPageData({ locale, searchParams }).catch(
    (error: unknown) => {
      if (error instanceof CatalogRequestError && error.kind === 'not-found') {
        notFound()
      }

      throw error
    },
  )

  if (!searchParams.category && data.selectedCategoryId) {
    redirect(
      createSearchHref(
        { ...searchParams, category: data.selectedCategoryId },
        SEARCH_FILTERS_PAGE_PATH,
      ),
    )
  }

  return <SearchFiltersPage data={data} searchParams={searchParams} />
}
