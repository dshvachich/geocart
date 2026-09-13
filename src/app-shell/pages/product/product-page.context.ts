"use client";

import { createContext, useContext } from "react";
import type { ProductPageStore } from "./product-page.store";

export const ProductPageContext = createContext<ProductPageStore | null>(null);
export const useProductPageStore = () => {
  const store = useContext(ProductPageContext);
  if (!store) {
    throw new Error("ProductPageContext is missing");
  }
  return store;
};
