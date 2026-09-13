"use client";

import { createContext, useContext } from "react";
import type { ComparePageStore } from "./compare-page.store";

export const ComparePageContext = createContext<ComparePageStore | null>(null);
export const useComparePageStore = () => {
  const store = useContext(ComparePageContext);
  if (!store) {
    throw new Error("ComparePageContext is missing");
  }
  return store;
};
