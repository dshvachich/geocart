import * as stylex from "@stylexjs/stylex";
import { productCardStyles as styles } from "./product-card.styles";

type ProductImageIndicatorsProps = {
  activeIndex: number;
  count: number;
};

export const ProductImageIndicators = ({
  activeIndex,
  count,
}: ProductImageIndicatorsProps) => (
  <div {...stylex.props(styles.indicators)} aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <span
        {...stylex.props(
          styles.indicator,
          index === activeIndex && styles.activeIndicator,
        )}
        key={index}
      />
    ))}
  </div>
);
