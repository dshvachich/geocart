"use client";

import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
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

type FavoritesControlsProps = {
  categories: FavoriteCategoryFilter[];
};

export const FavoritesControls = ({ categories }: FavoritesControlsProps) => {
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
            aria-label="Show all favorite products"
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

const styles = stylex.create({
  section: {
    backgroundColor: "var(--color-bg-primary)",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: {
      default: 72,
      "@media (max-width: 760px)": 56,
    },
    paddingTop: {
      default: 16,
      "@media (max-width: 760px)": 8,
    },
    paddingBottom: 16,
    overflow: "hidden",
    backgroundColor: "var(--color-bg-primary)",
  },
  filtersGroup: {
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: 8,
  },
  clearFilterButton: {
    display: {
      default: "none",
      "@media (max-width: 760px)": "inline-flex",
    },
    flex: "0 0 auto",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    height: 32,
    padding: "4px 12px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
  },
  mobileDivider: {
    display: {
      default: "none",
      "@media (max-width: 760px)": "block",
    },
    flex: "0 0 2px",
  },
  tags: {
    display: "flex",
    minWidth: 0,
    gap: {
      default: 8,
      "@media (max-width: 760px)": 4,
    },
    alignItems: "center",
    overflowX: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  viewSegment: {
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    flex: "0 0 auto",
    alignItems: "center",
    gap: 2,
    height: 40,
    padding: 2,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
  },
  segmentButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  activeSegment: {
    backgroundColor: "var(--color-bg-primary)",
  },
});
