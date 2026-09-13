import { NextResponse } from 'next/server'
import { createCatalogErrorResponse } from '@/app/api/catalog-error-response'
import { getSearchProductsPageData } from '@/data/search-page'
import { normalizeLocale } from '@/domain/types/locale'
import type { SearchQueryParams } from '@/utils/search-query-utils'

export const dynamic = 'force-dynamic'

const LOCALE_SEARCH_PARAM = 'locale'

const toSearchQueryParams = (url: URL): SearchQueryParams => {
  const searchParams: SearchQueryParams = {}

  url.searchParams.forEach((value, key) => {
    const normalizedValue = value.trim()

    if (!normalizedValue || key === LOCALE_SEARCH_PARAM) {
      return
    }

    searchParams[key] = normalizedValue
  })

  return searchParams
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale = normalizeLocale(
    url.searchParams.get(LOCALE_SEARCH_PARAM) ??
      request.headers.get('accept-language'),
  )

  try {
    const productList = await getSearchProductsPageData({
      locale,
      searchParams: toSearchQueryParams(url),
    })

    return NextResponse.json(productList)
  } catch (error) {
    return createCatalogErrorResponse(error)
  }
}
