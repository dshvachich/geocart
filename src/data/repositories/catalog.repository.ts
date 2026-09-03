import type { Product, SearchSuggestion } from '@/domain/entities'
import {
  listProducts,
  listSuggestions,
  searchProducts,
} from '@/data/openapi/endpoints/default/default'
import { geocartProducts, geocartSearchSuggestions } from '@/data/geocart-home'
import { ProductListItemToProductMapperExtension } from '@/data/mappers/product-list-item.mapper'
import { SearchSuggestionItemToSearchSuggestionMapperExtension } from '@/data/mappers/search-suggestion-item.mapper'

const DEFAULT_POPULAR_PRODUCTS_LIMIT = 12
const DEFAULT_CATALOG_PRODUCTS_LIMIT = 6
const DEFAULT_SUGGESTIONS_LIMIT = 6
const HOME_API_TIMEOUT_MS = 3500
const CATALOG_API_TIMEOUT_MS = 3500
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

type GetCatalogProductsParams = {
  category?: string
  fallbackProducts?: Product[]
  limit?: number
  query?: string
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

  async getCatalogProducts({
    category,
    fallbackProducts = geocartProducts,
    limit = DEFAULT_CATALOG_PRODUCTS_LIMIT,
    query,
  }: GetCatalogProductsParams = {}): Promise<Product[]> {
    const fallback = fallbackProducts.slice(0, limit)

    try {
      const response = await searchProducts(
        {
          category,
          limit,
          q: query,
        },
        {
          timeout: CATALOG_API_TIMEOUT_MS,
          headers: {
            'Accept-Locale': 'en',
          },
        },
      )

      const products = response.products.map((product, index) =>
        ProductListItemToProductMapperExtension.toEntity(
          product,
          fallbackProducts[index % fallbackProducts.length],
        ),
      )

      if (products.length > 0) {
        return products
      }
    } catch {
      return fallback
    }

    return fallback
  }
}

export const catalogRepository = new CatalogRepository()
