import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/entities";
import { formatPrice } from "@/utils/string-utils";
import { productCardStyles as styles } from "./product-card.styles";
import Link from 'next/link';
import { createProductHref } from '@/utils/product-url-utils';

type ProductCardContentProps = {
  product: Product;
  alignComparisonDetails?: boolean;
};

export const ProductCardContent = ({ product, alignComparisonDetails = false }: ProductCardContentProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.content)}>
      <h2 {...stylex.props(styles.name, alignComparisonDetails && styles.comparisonName)}><Link href={createProductHref(product.slug)}>{product.name}</Link></h2>
      {product.offers > 0 && <p {...stylex.props(styles.price)}>
        {formatPrice(product.price, product.currency, t("product.from"))}
      </p>}
      <p {...stylex.props(styles.offers)}>
        {t("product.offers", { count: product.offers })}
      </p>
    </div>
  );
};
