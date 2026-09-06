import { makeAutoObservable, runInAction } from "mobx";
import type { HomePageData, PageCursor, Product } from "@/domain/entities";
import type { SupportedLocale } from "@/domain/types/locale";

type HomeProductsResponse = {
  cursor: PageCursor;
  products: Product[];
};

const HOME_PRODUCTS_PAGE_SIZE = "30";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isHomeProductsResponse = (
  value: unknown,
): value is HomeProductsResponse =>
  isRecord(value) && Array.isArray(value.products) && isRecord(value.cursor);

const createProductsUrl = (cursor: string, locale: SupportedLocale) => {
  const searchParams = new URLSearchParams({
    cursor,
    locale,
    limit: HOME_PRODUCTS_PAGE_SIZE,
  });

  return `/api/catalog/products?${searchParams.toString()}`;
};

export class HomePageStore {
  cursor: PageCursor;
  isLoadingMore = false;
  products: Product[];

  constructor(initialData: HomePageData) {
    this.cursor = initialData.cursor;
    this.products = initialData.products;

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
      const response = await fetch(createProductsUrl(nextCursor, locale));

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data: unknown = await response.json();

      if (!isHomeProductsResponse(data)) {
        throw new Error("Invalid products response");
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
}
