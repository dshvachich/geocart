"use client";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productSharedStyles as shared } from "../product-shared.styles";
import { ProductVariants } from "./product-variants";
import { ProductAttributeRow } from "./product-attribute-row";
import { productSummaryStyles as styles } from "./product-summary.styles";

export const ProductSummary = observer(() => {
  const store = useProductPageStore();
  const { product } = store;
  const { t } = useTranslation();
  return (
    <div {...stylex.props(styles.summary)}>
      {product.variants.length > 0 && (
        <div {...stylex.props(styles.section)}>
          <ProductVariants />
        </div>
      )}
      {(product.summary.length > 0 || product.attributeGroups.length > 0) && (
        <section {...stylex.props(styles.section)}>
          <h2 {...stylex.props(shared.subtitle)}>
            {t("productPage.specifications")}
          </h2>
          <dl {...stylex.props(styles.attributes)}>
            {product.summary.map((attribute) => (
              <ProductAttributeRow
                key={attribute.id}
                attribute={attribute}
                compact
              />
            ))}
          </dl>
          <button
            type="button"
            {...stylex.props(shared.button)}
            onClick={store.showSpecifications}
          >
            {t("productPage.allSpecifications")}
          </button>
        </section>
      )}
      {product.description && (
        <section {...stylex.props(styles.descriptionSection)}>
          <h2 {...stylex.props(shared.subtitle)}>
            {t("productPage.description")}
          </h2>
          <p
            id="product-description"
            {...stylex.props(
              styles.description,
              !store.isDescriptionExpanded && styles.clamped,
            )}
          >
            {product.description}
          </p>
          <button
            type="button"
            aria-expanded={store.isDescriptionExpanded}
            aria-controls="product-description"
            onClick={store.toggleDescription}
            {...stylex.props(shared.textButton)}
          >
            {t(
              store.isDescriptionExpanded
                ? "productPage.seeLess"
                : "productPage.seeMore",
            )}
          </button>
        </section>
      )}
    </div>
  );
});
