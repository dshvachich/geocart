import type {
  Product,
  SearchCategory,
  SearchFiltersPageData,
  SearchPageData,
  SearchSortOption,
} from "@/domain/entities";
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

const toSearchProducts = (products: Product[]) =>
  products.map((product) => ({
    ...product,
    isNew: true,
  }));

const getSelectedCategoryId = (
  categories: SearchCategory[],
  categoryId?: string,
) =>
  categories.find((category) => category.selected)?.id ??
  categoryId;

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
      option.sort === (searchParams.sort ?? "price") &&
      option.sortOrder === (searchParams.sortOrder ?? "asc"),
  }));

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
    sort: searchParams.sort === "popularity" ? "popularity" : "price",
    sortOrder: searchParams.sortOrder === "desc" ? "desc" : "asc",
  });
};

export const getSearchPageData = async ({
  locale = DEFAULT_LOCALE,
  searchParams,
}: GetSearchPageDataParams): Promise<SearchPageData> => {
  const query = searchParams.q?.trim() ?? "";
  const result = await getSearchResult(searchParams, locale);
  const selectedCategoryId = getSelectedCategoryId(
    result.categories,
    searchParams.category,
  );
  const selectedCategory = getSelectedCategory(
    result.categories,
    selectedCategoryId,
  );

  return {
    activeFilters: getSearchActiveFilters(result.filters, searchRangeLabels[locale]),
    breadcrumbs: [],
    eyebrow: query ? searchResultEyebrows[locale] : "",
    filters: result.filters,
    products: toSearchProducts(
      withSearchCategory(result.products, selectedCategory),
    ),
    quickCategories: result.categories,
    selectedCategoryId,
    sortOptions: withSelectedSort(sortOptions, searchParams),
    title: result.title || selectedCategory?.label || query,
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
