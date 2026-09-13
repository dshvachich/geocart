import type { Product as ProductDto } from "@/data/openapi/models";
import type { ProductDetails } from "@/domain/entities/product-details";
import { normalizeProductImages } from "@/domain/helpers/product-images.helpers";

export const ProductDtoToProductDetailsMapperExtension = {
  toEntity(product: ProductDto): ProductDetails {
    return {
      id: product.id,
      displayCode: product.displayCode,
      slug: product.slug,
      name: product.name,
      description: product.description,
      images: normalizeProductImages(product.imageUrls),
      isNew: product.isNew,
      currency: "₾",
      categoryBreadcrumbs: product.categoryBreadcrumbs.map(({ id, label }) => ({
        id,
        label,
      })),
      offers: product.offers.map((offer) => ({
        id: offer.id,
        url: offer.url,
        updatedAt: offer.updatedAt,
        price: offer.priceTetri / 100,
        originalPrice: offer.originalPriceTetri / 100,
        ratioToBestPrice: offer.ratioToBestPrice,
        merchant: {
          id: offer.merchant.id,
          name: offer.merchant.name,
          url: offer.merchant.url,
          logoUrl: offer.merchant.logoUrl,
          phone: offer.merchant.phone || null,
        },
      })),
      attributeGroups: product.attributes.groups.map(
        ({ id, label, attributes }) => ({
          id,
          label,
          attributes: attributes.map(({ id, label, value }) => ({
            id,
            label,
            value,
          })),
        }),
      ),
      summary: product.summary.map(({ id, label, value }) => ({
        id,
        label,
        value,
      })),
      variants: product.variants.map(({ id, label, options }) => ({
        id,
        label,
        options: options.map(({ productId, slug, label, selected, exact }) => ({
          productId,
          slug,
          label,
          selected,
          exact,
        })),
      })),
    };
  },
};
