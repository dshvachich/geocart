import type { ComparisonProduct } from "@/domain/entities/comparison";
import type { ProductDetails } from "@/domain/entities/product-details";
import { ProductDetailsToProductMapperExtension } from "./product-details.mapper";

export const ProductDetailsToComparisonProductMapperExtension = {
  toEntity(product: ProductDetails): ComparisonProduct {
    return {
      ...ProductDetailsToProductMapperExtension.toEntity(product),
      attributeGroups: product.attributeGroups,
    };
  },
};
