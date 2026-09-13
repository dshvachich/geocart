import type { ProductListItem } from "@/data/openapi/models";
import type { Product } from "@/domain/entities";
import { normalizeProductImages } from "@/domain/helpers/product-images.helpers";

const GEL_CURRENCY = "₾";

const tetriToGel = (value: number) => Number((value / 100).toFixed(2));

export const ProductListItemToProductMapperExtension = {
  toEntity(product: ProductListItem): Product {
    const images = normalizeProductImages(product.imageUrls);

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: tetriToGel(product.minPriceTetri),
      currency: GEL_CURRENCY,
      offers: product.offersCount,
      imageSrc: images[0] ?? "",
      images,
      isNew: product.isNew,
    };
  },
};
