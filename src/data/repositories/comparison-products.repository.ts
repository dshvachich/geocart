import type { ComparisonProductsResult } from "@/domain/entities/comparison";
import { CatalogRequestError } from "@/domain/entities/catalog-request-error";
import type { SupportedLocale } from "@/domain/types/locale";
import { ProductDetailsToComparisonProductMapperExtension } from "@/domain/mappers/comparison-product.mapper";
import { catalogRepository } from "./catalog.repository";

const CONCURRENT_PRODUCT_REQUESTS = 6;

export const comparisonProductsRepository = {
  async getProducts(
    ids: number[],
    locale: SupportedLocale,
  ): Promise<ComparisonProductsResult> {
    const result: ComparisonProductsResult = {
      products: [],
      unavailableIds: [],
      failedIds: [],
    };
    for (
      let offset = 0;
      offset < ids.length;
      offset += CONCURRENT_PRODUCT_REQUESTS
    ) {
      const batch = ids.slice(offset, offset + CONCURRENT_PRODUCT_REQUESTS);
      const responses = await Promise.allSettled(
        batch.map((id) => catalogRepository.getProduct(String(id), { locale })),
      );
      responses.forEach((response, index) => {
        if (response.status === "fulfilled") {
          result.products.push(
            ProductDetailsToComparisonProductMapperExtension.toEntity(
              response.value,
            ),
          );
          return;
        }
        if (
          response.reason instanceof CatalogRequestError &&
          response.reason.kind === "not-found"
        ) {
          result.unavailableIds.push(batch[index]);
          return;
        }
        result.failedIds.push(batch[index]);
      });
    }
    return result;
  },
};
