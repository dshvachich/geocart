import type { Product, ProductCategory } from "./product";
import type { ProductAttributeGroup } from "./product-details";

export type ComparisonProduct = Product & {
  attributeGroups: ProductAttributeGroup[];
};

export type ComparisonProductsResult = {
  products: ComparisonProduct[];
  unavailableIds: number[];
  failedIds: number[];
};

export type ComparisonCategory = ProductCategory & {
  imageSrc: string;
  count: number;
};

export type ComparisonRow = {
  id: string;
  label: string;
  values: (string | null)[];
  isDifferent: boolean;
};

export type ComparisonGroup = {
  id: string;
  label: string;
  rows: ComparisonRow[];
};
