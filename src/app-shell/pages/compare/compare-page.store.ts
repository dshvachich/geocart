import { comparer, makeAutoObservable, reaction, runInAction } from "mobx";
import type { ComparisonStore } from "@/app-shell/stores/comparison.store";
import type { ComparisonProduct } from "@/domain/entities/comparison";
import type { SupportedLocale } from "@/domain/types/locale";
import {
  getComparisonCategories,
  getComparisonCategory,
  getComparisonGroups,
} from "@/domain/helpers/comparison.helpers";
import { browserComparisonProductsRepository } from "@/data/repositories/browser-comparison-products.repository";

export class ComparePageStore {
  selectedCategoryId: string | null = null;
  differencesOnly = false;
  collapsedGroups = new Set<string>();
  loadedProducts: ComparisonProduct[] = [];
  unavailableIds: number[] = [];
  failedIds: number[] = [];
  isLoading = false;
  private requestVersion = 0;

  constructor(
    readonly comparison: ComparisonStore,
    private readonly locale: SupportedLocale,
  ) {
    makeAutoObservable(this, { comparison: false }, { autoBind: true });
  }
  get categories() {
    return getComparisonCategories(this.loadedProducts);
  }
  get activeCategory() {
    return (
      this.categories.find(
        (category) => category.id === this.selectedCategoryId,
      ) ?? this.categories[0]
    );
  }
  get isCategoryOpen() {
    return (
      this.selectedCategoryId !== null &&
      this.categories.some(
        (category) => category.id === this.selectedCategoryId,
      )
    );
  }
  get products() {
    return this.loadedProducts.filter(
      (product) =>
        getComparisonCategory(product).id === this.activeCategory?.id,
    );
  }
  get groups() {
    return getComparisonGroups(this.products)
      .map((group) => ({
        ...group,
        rows: this.differencesOnly
          ? group.rows.filter((row) => row.isDifferent)
          : group.rows,
      }))
      .filter((group) => group.rows.length > 0);
  }
  watchProducts() {
    this.comparison.hydrate();
    const dispose = reaction(
      () => this.comparison.productIds.slice(),
      () => {
        void this.loadProducts();
      },
      { fireImmediately: true, equals: comparer.structural },
    );
    return () => {
      dispose();
      this.cancelPendingRequest();
    };
  }
  private cancelPendingRequest() {
    this.requestVersion += 1;
  }
  async loadProducts() {
    const version = ++this.requestVersion;
    const ids = this.comparison.productIds.slice();
    this.loadedProducts = this.loadedProducts.filter((product) =>
      ids.includes(product.id),
    );
    this.unavailableIds = [];
    this.failedIds = [];
    this.isLoading = ids.length > 0;
    if (!ids.length) {
      this.selectedCategoryId = null;
      return;
    }
    const result = await browserComparisonProductsRepository.getProducts(
      ids,
      this.locale,
    );
    if (version !== this.requestVersion) {
      return;
    }
    runInAction(() => {
      this.loadedProducts = result.products;
      this.unavailableIds = result.unavailableIds;
      this.failedIds = result.failedIds;
      this.isLoading = false;
      if (!this.isCategoryOpen) {
        this.selectedCategoryId = null;
      }
    });
  }
  selectCategory(id: string) {
    this.selectedCategoryId = id;
    this.collapsedGroups.clear();
    if (typeof document !== "undefined") {
      document.getElementById("comparison-scroll")?.scrollTo({ left: 0 });
    }
  }
  showCategories() {
    this.selectedCategoryId = null;
  }
  showAllDetails() {
    this.differencesOnly = false;
  }
  showDifferentDetails() {
    this.differencesOnly = true;
  }
  toggleGroup(id: string) {
    if (this.collapsedGroups.has(id)) {
      this.collapsedGroups.delete(id);
      return;
    }
    this.collapsedGroups.add(id);
  }
  removeProduct(id: number) {
    this.comparison.removeProducts([id]);
  }
  removeCategory(id: string) {
    this.comparison.removeProducts(
      this.loadedProducts
        .filter((product) => getComparisonCategory(product).id === id)
        .map((product) => product.id),
    );
  }
  removeActiveCategory() {
    if (!this.activeCategory) {
      return;
    }
    this.removeCategory(this.activeCategory.id);
  }
  removeUnavailableProducts() {
    this.comparison.removeProducts(this.unavailableIds);
  }
}
