import type {
  Category,
  Product,
  SearchBreadcrumb,
  SearchCategory,
  SearchFiltersPageData,
  SearchPageData,
  SearchResult,
  SearchSortOption,
} from "@/domain/entities";
import { findCategoryPath } from "@/domain/helpers/category-tree.helpers";
import { getSearchActiveFilters } from "@/domain/helpers/search-filter.helpers";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/domain/types/locale";
import { catalogRepository } from "@/data/repositories";
import {
  getSearchFilterParams,
  type SearchQueryParams,
} from "@/utils/search-query-utils";

const sortOptions: SearchSortOption[] = [
  {
    id: "popular",
    title: "Popular",
    sort: "popularity",
    sortOrder: "desc",
  },
  {
    id: "cheaper",
    title: "Cheaper",
    sort: "price",
    sortOrder: "asc",
  },
  {
    id: "highest-rating",
    title: "Highest rating",
    sort: "popularity",
    sortOrder: "asc",
  },
];

const searchResultEyebrows = {
  en: "Search results",
  ru: "Результаты поиска",
  ka: "ძიების შედეგები",
} satisfies Record<SupportedLocale, string>;

const searchRangeLabels = {
  en: {
    from: "From",
    to: "To",
  },
  ru: {
    from: "От",
    to: "До",
  },
  ka: {
    from: "დან",
    to: "მდე",
  },
} satisfies Record<SupportedLocale, { from: string; to: string }>;

type GetSearchPageDataParams = {
  locale?: SupportedLocale;
  searchParams: SearchQueryParams;
};

const PRODUCT_ID_SEARCH_PARAM = "productId";

const toSearchProducts = (products: Product[]) =>
  products.map((product) => ({
    ...product,
    isNew: true,
  }));

const toSearchBreadcrumbs = (
  categoryPath: Category[] | null,
): SearchBreadcrumb[] =>
  categoryPath?.map((category) => ({
    id: category.id,
    title: category.title,
  })) ?? [];

const getSelectedCategoryId = (
  categories: SearchCategory[],
  categoryId?: string,
) => categories.find((category) => category.selected)?.id ?? categoryId;

const getSelectedCategory = (
  categories: SearchCategory[],
  categoryId?: string,
) =>
  categories.find((category) => category.id === categoryId) ??
  categories.find((category) => category.selected);

const withSearchCategory = (
  products: Product[],
  category: SearchCategory | undefined,
) => {
  if (!category) {
    return products;
  }

  return products.map((product) =>
    product.category
      ? product
      : {
          ...product,
          category: {
            id: category.id,
            title: category.label,
          },
        },
  );
};

const withSelectedSort = (
  options: SearchSortOption[],
  searchParams: SearchQueryParams,
) =>
  options.map((option) => ({
    ...option,
    isSelected:
      option.sort === (searchParams.sort ?? "popularity") &&
      option.sortOrder === (searchParams.sortOrder ?? "desc"),
  }));

const withSuggestedProductFallback = async (
  result: SearchResult,
  searchParams: SearchQueryParams,
  locale: SupportedLocale,
): Promise<SearchResult> => {
  const productId = searchParams[PRODUCT_ID_SEARCH_PARAM]?.trim();

  if (result.products.length > 0 || !productId) {
    return result;
  }

  const productList = await catalogRepository.getProductsByIds({
    ids: [productId],
    limit: 1,
    locale,
  });

  if (productList.products.length === 0) {
    return result;
  }

  return {
    ...result,
    cursor: productList.cursor,
    products: productList.products,
  };
};

const getSearchResult = async (
  searchParams: SearchQueryParams,
  locale: SupportedLocale,
) => {
  const query = searchParams.q?.trim() ?? "";
  const category = searchParams.category;
  const filterParams = getSearchFilterParams(searchParams);

  return catalogRepository.getSearchProducts({
    category,
    cursor: searchParams.cursor,
    filters: filterParams,
    locale,
    query: query || undefined,
    sort: searchParams.sort === "price" ? "price" : "popularity",
    sortOrder: searchParams.sortOrder === "asc" ? "asc" : "desc",
  });
};

export const getSearchPageData = async ({
  locale = DEFAULT_LOCALE,
  searchParams,
}: GetSearchPageDataParams): Promise<SearchPageData> => {
  const query = searchParams.q?.trim() ?? "";
  const result = await withSuggestedProductFallback(
    await getSearchResult(searchParams, locale),
    searchParams,
    locale,
  );
  const selectedCategoryId = getSelectedCategoryId(
    result.categories,
    searchParams.category,
  );
  const selectedCategory = getSelectedCategory(
    result.categories,
    selectedCategoryId,
  );
  const categoryPath = selectedCategoryId
    ? findCategoryPath(
        await catalogRepository.getCategoryTree({ locale }),
        selectedCategoryId,
      )
    : null;
  const selectedCategoryFromPath = categoryPath?.[categoryPath.length - 1];

  return {
    activeFilters: getSearchActiveFilters(
      result.filters,
      searchRangeLabels[locale],
    ),
    breadcrumbs: toSearchBreadcrumbs(categoryPath),
    eyebrow: query ? searchResultEyebrows[locale] : "",
    filters: result.filters,
    hasMoreProducts: Boolean(result.cursor.next),
    products: toSearchProducts(
      withSearchCategory(result.products, selectedCategory),
    ),
    quickCategories: result.categories,
    selectedCategoryId,
    sortOptions: withSelectedSort(sortOptions, searchParams),
    title:
      result.title ||
      selectedCategory?.label ||
      selectedCategoryFromPath?.title ||
      query,
  };
};

export const getSearchFiltersPageData = async ({
  locale = DEFAULT_LOCALE,
  searchParams,
}: GetSearchPageDataParams): Promise<SearchFiltersPageData> => {
  const result = await getSearchResult(searchParams, locale);

  return {
    filters: result.filters,
    selectedCategoryId: getSelectedCategoryId(
      result.categories,
      searchParams.category,
    ),
  };
};
