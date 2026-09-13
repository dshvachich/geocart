import type { Product } from "@/domain/entities/product";
import type { ProductDetails } from "@/domain/entities/product-details";
import { getBestProductOffer } from "@/domain/helpers/product-details.helpers";

export const ProductDetailsToProductMapperExtension = {
  toEntity(product: ProductDetails): Product {
    const category = product.categoryBreadcrumbs.at(-1);
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: getBestProductOffer(product.offers)?.price ?? 0,
      currency: product.currency,
      offers: product.offers.length,
      imageSrc: product.images[0] ?? "",
      images: product.images,
      isNew: product.isNew,
      summary: product.summary,
      category: category
        ? { id: category.id, title: category.label }
        : undefined,
    };
  },
};
