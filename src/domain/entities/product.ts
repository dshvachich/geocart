import type { PageCursor } from './pagination'

export type ProductCategory = {
  id: string;
  title: string;
};

export type ProductSummaryAttribute = {
  id: string;
  label: string;
  value: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  currency: string;
  offers: number;
  imageSrc: string;
  images?: string[];
  category?: ProductCategory;
  summary?: ProductSummaryAttribute[];
  isNew?: boolean;
  isFavorite?: boolean;
  imageFit?: "contain" | "cover";
};

export type ProductListResult = {
  cursor: PageCursor;
  products: Product[];
};
