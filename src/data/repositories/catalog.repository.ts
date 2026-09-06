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
import type { SearchResponseResponse } from "@/data/openapi/models";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/domain/types/locale";
import {
  listCategories,
  listProducts,
  listSuggestions,
  searchProducts as fetchSearchProducts,
} from "@/data/openapi/endpoints/default/default";
import { CategoryDtoToCategoryEntityMapperExtension } from "@/data/mappers/category.mapper";
import { ProductListItemToProductMapperExtension } from "@/data/mappers/product-list-item.mapper";
import { SearchResponseDtoToSearchResultEntityMapperExtension } from "@/data/mappers/search-response.mapper";
import { SearchSuggestionItemToSearchSuggestionMapperExtension } from "@/data/mappers/search-suggestion-item.mapper";

const DEFAULT_POPULAR_PRODUCTS_LIMIT = 30;
const DEFAULT_POPULAR_PRODUCTS_SORT = "popularity";
const DEFAULT_POPULAR_PRODUCTS_SORT_ORDER = "desc";
const DEFAULT_SEARCH_PRODUCTS_LIMIT = 6;
const DEFAULT_SUGGESTIONS_LIMIT = 6;
const EMPTY_CURSOR = {
  next: null,
  prev: null,
} as const;
const CATEGORIES_API_TIMEOUT_MS = 3500;
const HOME_API_TIMEOUT_MS = 3500;
const SEARCH_API_TIMEOUT_MS = 3500;
const SUGGESTIONS_API_TIMEOUT_MS = 2500;

type SearchProductsDynamicParams = Record<string, string | number | undefined>;

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

const isSearchResponse = (value: unknown): value is SearchResponseResponse => {
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
    } catch {
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
    } catch {
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
    } catch {
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

      const suggestions =
        response.suggestions?.map((suggestion) =>
          SearchSuggestionItemToSearchSuggestionMapperExtension.toEntity(
            suggestion,
          ),
        ) ?? [];

      if (suggestions.length > 0) {
        return suggestions;
      }
    } catch {
      return [];
    }

    return [];
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
    const params: SearchProductsDynamicParams = {
      ...filters,
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
    } catch {
      return createEmptySearchResult();
    }
  }
}

export const catalogRepository = new CatalogApiRepository();
