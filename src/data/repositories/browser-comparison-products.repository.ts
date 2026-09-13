import axios from "axios";
import type { ComparisonProductsResult } from "@/domain/entities/comparison";
import type { SupportedLocale } from "@/domain/types/locale";

const REQUEST_BATCH_SIZE = 24;
const REQUEST_TIMEOUT_MS = 25000;

export const browserComparisonProductsRepository = {
  async getProducts(
    ids: number[],
    locale: SupportedLocale,
  ): Promise<ComparisonProductsResult> {
    const result: ComparisonProductsResult = {
      products: [],
      unavailableIds: [],
      failedIds: [],
    };
    for (let offset = 0; offset < ids.length; offset += REQUEST_BATCH_SIZE) {
      const batch = ids.slice(offset, offset + REQUEST_BATCH_SIZE);
      try {
        const { data } = await axios.get<ComparisonProductsResult>(
          "/api/catalog/comparison",
          {
            params: { ids: batch.join(","), locale },
            timeout: REQUEST_TIMEOUT_MS,
          },
        );
        result.products.push(...data.products);
        result.unavailableIds.push(...data.unavailableIds);
        result.failedIds.push(...data.failedIds);
      } catch {
        result.failedIds.push(...batch);
      }
    }
    return result;
  },
};
