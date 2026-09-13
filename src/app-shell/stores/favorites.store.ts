import { makeAutoObservable } from "mobx";
import type { Product } from "@/domain/entities";
import type { FavoritesRepository } from "@/domain/repositories";

export type FavoriteCategoryFilter = {
  id: string;
  title: string;
  count: number;
  isSelected: boolean;
};

const UNCATEGORIZED_CATEGORY = {
  id: "uncategorized",
  title: "Other",
} satisfies NonNullable<Product["category"]>;

const getProductCategory = (product: Product) =>
  product.category ?? UNCATEGORIZED_CATEGORY;

const toFavoriteProduct = (product: Product): Product => ({
  ...product,
  category: getProductCategory(product),
  isFavorite: true,
});

export class FavoritesStore {
  products: Product[] = [];
  selectedCategoryId?: string = undefined;
  isHydrated = false;

  constructor(private readonly favoritesRepository: FavoritesRepository) {
    makeAutoObservable<FavoritesStore, "favoritesRepository">(
      this,
      {
        favoritesRepository: false,
      },
      { autoBind: true },
    );
  }

  get count() {
    return this.products.length;
  }

  get categories(): FavoriteCategoryFilter[] {
    const categoriesById = new Map<
      string,
      {
        title: string;
        count: number;
      }
    >();

    this.products.forEach((product) => {
      const category = getProductCategory(product);
      const existingCategory = categoriesById.get(category.id);

      if (existingCategory) {
        existingCategory.count += 1;
        return;
      }

      categoriesById.set(category.id, {
        title: category.title,
        count: 1,
      });
    });

    return Array.from(categoriesById.entries()).map(([id, category]) => ({
      id,
      title: category.title,
      count: category.count,
      isSelected: id === this.selectedCategoryId,
    }));
  }

  get visibleProducts() {
    if (!this.activeCategoryId) {
      return this.products;
    }

    return this.products.filter(
      (product) => getProductCategory(product).id === this.activeCategoryId,
    );
  }

  private get activeCategoryId() {
    if (!this.selectedCategoryId) {
      return undefined;
    }

    return this.categories.some(
      (category) => category.id === this.selectedCategoryId,
    )
      ? this.selectedCategoryId
      : undefined;
  }

  hydrate() {
    if (this.isHydrated) {
      return;
    }

    this.products = this.favoritesRepository.getProducts();
    this.isHydrated = true;
    this.resetMissingSelectedCategory();
  }

  isFavorite(productId: Product["id"]) {
    return this.products.some((product) => product.id === productId);
  }

  toggleProduct(product: Product) {
    this.ensureHydrated();

    if (this.isFavorite(product.id)) {
      this.removeProduct(product.id);
      return;
    }

    this.products = [toFavoriteProduct(product), ...this.products];
    this.persistProducts();
  }

  removeProduct(productId: Product["id"]) {
    this.ensureHydrated();

    this.products = this.products.filter((product) => product.id !== productId);
    this.persistProducts();
  }

  toggleCategory(categoryId: string) {
    this.selectedCategoryId =
      this.selectedCategoryId === categoryId ? undefined : categoryId;
  }

  clearCategory() {
    this.selectedCategoryId = undefined;
  }

  syncFromStorage() {
    this.products = this.favoritesRepository.getProducts();
    this.resetMissingSelectedCategory();
    this.isHydrated = true;
  }

  private persistProducts() {
    this.resetMissingSelectedCategory();
    this.favoritesRepository.saveProducts(this.products);
  }

  private ensureHydrated() {
    if (this.isHydrated) {
      return;
    }

    this.hydrate();
  }

  private resetMissingSelectedCategory() {
    if (!this.selectedCategoryId) {
      return;
    }

    if (
      this.categories.some(
        (category) => category.id === this.selectedCategoryId,
      )
    ) {
      return;
    }

    this.selectedCategoryId = undefined;
  }
}
