export interface ComparisonRepository {
  getProductIds(): number[];
  saveProductIds(ids: number[]): void;
}
