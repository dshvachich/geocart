import axios from "axios";
import type { ProductListResult } from "@/domain/entities/product";
import type { GetPopularProductsParams } from "@/domain/repositories/catalog.repository";

export const browserProductListRepository = {
  async getPopularProducts(
    params: GetPopularProductsParams,
  ): Promise<ProductListResult> {
    const response = await axios.get<ProductListResult>(
      "/api/catalog/products",
      { params },
    );
    return response.data;
  },
};
