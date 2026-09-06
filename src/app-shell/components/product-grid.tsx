"use client";

import type { Product } from "@/domain/entities";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { ProductCard } from "./product-card";
import {
  productGridHeaderStyles as styles,
  productGridStyles,
} from "./product-grid.styles";

type ProductGridProps = {
  isHoverImageSwitchEnabled?: boolean;
  products: Product[];
};

export const ProductGrid = ({
  isHoverImageSwitchEnabled = false,
  products,
}: ProductGridProps) => {
  const { t } = useTranslation();

  return (
    <section
      {...stylex.props(layoutStyles.section)}
      aria-labelledby="popular-products-title"
    >
      <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
        <h2 {...stylex.props(styles.title)} id="popular-products-title">
          {t("product.popularProducts")}
        </h2>
      </div>
      <div {...stylex.props(productGridStyles.grid)}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            isHoverImageSwitchEnabled={isHoverImageSwitchEnabled}
            product={product}
            priority={index < 6}
          />
        ))}
      </div>
    </section>
  );
};
