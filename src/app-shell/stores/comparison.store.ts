import { makeAutoObservable } from "mobx";
import type { ComparisonRepository } from "@/domain/repositories/comparison.repository";

export class ComparisonStore {
  productIds: number[] = [];
  isHydrated = false;
  constructor(private readonly repository: ComparisonRepository) {
    makeAutoObservable<ComparisonStore, "repository">(
      this,
      { repository: false },
      { autoBind: true },
    );
  }
  get count() {
    return this.productIds.length;
  }
  hasProduct(id: number) {
    return this.productIds.includes(id);
  }
  hydrate() {
    if (this.isHydrated) {
      return;
    }
    this.syncFromStorage();
  }
  syncFromStorage() {
    this.productIds = this.repository.getProductIds();
    this.isHydrated = true;
  }
  toggleProduct(id: number) {
    this.hydrate();
    if (this.hasProduct(id)) {
      this.removeProducts([id]);
      return;
    }
    this.productIds = [...this.productIds, id];
    this.repository.saveProductIds(this.productIds);
  }
  removeProducts(ids: number[]) {
    this.hydrate();
    const removed = new Set(ids);
    this.productIds = this.productIds.filter((id) => !removed.has(id));
    this.repository.saveProductIds(this.productIds);
  }
}
