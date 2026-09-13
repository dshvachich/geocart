"use client";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { formatPrice } from "@/utils/string-utils";
import { useProductPageStore } from "../product-page.context";
import { ProductMerchantLogo } from "./product-merchant-logo";
import { productSharedStyles as shared } from "../product-shared.styles";
import { productMobileBestOfferStyles as styles } from "./product-mobile-best-offer.styles";

export const ProductMobileBestOffer = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  const offer = store.bestOffer;
  if (!offer) {
    return null;
  }

  return (
    <aside
      {...stylex.props(styles.bar)}
      aria-label={t("productPage.bestPrice")}
    >
      <div {...stylex.props(styles.content)}>
        <p {...stylex.props(shared.price, styles.price)}>
          {formatPrice(offer.price, store.product.currency, "").trim()}
        </p>
        <div {...stylex.props(styles.details)}>
          <button
            type="button"
            onClick={store.showPrices}
            {...stylex.props(styles.label)}
          >
            {t("productPage.bestPrice")}
            <Image src={uiAssets.angleRight} alt="" width={16} height={16} />
          </button>
          <a
            href={offer.merchant.url}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.merchant)}
          >
            <ProductMerchantLogo src={offer.merchant.logoUrl} small />
            <span {...stylex.props(styles.name)}>{offer.merchant.name}</span>
          </a>
        </div>
      </div>
      <a
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("productPage.buyAt", { merchant: offer.merchant.name })}
        {...stylex.props(shared.buyButton, shared.mobileBuyButton)}
      >
        <Image
          src={uiAssets.productBuyArrow}
          alt=""
          width={24}
          height={24}
          {...stylex.props(shared.buyArrow)}
        />
      </a>
    </aside>
  );
});
