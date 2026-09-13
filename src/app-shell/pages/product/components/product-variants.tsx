"use client";

import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productSharedStyles } from "../product-shared.styles";
import { productVariantsStyles as styles } from "./product-variants.styles";

export const ProductVariants = observer(() => {
  const store = useProductPageStore();
  return (
    <div {...stylex.props(styles.groups)}>
      {store.product.variants.map((group) => (
        <fieldset key={group.id} {...stylex.props(styles.group)}>
          <legend {...stylex.props(productSharedStyles.subtitle, styles.label)}>
            {group.label}
          </legend>
          <div {...stylex.props(styles.options)}>
            {group.options.map((option) => (
              <button
                type="button"
                key={option.productId}
                aria-pressed={option.selected}
                onClick={() => store.selectVariant(option)}
                {...stylex.props(
                  styles.option,
                  option.selected && styles.selected,
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
});
