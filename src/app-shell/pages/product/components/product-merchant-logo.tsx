"use client";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productMerchantLogoStyles as styles } from "./product-merchant-logo.styles";

type Props = { src: string; small?: boolean };

export const ProductMerchantLogo = observer(({ src, small = false }: Props) => {
  const store = useProductPageStore();
  const hasLogo = Boolean(src) && !store.failedMerchantLogos.has(src);
  if (!hasLogo) {
    return null;
  }
  return (
    <span {...stylex.props(styles.container, small && styles.small)}>
      <Image
        unoptimized
        src={src}
        alt=""
        width={40}
        height={40}
        onError={() => store.hideMerchantLogo(src)}
        {...stylex.props(styles.logo)}
      />
    </span>
  );
});
