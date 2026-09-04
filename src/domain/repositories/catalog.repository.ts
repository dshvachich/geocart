import type { Product, SearchResult, SearchSuggestion } from '@/domain/entities'

export type CatalogSort = 'popularity' | 'price'
export type CatalogSortOrder = 'asc' | 'desc'

export type GetPopularProductsParams = {
  limit?: number
  page?: number
}

export type GetSearchSuggestionsParams = {
  query: string
  limit?: number
}

export type GetSearchProductsParams = {
  category?: string
  filters?: Record<string, string>
  fallbackResult?: SearchResult
  fallbackProducts?: Product[]
  limit?: number
  query?: string
  sort?: CatalogSort
  sortOrder?: CatalogSortOrder
}

export interface CatalogRepository {
  getPopularProducts(params?: GetPopularProductsParams): Promise<Product[]>
  getSearchSuggestions(
    params: GetSearchSuggestionsParams,
  ): Promise<SearchSuggestion[]>
  getSearchProducts(params?: GetSearchProductsParams): Promise<SearchResult>
}
