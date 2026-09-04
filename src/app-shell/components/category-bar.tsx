"use client";

import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { Category } from "@/domain/entities";
import { uiAssets } from "./assets";
import { categoryBarStyles as styles } from "./category-bar.styles";

type CategoryBarProps = {
  categories: Category[];
};

export const CategoryBar = ({ categories }: CategoryBarProps) => {
  const { t } = useTranslation();

  return (
    <section
      {...stylex.props(layoutStyles.section)}
      aria-label={t("common.categories")}
    >
      <div {...stylex.props(layoutStyles.contentRail, styles.bar)}>
        {categories.map((category) => (
          <button
            {...stylex.props(styles.button)}
            key={category.id}
            type="button"
          >
            <span {...stylex.props(styles.illustration)} aria-hidden="true">
              <Image
                {...stylex.props(styles.shape)}
                src={uiAssets.categoryShape}
                alt=""
                width={96}
                height={96}
              />
              <Image
                {...stylex.props(styles.image)}
                src={category.imageSrc}
                alt=""
                width={140}
                height={140}
              />
            </span>
            <span {...stylex.props(styles.title)}>
              {getLocalizedCategoryTitle(t, category)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
