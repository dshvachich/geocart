import type { Category } from "@/domain/entities";
import { createSearchHref } from "@/utils/search-query-utils";

export const CATALOG_PAGE_PATH = "/catalog";

export type CategoryPath = {
  rootCategory: Category;
};

export const createCatalogHref = (categoryId?: string) => {
  if (!categoryId) {
    return CATALOG_PAGE_PATH;
  }

  return `${CATALOG_PAGE_PATH}?category=${encodeURIComponent(categoryId)}`;
};

export const findCategoryPath = (
  categories: Category[],
  categoryId: string,
): Category[] | null => {
  for (const category of categories) {
    if (category.id === categoryId) {
      return [category];
    }

    const childPath = findCategoryPath(
      category.subCategories ?? [],
      categoryId,
    );

    if (childPath) {
      return [category, ...childPath];
    }
  }

  return null;
};

export const getCategoryHref = (category: Category) => {
  if ((category.subCategories?.length ?? 0) > 0) {
    return createCatalogHref(category.id);
  }

  return createSearchHref({ category: category.id });
};

export const getCategoryPath = (
  categories: Category[],
  selectedCategoryId: string | undefined,
): CategoryPath | null => {
  const explicitPath = selectedCategoryId
    ? findCategoryPath(categories, selectedCategoryId)
    : null;
  const fallbackPath = categories[0] ? [categories[0]] : null;
  const path = explicitPath ?? fallbackPath;
  const selectedCategory = path?.[path.length - 1];
  const rootCategory = path?.[0];

  if (!path || !selectedCategory || !rootCategory) {
    return null;
  }

  return {
    rootCategory,
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
