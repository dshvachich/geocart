"use client";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productGalleryStyles as styles } from "./product-gallery.styles";

export const ProductGallery = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  if (!store.activeImage) {
    return null;
  }
  return (
    <div {...stylex.props(styles.gallery)}>
      <div {...stylex.props(styles.main)}>
        <Image
          unoptimized
          priority
          src={store.activeImage}
          alt={store.product.name}
          width={468}
          height={468}
          {...stylex.props(styles.image)}
        />
      </div>
      {store.product.images.length > 0 && (
        <div
          {...stylex.props(
            styles.thumbnails,
            store.product.images.length === 1 && styles.singleImage,
          )}
          aria-label={t("productPage.images")}
        >
          {store.product.images.map((src, index) => (
            <button
              type="button"
              key={src}
              aria-label={t("productPage.image", { number: index + 1 })}
              aria-pressed={index === store.activeImageIndex}
              onClick={() => store.selectImage(index)}
              {...stylex.props(
                styles.thumbnail,
                index === store.activeImageIndex && styles.selected,
              )}
            >
              <Image
                unoptimized
                src={src}
                alt=""
                width={64}
                height={64}
                {...stylex.props(styles.thumbnailImage)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
