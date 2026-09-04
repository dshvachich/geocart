import type { Product } from "@/domain/entities";

export interface FavoritesRepository {
  getProducts(): Product[];
  saveProducts(products: Product[]): void;
}
