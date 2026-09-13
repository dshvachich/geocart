import * as stylex from "@stylexjs/stylex";
import { observer } from "mobx-react-lite";
import { type PointerEvent, type ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domain/entities";
import { normalizeProductImages } from "@/domain/helpers/product-images.helpers";
import { ProductFavoriteButton } from "./product-favorite-button";
import { productCardStyles as styles } from "./product-card.styles";
import { ProductCardMediaStore } from "./product-card-media.store";
import { ProductImageIndicators } from "./product-image-indicators";
import Link from 'next/link';
import { createProductHref } from '@/utils/product-url-utils';

type ProductCardMediaProps = {
  isHoverImageSwitchEnabled: boolean;
  isTouchImageSwitchEnabled?: boolean;
  action?: ReactNode;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  priority: boolean;
  product: Product;
};

const getProductImages = (product: Product) => {
  return normalizeProductImages([product.imageSrc, ...(product.images ?? [])]);
};

export const ProductCardMedia = observer(({
  isHoverImageSwitchEnabled,
  isTouchImageSwitchEnabled = true,
  action,
  isFavorite = false,
  onToggleFavorite,
  priority,
  product,
}: ProductCardMediaProps) => {
  const { t } = useTranslation();
  const images = useMemo(() => getProductImages(product), [product]);
  const mediaStore = useMemo(
    () => new ProductCardMediaStore(images),
    [images],
  );
  const activeImageSrc = mediaStore.activeImageSrc;

  const handleImageFramePointerDown = (
    event: PointerEvent<HTMLSpanElement>,
  ) => {
    if (!isTouchImageSwitchEnabled || event.pointerType !== "touch" || !mediaStore.hasMultipleImages) {
      return;
    }

    mediaStore.startSwipe(event.clientX, event.clientY);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleImageFramePointerMove = (
    event: PointerEvent<HTMLSpanElement>,
  ) => {
    if (
      event.pointerType !== "mouse" ||
      !isHoverImageSwitchEnabled ||
      !mediaStore.hasMultipleImages
    ) {
      return;
    }

    const { left, width } = event.currentTarget.getBoundingClientRect();

    if (width <= 0) {
      return;
    }

    mediaStore.showImageAtPosition((event.clientX - left) / width);
  };

  const handleImageFramePointerLeave = (
    event: PointerEvent<HTMLSpanElement>,
  ) => {
    if (event.pointerType !== "mouse" || !isHoverImageSwitchEnabled) {
      return;
    }

    mediaStore.resetImage();
  };

  const handleImageFramePointerUp = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }

    mediaStore.finishSwipe(event.clientX, event.clientY);

    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleImageFramePointerCancel = (
    event: PointerEvent<HTMLSpanElement>,
  ) => {
    if (event.pointerType !== "touch") {
      return;
    }

    mediaStore.cancelSwipe();

    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div {...stylex.props(styles.media)}>
      <Link
        href={createProductHref(product.slug)}
        aria-label={product.name}
        onClick={mediaStore.handleClick}
        {...stylex.props(styles.imageFrame, !isTouchImageSwitchEnabled && styles.scrollableImageFrame)}
        onPointerCancel={handleImageFramePointerCancel}
        onPointerDown={handleImageFramePointerDown}
        onPointerLeave={handleImageFramePointerLeave}
        onPointerMove={handleImageFramePointerMove}
        onPointerUp={handleImageFramePointerUp}
      >
        {activeImageSrc && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...stylex.props(
                styles.productImage,
                product.imageFit === "cover" && styles.coverImage,
              )}
              src={activeImageSrc}
              alt={product.name}
              loading={priority ? "eager" : "lazy"}
            />
          </>
        )}
      </Link>

      {product.isNew && (
        <span {...stylex.props(styles.tag)}>{t("product.new")}</span>
      )}

      {action ?? (onToggleFavorite && <ProductFavoriteButton
        isFavorite={isFavorite}
        productName={product.name}
        onToggleFavorite={onToggleFavorite}
      />)}

      {mediaStore.hasMultipleImages && (
        <ProductImageIndicators
          activeIndex={mediaStore.activeIndex}
          count={mediaStore.count}
        />
      )}
    </div>
  );
});
