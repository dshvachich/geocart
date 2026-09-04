import type {
  Product,
  SearchBreadcrumb,
  SearchCategory,
  SearchFilter,
  SearchFiltersPageData,
  SearchPageData,
  SearchResult,
  SearchSortOption,
} from "@/domain/entities";
import { getSearchActiveFilters } from "@/domain/helpers/search-filter.helpers";
import { catalogRepository } from "@/data/repositories";
import { geocartProducts } from "@/data/geocart-home";
import {
  getSearchFilterParams,
  type SearchQueryParams,
} from "@/utils/search-query-utils";

const asset = (name: string) => `/assets/geocart/${name}`;

export const DEFAULT_SEARCH_CATEGORY_ID = "mobile-phones";

const fallbackBreadcrumbs: SearchBreadcrumb[] = [
  {
    id: "mobile-wearables",
    title: "Mobile & Wearables",
  },
  {
    id: "mobile-phones",
    title: "Mobile Phones",
  },
  {
    id: "apple",
    title: "Apple",
  },
];

const fallbackCategories: SearchCategory[] = [
  {
    id: "mobile-phones",
    label: "Mobile Phones",
    imageSrc: asset("product-iphone-17-blue.png"),
    selected: true,
  },
  {
    id: "headphones",
    label: "Headphones",
    imageSrc: asset("product-airpods-max.png"),
    selected: false,
  },
  {
    id: "cases",
    label: "Cases",
    imageSrc: asset("product-iphone-17-lavender.png"),
    selected: false,
  },
];

const fallbackFilters: SearchFilter[] = [
  {
    id: "price",
    label: "Price, ₾",
    type: "range",
    min: 0,
    max: 5254,
    selectedMin: 0,
    selectedMax: 5254,
  },
  {
    id: "brand",
    label: "Brand",
    type: "checkbox",
    variants: [
      {
        value: "Apple",
        label: "Apple",
        selected: false,
      },
      {
        value: "Samsung",
        label: "Samsung",
        selected: false,
      },
      {
        value: "Google",
        label: "Google",
        selected: false,
      },
      {
        value: "Xiaomi",
        label: "Xiaomi",
        selected: false,
      },
      {
        value: "Honor",
        label: "Honor",
        selected: false,
      },
    ],
  },
  {
    id: "ram",
    label: "RAM",
    type: "checkbox",
    variants: [
      "2 GB",
      "3 GB",
      "4 GB",
      "6 GB",
      "8 GB",
      "12 GB",
      "16 GB",
      "20 GB",
    ].map((value) => ({
      value,
      label: value,
      selected: false,
    })),
  },
  {
    id: "memory",
    label: "Memory",
    type: "checkbox",
    variants: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"].map((value) => ({
      value,
      label: value,
      selected: false,
    })),
  },
  {
    id: "display-size",
    label: "Display size",
    type: "collapsed",
  },
  {
    id: "screen",
    label: "Screen",
    type: "collapsed",
  },
  {
    id: "refresh-rate",
    label: "Refresh rate",
    type: "range",
    min: 60,
    max: 120,
    selectedMin: 60,
    selectedMax: 120,
  },
  {
    id: "color",
    label: "Color",
    type: "collapsed",
  },
  {
    id: "os",
    label: "OS",
    type: "collapsed",
  },
  {
    id: "ip-protection",
    label: "IP Protection",
    type: "collapsed",
  },
];

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

type GetSearchPageDataParams = {
  searchParams: SearchQueryParams;
};

const getFallbackTitle = (query: string) => {
  if (query) {
    return `${query} in Tbilisi`;
  }

  return "Apple Mobile Phones in Tbilisi";
};

const toSearchProducts = (products: Product[]) =>
  products.map((product) => ({
    ...product,
    isNew: true,
  }));

const parseRangeFilterParam = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const [selectedMin, selectedMax] = value.split("-").map(Number);

  if (!Number.isFinite(selectedMin) || !Number.isFinite(selectedMax)) {
    return undefined;
  }

  return {
    selectedMin,
    selectedMax,
  };
};

const getFallbackFilters = (filterParams: Record<string, string>) =>
  fallbackFilters.map((filter): SearchFilter => {
    const paramValue = filterParams[filter.id];

    if (filter.type === "range") {
      const range = parseRangeFilterParam(paramValue);

      if (!range) {
        return filter;
      }

      return {
        ...filter,
        selectedMin: range.selectedMin,
        selectedMax: range.selectedMax,
      };
    }

    if (filter.type === "collapsed") {
      return filter;
    }

    const selectedValues = paramValue
      ? paramValue.split(",").map((value) => value.trim())
      : [];

    return {
      ...filter,
      variants: filter.variants.map((variant) => ({
        ...variant,
        selected: selectedValues.includes(variant.value),
      })),
    };
  });

const getFallbackSearchResult = ({
  categoryId,
  filterParams,
  query,
}: {
  categoryId?: string;
  filterParams: Record<string, string>;
  query: string;
}): SearchResult => ({
  title: getFallbackTitle(query),
  products: geocartProducts.slice(0, 6),
  filters: getFallbackFilters(filterParams),
  categories: fallbackCategories.map((category) => ({
    ...category,
    selected: category.id === (categoryId ?? DEFAULT_SEARCH_CATEGORY_ID),
  })),
  next: null,
});

const getSelectedCategoryId = (
  categories: SearchCategory[],
  categoryId?: string,
) =>
  categories.find((category) => category.selected)?.id ??
  categoryId ??
  DEFAULT_SEARCH_CATEGORY_ID;

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

const getSearchResult = async (searchParams: SearchQueryParams) => {
  const query = searchParams.q?.trim() ?? "";
  const category =
    searchParams.category ?? (query ? undefined : DEFAULT_SEARCH_CATEGORY_ID);
  const filterParams = getSearchFilterParams(searchParams);

  return catalogRepository.getSearchProducts({
    category,
    fallbackProducts: geocartProducts,
    fallbackResult: getFallbackSearchResult({
      categoryId: category,
      filterParams,
      query,
    }),
    filters: filterParams,
    query: query || undefined,
    sort: searchParams.sort === "popularity" ? "popularity" : "price",
    sortOrder: searchParams.sortOrder === "desc" ? "desc" : "asc",
  });
};

export const getSearchPageData = async ({
  searchParams,
}: GetSearchPageDataParams): Promise<SearchPageData> => {
  const query = searchParams.q?.trim() ?? "";
  const result = await getSearchResult(searchParams);
  const selectedCategoryId = getSelectedCategoryId(
    result.categories,
    searchParams.category,
  );
  const selectedCategory = getSelectedCategory(
    result.categories,
    selectedCategoryId,
  );

  return {
    activeFilters: getSearchActiveFilters(result.filters),
    breadcrumbs: query ? [] : fallbackBreadcrumbs,
    eyebrow: query ? "Search results" : "",
    filters: result.filters,
    products: toSearchProducts(
      withSearchCategory(result.products, selectedCategory),
    ),
    quickCategories: result.categories,
    selectedCategoryId,
    sortOptions: withSelectedSort(sortOptions, searchParams),
    title: result.title || getFallbackTitle(query),
  };
};

export const getSearchFiltersPageData = async ({
  searchParams,
}: GetSearchPageDataParams): Promise<SearchFiltersPageData> => {
  const result = await getSearchResult(searchParams);

  return {
    filters: result.filters,
    selectedCategoryId: getSelectedCategoryId(
      result.categories,
      searchParams.category,
    ),
  };
};
