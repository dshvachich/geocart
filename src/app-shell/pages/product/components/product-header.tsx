"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { createSearchHref } from "@/utils/search-query-utils";
import { useProductPageStore } from "../product-page.context";
import { productHeaderStyles as styles } from "./product-header.styles";

export const ProductHeader = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  return (
    <header {...stylex.props(layoutStyles.contentRail, styles.header)}>
      <nav aria-label={t("common.breadcrumbs")}>
        <ol {...stylex.props(styles.breadcrumbs)}>
          {store.product.categoryBreadcrumbs.map((category, index) => (
            <li key={category.id} {...stylex.props(styles.breadcrumb)}>
              {index > 0 && (
                <Image
                  src={uiAssets.angleRight}
                  alt=""
                  width={16}
                  height={16}
                />
              )}
              <Link href={createSearchHref({ category: category.id })}>
                {category.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <h1 {...stylex.props(styles.title)}>{store.product.name}</h1>
      <div {...stylex.props(styles.meta)}>
        <span {...stylex.props(styles.desktopOnly)}>
          {t("productPage.code", { code: store.product.displayCode })}
        </span>
        <div {...stylex.props(styles.actions)}>
          <button
            type="button"
            {...stylex.props(styles.action, styles.desktopOnly)}
            aria-pressed={store.isFavorite}
            onClick={store.toggleFavorite}
          >
            <Image
              src={
                store.isFavorite ? uiAssets.heartFilled : uiAssets.productHeart
              }
              alt=""
              width={20}
              height={20}
            />
            {t(
              store.isFavorite
                ? "productPage.removeFavorite"
                : "productPage.addFavorite",
            )}
          </button>
          <button
            type="button"
            {...stylex.props(styles.action)}
            aria-pressed={store.isCompared}
            onClick={store.toggleComparison}
          >
            <Image src={uiAssets.list} alt="" width={20} height={20} />
            {t(store.isCompared ? "compare.remove" : "common.compare")}
          </button>
          <button
            type="button"
            {...stylex.props(styles.action, styles.desktopOnly)}
            onClick={store.share}
          >
            <Image src={uiAssets.share} alt="" width={20} height={20} />
            {t("productPage.share")}
          </button>
        </div>
      </div>
      {store.shareStatus !== "idle" && (
        <p role="status" {...stylex.props(styles.status)}>
          {t(`productPage.share_${store.shareStatus}`)}
        </p>
      )}
    </header>
  );
});
