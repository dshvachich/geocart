import * as stylex from "@stylexjs/stylex";
import type { Product } from "@/domain/entities";
import { formatOffers, formatPrice } from "@/utils/string-utils";
import { productCardStyles as styles } from "./product-card.styles";

type ProductCardContentProps = {
  product: Product;
};

export const ProductCardContent = ({ product }: ProductCardContentProps) => (
  <div {...stylex.props(styles.content)}>
    <h2 {...stylex.props(styles.name)}>{product.name}</h2>
    <p {...stylex.props(styles.price)}>
      {formatPrice(product.price, product.currency)}
    </p>
    <p {...stylex.props(styles.offers)}>{formatOffers(product.offers)}</p>
  </div>
);
