import type { Category } from "@/domain/entities";

export const hasCategoryChildren = (category: Category) =>
  (category.subCategories?.length ?? 0) > 0;

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
