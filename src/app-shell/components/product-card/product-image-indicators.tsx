import * as stylex from "@stylexjs/stylex";
import { productCardStyles as styles } from "./product-card.styles";

const PRODUCT_IMAGE_INDICATORS_COUNT = 5;

export const ProductImageIndicators = () => (
  <div {...stylex.props(styles.indicators)} aria-hidden="true">
    {Array.from({ length: PRODUCT_IMAGE_INDICATORS_COUNT }).map((_, index) => (
      <span
        {...stylex.props(
          styles.indicator,
          index === 0 && styles.activeIndicator,
        )}
        key={index}
      />
    ))}
  </div>
);
