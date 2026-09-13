import type {
  ComparisonCategory,
  ComparisonGroup,
  ComparisonProduct,
} from "@/domain/entities/comparison";

const UNCATEGORIZED = { id: "uncategorized", title: "Other" };

export const getComparisonCategory = (product: ComparisonProduct) =>
  product.category ?? UNCATEGORIZED;

export const getComparisonCategories = (
  products: ComparisonProduct[],
): ComparisonCategory[] => {
  const categories = new Map<string, ComparisonCategory>();
  for (const product of products) {
    const category = getComparisonCategory(product);
    const existing = categories.get(category.id);
    if (existing) {
      existing.count += 1;
      continue;
    }
    categories.set(category.id, {
      ...category,
      imageSrc: product.imageSrc,
      count: 1,
    });
  }
  return [...categories.values()];
};

export const getComparisonGroups = (
  products: ComparisonProduct[],
): ComparisonGroup[] => {
  const groups = new Map<string, ComparisonGroup>();
  products.forEach((product, productIndex) => {
    for (const group of product.attributeGroups) {
      let comparisonGroup = groups.get(group.id);
      if (!comparisonGroup) {
        comparisonGroup = { id: group.id, label: group.label, rows: [] };
        groups.set(group.id, comparisonGroup);
      }
      for (const attribute of group.attributes) {
        let row = comparisonGroup.rows.find((item) => item.id === attribute.id);
        if (!row) {
          row = {
            id: attribute.id,
            label: attribute.label,
            values: Array<string | null>(products.length).fill(null),
            isDifferent: false,
          };
          comparisonGroup.rows.push(row);
        }
        row.values[productIndex] = attribute.value.trim() || null;
      }
    }
  });
  return [...groups.values()].map((group) => ({
    ...group,
    rows: group.rows.map((row) => ({
      ...row,
      isDifferent: new Set(row.values).size > 1,
    })),
  }));
};
