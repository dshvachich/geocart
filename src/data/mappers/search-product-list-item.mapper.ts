import type { SearchProductListItem } from "@/data/openapi/models";
import type { Product } from "@/domain/entities";
import { ProductListItemToProductMapperExtension } from "@/data/mappers/product-list-item.mapper";

export const SearchProductListItemToProductMapperExtension = {
  toEntity(product: SearchProductListItem): Product {
    return {
      ...ProductListItemToProductMapperExtension.toEntity(product),
      summary: product.summary.map((attribute) => ({
        id: attribute.id,
        label: attribute.label,
        value: attribute.value,
      })),
    };
  },
};
