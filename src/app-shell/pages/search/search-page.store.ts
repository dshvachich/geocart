import { makeAutoObservable, runInAction } from "mobx";
import type { PageCursor, Product, SearchPageData } from "@/domain/entities";
import type { SupportedLocale } from "@/domain/types/locale";
import type { SearchQueryParams } from "@/utils/search-query-utils";

type SearchProductsResponse = {
  cursor: PageCursor;
  products: Product[];
};

const SEARCH_PRODUCTS_PAGE_SIZE = "30";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSearchProductsResponse = (
  value: unknown,
): value is SearchProductsResponse =>
  isRecord(value) && Array.isArray(value.products) && isRecord(value.cursor);

const createSearchProductsUrl = ({
  cursor,
  locale,
  searchParams,
}: {
  cursor: string;
  locale: SupportedLocale;
  searchParams: SearchQueryParams;
}) => {
  const nextSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value?.trim()) {
      nextSearchParams.set(key, value);
    }
  });

  nextSearchParams.set("cursor", cursor);
  nextSearchParams.set("limit", SEARCH_PRODUCTS_PAGE_SIZE);
  nextSearchParams.set("locale", locale);

  return `/api/catalog/search?${nextSearchParams.toString()}`;
};

export class SearchPageStore {
  cursor: PageCursor;
  isLoadingMore = false;
  isSortOpen = false;
  products: Product[];
  private readonly searchParams: SearchQueryParams;

  constructor(initialData: SearchPageData, searchParams: SearchQueryParams) {
    this.cursor = initialData.cursor;
    this.products = initialData.products;
    this.searchParams = searchParams;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get hasMoreProducts() {
    return Boolean(this.cursor.next);
  }

  async loadMoreProducts(locale: SupportedLocale) {
    const nextCursor = this.cursor.next;

    if (!nextCursor || this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;

    try {
      const response = await fetch(
        createSearchProductsUrl({
          cursor: nextCursor,
          locale,
          searchParams: this.searchParams,
        }),
      );

      if (!response.ok) {
        throw new Error("Failed to load search products");
      }

      const data: unknown = await response.json();

      if (!isSearchProductsResponse(data)) {
        throw new Error("Invalid search products response");
      }

      runInAction(() => {
        this.cursor = data.cursor;
        this.products = [...this.products, ...data.products];
      });
    } catch {
      runInAction(() => {
        this.cursor = {
          ...this.cursor,
          next: null,
        };
      });
    } finally {
      runInAction(() => {
        this.isLoadingMore = false;
      });
    }
  }

  openSort() {
    this.isSortOpen = true;
  }

  closeSort() {
    this.isSortOpen = false;
  }
}
