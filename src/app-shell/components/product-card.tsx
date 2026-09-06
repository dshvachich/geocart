"use client";

import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { Product } from "@/domain/entities";
import { useContainer } from "@/di/di-provider";
import { ProductCardContent } from "./product-card/product-card-content";
import { ProductCardMedia } from "./product-card/product-card-media";
import { productCardStyles as styles } from "./product-card/product-card.styles";

type ProductCardProps = {
  isHoverImageSwitchEnabled?: boolean;
  product: Product;
  priority?: boolean;
};

export const ProductCard = observer(
  ({
    isHoverImageSwitchEnabled = false,
    product,
    priority = false,
  }: ProductCardProps) => {
    const favoritesStore = useContainer().get(FavoritesStore);
    const isFavorite = favoritesStore.isFavorite(product.id);

    return (
      <article {...stylex.props(styles.card)}>
        <ProductCardMedia
          isHoverImageSwitchEnabled={isHoverImageSwitchEnabled}
          isFavorite={isFavorite}
          priority={priority}
          product={product}
          onToggleFavorite={() => favoritesStore.toggleProduct(product)}
        />
        <ProductCardContent product={product} />
      </article>
    );
  },
);
