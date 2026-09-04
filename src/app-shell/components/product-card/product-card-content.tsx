import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/entities";
import { formatPrice } from "@/utils/string-utils";
import { productCardStyles as styles } from "./product-card.styles";

type ProductCardContentProps = {
  product: Product;
};

export const ProductCardContent = ({ product }: ProductCardContentProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.content)}>
      <h2 {...stylex.props(styles.name)}>{product.name}</h2>
      <p {...stylex.props(styles.price)}>
        {formatPrice(product.price, product.currency, t("product.from"))}
      </p>
      <p {...stylex.props(styles.offers)}>
        {t("product.offers", { count: product.offers })}
      </p>
    </div>
  );
};
