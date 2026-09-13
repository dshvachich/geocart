import type { ComparisonRepository } from "@/domain/repositories/comparison.repository";

const COMPARISON_STORAGE_KEY = "geocart.comparison-product-ids";

export class BrowserComparisonRepository implements ComparisonRepository {
  getProductIds(): number[] {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const raw = window.localStorage.getItem(COMPARISON_STORAGE_KEY);
      const ids: unknown = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(ids)) {
        return [];
      }
      return [
        ...new Set(
          ids.filter(
            (id): id is number =>
              typeof id === "number" && Number.isSafeInteger(id) && id > 0,
          ),
        ),
      ];
    } catch {
      return [];
    }
  }
  saveProductIds(ids: number[]): void {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Keep the current session usable if browser storage is unavailable.
    }
  }
}
