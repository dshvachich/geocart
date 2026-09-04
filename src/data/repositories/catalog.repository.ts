import type { Product, SearchResult, SearchSuggestion } from '@/domain/entities'
import {
  listProducts,
  listSuggestions,
  searchProducts as fetchSearchProducts,
} from '@/data/openapi/endpoints/default/default'
import type {
  SearchProductsParams,
  SearchProductsSort,
  SearchProductsSortOrder,
} from '@/data/openapi/models'
import { geocartProducts, geocartSearchSuggestions } from '@/data/geocart-home'
import { ProductListItemToProductMapperExtension } from '@/data/mappers/product-list-item.mapper'
import { SearchResponseDtoToSearchResultEntityMapperExtension } from '@/data/mappers/search-response.mapper'
import { SearchSuggestionItemToSearchSuggestionMapperExtension } from '@/data/mappers/search-suggestion-item.mapper'

const DEFAULT_POPULAR_PRODUCTS_LIMIT = 12
const DEFAULT_SEARCH_PRODUCTS_LIMIT = 6
const DEFAULT_SUGGESTIONS_LIMIT = 6
const HOME_API_TIMEOUT_MS = 3500
const SEARCH_API_TIMEOUT_MS = 3500
const SUGGESTIONS_API_TIMEOUT_MS = 2500
const WHITE_QUERY_SUGGESTION_IDS = [
  'monitor-asus-rog-strix-white',
  'palit-geforce-rtx-white',
  'gigabyte-b850m-aorus-ice',
  'white-smartphones',
  'white-gaming-consoles',
  'white-laptops',
]
const PLAYSTATION_QUERY_SUGGESTION_IDS = [
  'playstation-5-slim-1tb-white',
  'playstation-ps5-slim-digital-white',
  'playstation-5-slim-1tb-white-repeat',
  'playstation-games',
  'playstation-gaming-consoles',
  'playstation-accessories',
]

type GetPopularProductsParams = {
  limit?: number
  page?: number
}

type GetSearchSuggestionsParams = {
  query: string
  limit?: number
}

type SearchProductsDynamicParams = SearchProductsParams &
  Record<string, string | number | undefined>

type GetSearchProductsParams = {
  category?: string
  filters?: Record<string, string>
  fallbackResult?: SearchResult
  fallbackProducts?: Product[]
  limit?: number
  query?: string
  sort?: SearchProductsSort
  sortOrder?: SearchProductsSortOrder
}

const getSuggestionsByIds = (ids: string[], limit: number) =>
  ids
    .map((id) =>
      geocartSearchSuggestions.find((suggestion) => suggestion.id === id),
    )
    .filter((suggestion): suggestion is SearchSuggestion => Boolean(suggestion))
    .slice(0, limit)

const getFallbackSuggestions = (query: string, limit: number) => {
  const normalizedQuery = query.toLowerCase()

  if (normalizedQuery.startsWith('white')) {
    return getSuggestionsByIds(WHITE_QUERY_SUGGESTION_IDS, limit)
  }

  if (normalizedQuery.includes('playstation')) {
    return getSuggestionsByIds(PLAYSTATION_QUERY_SUGGESTION_IDS, limit)
  }

  return geocartSearchSuggestions
    .filter((suggestion) =>
      (suggestion.label ?? suggestion.id)
        .toLowerCase()
        .includes(normalizedQuery),
    )
    .slice(0, limit)
}

class CatalogRepository {
  async getPopularProducts({
    limit = DEFAULT_POPULAR_PRODUCTS_LIMIT,
    page = 0,
  }: GetPopularProductsParams = {}): Promise<Product[]> {
    try {
      const response = await listProducts(
        {
          limit,
          page,
        },
        {
          timeout: HOME_API_TIMEOUT_MS,
          headers: {
            'Accept-Locale': 'en',
          },
        },
      )

      const products =
        response.products?.map((product, index) =>
          ProductListItemToProductMapperExtension.toEntity(
            product,
            geocartProducts[index % geocartProducts.length],
          ),
        ) ?? []

      if (products.length > 0) {
        return products
      }
    } catch {
      return geocartProducts
    }

    return geocartProducts
  }

  async getSearchSuggestions({
    query,
    limit = DEFAULT_SUGGESTIONS_LIMIT,
  }: GetSearchSuggestionsParams): Promise<SearchSuggestion[]> {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return []
    }

    try {
      const response = await listSuggestions(
        {
          q: trimmedQuery,
          limit,
        },
        {
          timeout: SUGGESTIONS_API_TIMEOUT_MS,
          headers: {
            'Accept-Locale': 'en',
          },
        },
      )

      const suggestions =
        response.suggestions?.map((suggestion) =>
          SearchSuggestionItemToSearchSuggestionMapperExtension.toEntity(
            suggestion,
          ),
        ) ?? []

      if (suggestions.length > 0) {
        return suggestions
      }
    } catch {
      return getFallbackSuggestions(trimmedQuery, limit)
    }

    return getFallbackSuggestions(trimmedQuery, limit)
  }

  async getSearchProducts({
    category,
    filters = {},
    fallbackResult,
    fallbackProducts = geocartProducts,
    limit = DEFAULT_SEARCH_PRODUCTS_LIMIT,
    query,
    sort,
    sortOrder,
  }: GetSearchProductsParams = {}): Promise<SearchResult> {
    const fallback =
      fallbackResult ??
      ({
        title: '',
        products: fallbackProducts.slice(0, limit),
        filters: [],
        categories: [],
        next: null,
      } satisfies SearchResult)
    const params: SearchProductsDynamicParams = {
      ...filters,
      category,
      limit,
      q: query,
      sort,
      sortOrder,
    }

    try {
      const response = await fetchSearchProducts(
        params,
        {
          timeout: SEARCH_API_TIMEOUT_MS,
          headers: {
            'Accept-Locale': 'en',
          },
        },
      )

      return SearchResponseDtoToSearchResultEntityMapperExtension.toEntity(
        response,
        fallbackProducts,
      )
    } catch {
      return fallback
    }
  }
}

export const catalogRepository = new CatalogRepository()
