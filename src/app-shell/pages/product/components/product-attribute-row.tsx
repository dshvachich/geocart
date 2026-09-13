import * as stylex from "@stylexjs/stylex";
import type { ProductSummaryAttribute } from "@/domain/entities/product";
import { productAttributeRowStyles as styles } from "./product-attribute-row.styles";

type Props = { attribute: ProductSummaryAttribute; compact?: boolean };

export const ProductAttributeRow = ({ attribute, compact = false }: Props) => (
  <div {...stylex.props(styles.row, compact && styles.compact)}>
    <dt {...stylex.props(styles.label)}>
      <span>{attribute.label}</span>
      <span
        aria-hidden="true"
        {...stylex.props(styles.line, compact && styles.compactLine)}
      />
    </dt>
    <dd {...stylex.props(styles.value, compact && styles.compactValue)}>
      {attribute.value}
    </dd>
  </div>
);
