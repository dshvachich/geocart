import type {
  Category,
  Product,
  SearchResult,
  SearchSuggestion,
} from '@/domain/entities'
import type { SupportedLocale } from '@/domain/types/locale'

export type CatalogSort = 'popularity' | 'price'
export type CatalogSortOrder = 'asc' | 'desc'

export type CatalogLocaleParams = {
  locale?: SupportedLocale
}

export type GetCategoryTreeParams = CatalogLocaleParams

export type GetPopularProductsParams = {
  cursor?: string
  limit?: number
  locale?: SupportedLocale
  sort?: CatalogSort
  sortOrder?: CatalogSortOrder
}

export type GetSearchSuggestionsParams = {
  limit?: number
  locale?: SupportedLocale
  query: string
}

export type GetSearchProductsParams = {
  category?: string
  cursor?: string
  filters?: Record<string, string>
  limit?: number
  locale?: SupportedLocale
  query?: string
  sort?: CatalogSort
  sortOrder?: CatalogSortOrder
}

export interface CatalogRepository {
  getCategoryTree(params?: GetCategoryTreeParams): Promise<Category[]>
  getPopularProducts(params?: GetPopularProductsParams): Promise<Product[]>
  getSearchSuggestions(
    params: GetSearchSuggestionsParams,
  ): Promise<SearchSuggestion[]>
  getSearchProducts(params?: GetSearchProductsParams): Promise<SearchResult>
}
