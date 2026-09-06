import type { PageCursor } from './pagination'

export type ProductCategory = {
  id: string;
  title: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  offers: number;
  imageSrc: string;
  images?: string[];
  category?: ProductCategory;
  isNew?: boolean;
  isFavorite?: boolean;
  imageFit?: "contain" | "cover";
};

export type ProductListResult = {
  cursor: PageCursor;
  products: Product[];
};
