import type { ProductListItem } from "@/data/openapi/models";
import type { Product } from "@/domain/entities";

const GEL_CURRENCY = "₾";

const tetriToGel = (value: number) => Number((value / 100).toFixed(2));

export const ProductListItemToProductMapperExtension = {
  toEntity(product: ProductListItem): Product {
    return {
      id: product.id,
      name: product.name,
      price: tetriToGel(product.minPriceTetri),
      currency: GEL_CURRENCY,
      offers: product.offersCount,
      imageSrc: product.imageUrls[0] ?? "",
      isNew: product.isNew,
    };
  },
};
