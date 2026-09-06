import type { Category } from "@/domain/entities";
import {
  findCategoryPath,
  hasCategoryChildren,
} from "@/domain/helpers/category-tree.helpers";
import { createSearchHref } from "@/utils/search-query-utils";

export const CATALOG_PAGE_PATH = "/catalog";
export const ROOT_CATEGORY_LEVEL = 1;
export const MAX_CATEGORY_LEVEL = 3;

export type CategoryPath = {
  path: Category[];
  rootCategory: Category;
  selectedCategory: Category;
};

export const createCatalogHref = (categoryId?: string) => {
  if (!categoryId) {
    return CATALOG_PAGE_PATH;
  }

  return `${CATALOG_PAGE_PATH}?category=${encodeURIComponent(categoryId)}`;
};

const normalizeCategoryLevel = (categoryLevel: number) => {
  if (categoryLevel <= ROOT_CATEGORY_LEVEL) {
    return ROOT_CATEGORY_LEVEL;
  }

  if (categoryLevel >= MAX_CATEGORY_LEVEL) {
    return MAX_CATEGORY_LEVEL;
  }

  return categoryLevel;
};

export const getChildCategoryLevel = (categoryLevel: number) =>
  normalizeCategoryLevel(categoryLevel + 1);

export const isCategoryClickableInCatalog = (
  category: Category,
  categoryLevel: number,
) =>
  normalizeCategoryLevel(categoryLevel) === ROOT_CATEGORY_LEVEL ||
  !hasCategoryChildren(category);

export const getCategoryHref = (
  category: Category,
  categoryLevel: number,
) => {
  if (!isCategoryClickableInCatalog(category, categoryLevel)) {
    return null;
  }

  if (hasCategoryChildren(category)) {
    return createCatalogHref(category.id);
  }

  return createSearchHref({ category: category.id });
};

export const getCategoryPath = (
  categories: Category[],
  selectedCategoryId: string | undefined,
): CategoryPath | null => {
  const path = selectedCategoryId
    ? findCategoryPath(categories, selectedCategoryId)
    : null;
  const selectedCategory = path?.[path.length - 1];
  const rootCategory = path?.[0];

  if (!path || !selectedCategory || !rootCategory) {
    return null;
  }

  return {
    path,
    rootCategory,
    selectedCategory,
  };
};

export const getDefaultCategoryPath = (
  categories: Category[],
): CategoryPath | null => {
  const rootCategory = categories[0];

  if (!rootCategory) {
    return null;
  }

  return {
    path: [rootCategory],
    rootCategory,
    selectedCategory: rootCategory,
  };
};

export const splitCategoryChildren = (category: Category) => {
  const children = category.subCategories ?? [];

  return {
    tagCategories: children.filter((child) => child.type === "button"),
    linkCategories: children.filter((child) => child.type !== "button"),
  };
};

export const createDesktopColumns = (sections: Category[]) => {
  const columns: Category[][] = [[], [], []];

  sections.forEach((section, index) => {
    if (index === 0 || index === 3) {
      columns[0].push(section);
      return;
    }

    if (index === 1 || index === 4) {
      columns[1].push(section);
      return;
    }

    columns[2].push(section);
  });

  return columns;
};
