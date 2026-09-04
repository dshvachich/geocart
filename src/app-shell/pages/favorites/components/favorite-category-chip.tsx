"use client";

import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { FavoriteCategoryFilter } from "@/app-shell/stores/favorites.store";
import { useContainer } from "@/di/di-provider";
import { favoriteCategoryChipStyles as styles } from "./favorite-category-chip.styles";

type FavoriteCategoryChipProps = {
  category: FavoriteCategoryFilter;
};

export const FavoriteCategoryChip = ({
  category,
}: FavoriteCategoryChipProps) => {
  const { t } = useTranslation();
  const favoritesStore = useContainer().get(FavoritesStore);

  return (
    <button
      {...stylex.props(styles.chip, category.isSelected && styles.selectedChip)}
      type="button"
      aria-pressed={category.isSelected}
      onClick={() => favoritesStore.toggleCategory(category.id)}
    >
      <span>{getLocalizedCategoryTitle(t, category)}</span>
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
