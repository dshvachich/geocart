"use client";

import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { ProductCard } from "@/app-shell/components/product-card";
import {
  productGridStyles,
  productGridHeaderStyles,
} from "@/app-shell/components/product-grid.styles";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useProductPageStore } from "../product-page.context";
import { productSharedStyles as shared } from "../product-shared.styles";
import { productMoreProductsStyles as styles } from "./product-more-products.styles";

export const ProductMoreProducts = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  const boundary = useRef<HTMLDivElement>(null);
  const { isLoadingMore, hasLoadError } = store;
  const next = store.recommendations.cursor.next;
  useEffect(() => {
    if (!boundary.current || !next || isLoadingMore || hasLoadError) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void store.loadMoreProducts();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(boundary.current);
    return () => observer.disconnect();
  }, [store, next, isLoadingMore, hasLoadError]);

  if (store.moreProducts.length === 0 && !next) {
    return null;
  }
  return (
    <section aria-labelledby="more-products-title">
      <div
        {...stylex.props(
          layoutStyles.contentRail,
          productGridHeaderStyles.header,
        )}
      >
        <h2
          id="more-products-title"
          {...stylex.props(productGridHeaderStyles.title)}
        >
          {t("productPage.moreProducts")}
        </h2>
      </div>
      <div {...stylex.props(productGridStyles.grid)}>
        {store.moreProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isHoverImageSwitchEnabled
          />
        ))}
      </div>
      <div ref={boundary} {...stylex.props(styles.boundary)}>
        {isLoadingMore && <SectionLoader />}
        {hasLoadError && (
          <p role="status" {...stylex.props(shared.empty)}>
            {t("productPage.loadError")}
          </p>
        )}
        {next && !isLoadingMore && (
          <button
            type="button"
            {...stylex.props(shared.button)}
            onClick={store.loadMoreProducts}
          >
            {t(hasLoadError ? "productPage.retry" : "productPage.loadMore")}
          </button>
        )}
      </div>
    </section>
  );
});
