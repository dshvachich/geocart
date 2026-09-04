"use client";

import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { FavoriteCategoryFilter } from "@/app-shell/stores/favorites.store";
import { uiAssets } from "@/app-shell/components/assets";
import {
  controlStyles,
  iconStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { FavoriteCategoryChip } from "./favorite-category-chip";
import { favoritesControlsStyles as styles } from "./favorites-controls.styles";

type FavoritesControlsProps = {
  categories: FavoriteCategoryFilter[];
};

export const FavoritesControls = ({ categories }: FavoritesControlsProps) => {
  const { t } = useTranslation();
  const favoritesStore = useContainer().get(FavoritesStore);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section {...stylex.props(layoutStyles.section, styles.section)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.controls)}>
        <div {...stylex.props(styles.filtersGroup)}>
          <button
            {...stylex.props(styles.clearFilterButton)}
            type="button"
            aria-label={t("favorites.showAll")}
            onClick={favoritesStore.clearCategory}
          >
            <Image
              {...stylex.props(iconStyles.icon)}
              src={uiAssets.sort}
              alt=""
              width={24}
              height={24}
            />
          </button>

          <span
            {...stylex.props(
              controlStyles.verticalDivider,
              styles.mobileDivider,
            )}
            aria-hidden="true"
          />

          <div {...stylex.props(styles.tags)}>
            {categories.map((category) => (
              <FavoriteCategoryChip category={category} key={category.id} />
            ))}
          </div>
        </div>

        <div {...stylex.props(styles.viewSegment)} aria-hidden="true">
          <span {...stylex.props(styles.segmentButton, styles.activeSegment)}>
            <Image src={uiAssets.catalogActive} alt="" width={24} height={24} />
          </span>
          <span {...stylex.props(styles.segmentButton)}>
            <Image src={uiAssets.list} alt="" width={24} height={24} />
          </span>
        </div>
      </div>
    </section>
  );
};
