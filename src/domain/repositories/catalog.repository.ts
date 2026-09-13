import type {
  Category,
  ProductListResult,
  SearchResult,
  SearchSuggestion,
} from "@/domain/entities";
import type { SupportedLocale } from "@/domain/types/locale";
import type { ProductDetails } from '@/domain/entities/product-details';

export type CatalogSort = "popularity" | "price";
export type CatalogSortOrder = "asc" | "desc";

export type CatalogLocaleParams = {
  locale?: SupportedLocale;
};

export type GetCategoryTreeParams = CatalogLocaleParams;

export type GetPopularProductsParams = {
  cursor?: string;
  limit?: number;
  locale?: SupportedLocale;
  sort?: CatalogSort;
  sortOrder?: CatalogSortOrder;
};

export type GetProductsByIdsParams = CatalogLocaleParams & {
  ids: number[];
  limit?: number;
};

export type GetSearchSuggestionsParams = {
  limit?: number;
  locale?: SupportedLocale;
  query: string;
};

export type GetSearchProductsParams = {
  category?: string;
  cursor?: string;
  filters?: Record<string, string>;
  limit?: number;
  locale?: SupportedLocale;
  query?: string;
  sort?: CatalogSort;
  sortOrder?: CatalogSortOrder;
};

export interface CatalogRepository {
  getProduct(slug: string, params?: CatalogLocaleParams): Promise<ProductDetails>;
  getCategoryTree(params?: GetCategoryTreeParams): Promise<Category[]>;
  getPopularProducts(
    params?: GetPopularProductsParams,
  ): Promise<ProductListResult>;
  getProductsByIds(params: GetProductsByIdsParams): Promise<ProductListResult>;
  getSearchSuggestions(
    params: GetSearchSuggestionsParams,
  ): Promise<SearchSuggestion[]>;
  getSearchProducts(params?: GetSearchProductsParams): Promise<SearchResult>;
}
