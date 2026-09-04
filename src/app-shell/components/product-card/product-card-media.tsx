import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/entities";
import { ProductFavoriteButton } from "./product-favorite-button";
import { productCardStyles as styles } from "./product-card.styles";
import { ProductImageIndicators } from "./product-image-indicators";

type ProductCardMediaProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  priority: boolean;
  product: Product;
};

export const ProductCardMedia = ({
  isFavorite,
  onToggleFavorite,
  priority,
  product,
}: ProductCardMediaProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.media)}>
      <span {...stylex.props(styles.imageFrame)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...stylex.props(
            styles.productImage,
            product.imageFit === "cover" && styles.coverImage,
          )}
          src={product.imageSrc}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
        />
      </span>

      {product.isNew && (
        <span {...stylex.props(styles.tag)}>{t("product.new")}</span>
      )}

      <ProductFavoriteButton
        isFavorite={isFavorite}
        productName={product.name}
        onToggleFavorite={onToggleFavorite}
      />

      <ProductImageIndicators />
    </div>
  );
};
