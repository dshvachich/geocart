import type { ProductSummaryAttribute } from "./product";

export type ProductMerchant = {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  phone: string | null;
};

export type ProductOffer = {
  id: number;
  merchant: ProductMerchant;
  url: string;
  updatedAt: string;
  price: number;
  originalPrice: number;
  ratioToBestPrice: number;
};

export type ProductVariantOption = {
  productId: number;
  slug: string;
  label: string;
  selected: boolean;
  exact: boolean;
};

export type ProductVariantGroup = {
  id: string;
  label: string;
  options: ProductVariantOption[];
};

export type ProductAttributeGroup = {
  id: string;
  label: string;
  attributes: ProductSummaryAttribute[];
};

export type ProductDetails = {
  id: number;
  displayCode: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  isNew: boolean;
  currency: string;
  categoryBreadcrumbs: { id: string; label: string }[];
  offers: ProductOffer[];
  attributeGroups: ProductAttributeGroup[];
  summary: ProductSummaryAttribute[];
  variants: ProductVariantGroup[];
};
