import Image from "next/image";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import type { ComparisonProduct } from "@/domain/entities/comparison";
import { uiAssets } from "@/app-shell/components/assets";
import { ProductCardMedia } from "@/app-shell/components/product-card/product-card-media";
import { ProductCardContent } from "@/app-shell/components/product-card/product-card-content";
import { productCardStyles } from "@/app-shell/components/product-card/product-card.styles";
import { useComparePageStore } from "../compare-page.context";
import { compareProductCardStyles as styles } from "./compare-product-card.styles";

type Props = { product: ComparisonProduct };

export const CompareProductCard = ({ product }: Props) => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  return (
    <article {...stylex.props(productCardStyles.card)}>
      <ProductCardMedia
        product={product}
        priority
        isHoverImageSwitchEnabled
        isTouchImageSwitchEnabled={false}
        action={
          <button
            type="button"
            {...stylex.props(styles.remove)}
            aria-label={t("compare.removeProduct", { product: product.name })}
            onClick={() => store.removeProduct(product.id)}
          >
            <Image
              src={uiAssets.comparisonRemove}
              alt=""
              width={40}
              height={40}
            />
          </button>
        }
      />
      <ProductCardContent product={product} alignComparisonDetails />
    </article>
  );
};
