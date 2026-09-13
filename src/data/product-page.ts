import { cache } from "react";
import { catalogRepository } from "@/data/repositories/catalog.repository";
import type { SupportedLocale } from "@/domain/types/locale";

export const getProductPageData = cache(
  (slug: string, locale: SupportedLocale) =>
    catalogRepository.getProduct(slug, { locale }),
);

export const getProductRecommendations = (locale: SupportedLocale) =>
  catalogRepository.getPopularProducts({ locale, limit: 12 });
