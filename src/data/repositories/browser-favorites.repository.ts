import type { Product } from "@/domain/entities";
import { normalizeProductImages } from "@/domain/helpers/product-images.helpers";
import type { FavoritesRepository } from "@/domain/repositories";

const FAVORITES_STORAGE_KEY = "geocart.favorite-products";
const FAVORITES_STORAGE_VERSION = 1;

type FavoritesStoragePayload = {
  version: typeof FAVORITES_STORAGE_VERSION;
  products: Product[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isString = (value: unknown): value is string => typeof value === "string";

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const getProductImages = (value: Record<string, unknown>) => {
  if (!Array.isArray(value.images)) {
    return undefined;
  }

  return normalizeProductImages(value.images.filter(isString));
};

const getProductCategory = (
  value: Record<string, unknown>,
): Product["category"] => {
  if (!isRecord(value.category)) {
    return undefined;
  }

  if (!isString(value.category.id) || !isString(value.category.title)) {
    return undefined;
  }

  return {
    id: value.category.id,
    title: value.category.title,
  };
};

const toProduct = (value: unknown): Product | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !isString(value.id) ||
    !isString(value.name) ||
    !isNumber(value.price) ||
    !isString(value.currency) ||
    !isNumber(value.offers) ||
    !isString(value.imageSrc)
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    price: value.price,
    currency: value.currency,
    offers: value.offers,
    imageSrc: value.imageSrc,
    images: getProductImages(value),
    category: getProductCategory(value),
    isNew: typeof value.isNew === "boolean" ? value.isNew : undefined,
    isFavorite: true,
    imageFit:
      value.imageFit === "contain" || value.imageFit === "cover"
        ? value.imageFit
        : undefined,
  };
};

const parseProducts = (value: unknown): Product[] => {
  if (Array.isArray(value)) {
    return value
      .map(toProduct)
      .filter((product): product is Product => Boolean(product));
  }

  if (!isRecord(value) || !Array.isArray(value.products)) {
    return [];
  }

  return value.products
    .map(toProduct)
    .filter((product): product is Product => Boolean(product));
};

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export class BrowserFavoritesRepository implements FavoritesRepository {
  getProducts(): Product[] {
    const storage = getStorage();

    if (!storage) {
      return [];
    }

    try {
      const rawProducts = storage.getItem(FAVORITES_STORAGE_KEY);

      if (!rawProducts) {
        return [];
      }

      return parseProducts(JSON.parse(rawProducts));
    } catch {
      return [];
    }
  }

  saveProducts(products: Product[]): void {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    const payload: FavoritesStoragePayload = {
      version: FAVORITES_STORAGE_VERSION,
      products,
    };

    try {
      storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage can be unavailable in private mode or when quota is full.
    }
  }
}
