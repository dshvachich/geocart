import type {
  Category,
  ProductListResult,
  SearchResult,
  SearchSuggestion,
} from "@/domain/entities";
import type {
  CatalogRepository,
  GetCategoryTreeParams,
  GetPopularProductsParams,
  GetProductsByIdsParams,
  GetSearchProductsParams,
  GetSearchSuggestionsParams,
} from "@/domain/repositories";
import type { SearchProductsParams, SearchResponse } from "@/data/openapi/models";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/domain/types/locale";
import {
  listCategories,
  getProduct as fetchProduct,
  listProducts,
  listSuggestions,
  searchProducts as fetchSearchProducts,
} from "@/data/openapi/endpoints/default/default";
import { CategoryDtoToCategoryEntityMapperExtension } from "@/data/mappers/category.mapper";
import { ProductListItemToProductMapperExtension } from "@/data/mappers/product-list-item.mapper";
import { SearchResponseDtoToSearchResultEntityMapperExtension } from "@/data/mappers/search-response.mapper";
import { SearchSuggestionDtoToSearchSuggestionMapperExtension } from "@/data/mappers/search-suggestion.mapper";
import { rethrowCatalogRequestError } from "@/data/repositories/catalog-error";
import { ProductDtoToProductDetailsMapperExtension } from '@/data/mappers/product-details.mapper';
import type { CatalogLocaleParams } from '@/domain/repositories/catalog.repository';

const DEFAULT_POPULAR_PRODUCTS_LIMIT = 30;
const DEFAULT_POPULAR_PRODUCTS_SORT = "popularity";
const DEFAULT_POPULAR_PRODUCTS_SORT_ORDER = "desc";
const DEFAULT_SEARCH_PRODUCTS_LIMIT = 30;
const DEFAULT_SUGGESTIONS_LIMIT = 6;
const EMPTY_CURSOR = {
  next: null,
} as const;
const CATEGORIES_API_TIMEOUT_MS = 3500;
const HOME_API_TIMEOUT_MS = 3500;
const SEARCH_API_TIMEOUT_MS = 3500;
const SUGGESTIONS_API_TIMEOUT_MS = 2500;
const PRODUCT_API_TIMEOUT_MS = 5000;

const getLocaleHeaders = (locale: SupportedLocale = DEFAULT_LOCALE) => ({
  "Accept-Locale": locale,
});

const createEmptyProductListResult = (): ProductListResult => ({
  cursor: EMPTY_CURSOR,
  products: [],
});

const createEmptySearchResult = (): SearchResult => ({
  title: "",
  products: [],
  filters: [],
  categories: [],
  cursor: EMPTY_CURSOR,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSearchResponse = (value: unknown): value is SearchResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.title === "string" &&
    Array.isArray(value.products) &&
    Array.isArray(value.filters) &&
    Array.isArray(value.categories) &&
    isRecord(value.cursor)
  );
};

class CatalogApiRepository implements CatalogRepository {
  async getProduct(slug: string, { locale }: CatalogLocaleParams = {}) {
    try {
      const product = await fetchProduct(encodeURIComponent(slug), {
        timeout: PRODUCT_API_TIMEOUT_MS,
        headers: getLocaleHeaders(locale),
      });
      return ProductDtoToProductDetailsMapperExtension.toEntity(product);
    } catch (error) {
      rethrowCatalogRequestError(error);
      throw error;
    }
  }

  async getCategoryTree({ locale }: GetCategoryTreeParams = {}): Promise<
    Category[]
  > {
    try {
      const categories = await listCategories({
        timeout: CATEGORIES_API_TIMEOUT_MS,
        headers: getLocaleHeaders(locale),
      });

      const categoryTree = categories.map((category) =>
        CategoryDtoToCategoryEntityMapperExtension.toEntity(category),
      );

      if (categoryTree.length > 0) {
        return categoryTree;
      }
    } catch (error) {
      rethrowCatalogRequestError(error);
      return [];
    }

    return [];
  }

  async getPopularProducts({
    cursor,
    limit = DEFAULT_POPULAR_PRODUCTS_LIMIT,
    locale,
    sort = DEFAULT_POPULAR_PRODUCTS_SORT,
    sortOrder = DEFAULT_POPULAR_PRODUCTS_SORT_ORDER,
  }: GetPopularProductsParams = {}): Promise<ProductListResult> {
    try {
      const response = await listProducts(
        {
          cursor,
          limit,
          sort,
          sortOrder,
        },
        {
          timeout: HOME_API_TIMEOUT_MS,
          headers: getLocaleHeaders(locale),
        },
      );

      const products =
        response.products?.map((product) =>
          ProductListItemToProductMapperExtension.toEntity(product),
        ) ?? [];

      return {
        cursor: response.cursor ?? EMPTY_CURSOR,
        products,
      };
    } catch (error) {
      rethrowCatalogRequestError(error);
      return createEmptyProductListResult();
    }
  }

  async getProductsByIds({
    ids,
    limit = ids.length,
    locale,
  }: GetProductsByIdsParams): Promise<ProductListResult> {
    if (ids.length === 0) {
      return createEmptyProductListResult();
    }

    try {
      const response = await listProducts(
        {
          ids,
          limit,
        },
        {
          timeout: HOME_API_TIMEOUT_MS,
          headers: getLocaleHeaders(locale),
        },
      );

      const products =
        response.products?.map((product) =>
          ProductListItemToProductMapperExtension.toEntity(product),
        ) ?? [];

      return {
        cursor: response.cursor ?? EMPTY_CURSOR,
        products,
      };
    } catch (error) {
      rethrowCatalogRequestError(error);
      return createEmptyProductListResult();
    }
  }

  async getSearchSuggestions({
    query,
    limit = DEFAULT_SUGGESTIONS_LIMIT,
    locale,
  }: GetSearchSuggestionsParams): Promise<SearchSuggestion[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return [];
    }

    try {
      const response = await listSuggestions(
        {
          q: trimmedQuery,
          limit,
        },
        {
          timeout: SUGGESTIONS_API_TIMEOUT_MS,
          headers: getLocaleHeaders(locale),
        },
      );

      return SearchSuggestionDtoToSearchSuggestionMapperExtension.toEntity(
        response,
      );
    } catch (error) {
      rethrowCatalogRequestError(error);
      return [];
    }
  }

  async getSearchProducts({
    category,
    cursor,
    filters = {},
    limit = DEFAULT_SEARCH_PRODUCTS_LIMIT,
    locale,
    query,
    sort,
    sortOrder,
  }: GetSearchProductsParams = {}): Promise<SearchResult> {
    const params: SearchProductsParams = {
      f: filters,
      category,
      cursor,
      limit,
      q: query,
      sort,
      sortOrder,
    };

    try {
      const response: unknown = await fetchSearchProducts(params, {
        timeout: SEARCH_API_TIMEOUT_MS,
        headers: getLocaleHeaders(locale),
      });

      if (!isSearchResponse(response)) {
        return createEmptySearchResult();
      }

      return SearchResponseDtoToSearchResultEntityMapperExtension.toEntity(
        response,
      );
    } catch (error) {
      rethrowCatalogRequestError(error);
      return createEmptySearchResult();
    }
  }
}

export const catalogRepository = new CatalogApiRepository();
