"use client";

import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import { createCatalogHref } from "@/app-shell/pages/catalog/catalog-page.helpers";
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
          <Link
            {...stylex.props(styles.button)}
            href={createCatalogHref(category.id)}
            key={category.id}
          >
            <span {...stylex.props(styles.illustration)} aria-hidden="true">
              <Image
                {...stylex.props(styles.shape)}
                src={uiAssets.categoryShape}
                alt=""
                width={96}
                height={96}
              />
              {category.imageSrc && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    {...stylex.props(styles.image)}
                    src={category.imageSrc}
                    alt=""
                  />
                </>
              )}
            </span>
            <span {...stylex.props(styles.title)}>
              {getLocalizedCategoryTitle(t, category)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
