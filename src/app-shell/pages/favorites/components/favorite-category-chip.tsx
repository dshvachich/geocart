"use client";

import * as stylex from "@stylexjs/stylex";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { FavoriteCategoryFilter } from "@/app-shell/stores/favorites.store";
import { useContainer } from "@/di/di-provider";

type FavoriteCategoryChipProps = {
  category: FavoriteCategoryFilter;
};

export const FavoriteCategoryChip = ({
  category,
}: FavoriteCategoryChipProps) => {
  const favoritesStore = useContainer().get(FavoritesStore);

  return (
    <button
      {...stylex.props(styles.chip, category.isSelected && styles.selectedChip)}
      type="button"
      aria-pressed={category.isSelected}
      onClick={() => favoritesStore.toggleCategory(category.id)}
    >
      <span>{category.title}</span>
      <span
        {...stylex.props(
          styles.count,
          category.isSelected && styles.selectedCount,
        )}
      >
        {category.count}
      </span>
    </button>
  );
};

const styles = stylex.create({
  chip: {
    display: "inline-flex",
    flex: "0 0 auto",
    alignItems: "center",
    gap: 4,
    height: {
      default: 40,
      "@media (max-width: 760px)": 32,
    },
    padding: {
      default: "8px 12px 8px 16px",
      "@media (max-width: 760px)": "6px 8px 6px 12px",
    },
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
    whiteSpace: "nowrap",
  },
  selectedChip: {
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-on-dark)",
  },
  count: {
    display: "inline-flex",
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "var(--color-bg-primary)",
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
  },
  selectedCount: {
    color: "var(--color-fg-secondary)",
  },
});
