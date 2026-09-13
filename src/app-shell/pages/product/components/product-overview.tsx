"use client";

import * as stylex from "@stylexjs/stylex";
import { ProductGallery } from "./product-gallery";
import { ProductSummary } from "./product-summary";
import { productOverviewStyles as styles } from "./product-overview.styles";
import { useProductPageStore } from "../product-page.context";

export const ProductOverview = () => {
  const { product } = useProductPageStore();
  const hasImages = product.images.length > 0;
  return (
    <div {...stylex.props(styles.overview)}>
      {hasImages && <ProductGallery />}
      <div {...stylex.props(styles.summary, !hasImages && styles.fullWidth)}>
        <ProductSummary />
      </div>
    </div>
  );
};
