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
import { productBestOfferStyles as styles } from "./product-best-offer.styles";

export const ProductBestOffer = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  const offer = store.bestOffer;
  if (!offer) {
    return null;
  }
  const price = formatPrice(offer.price, store.product.currency, "").trim();
  return (
    <aside
      {...stylex.props(styles.aside)}
      aria-label={t("productPage.bestPrice")}
    >
      <div {...stylex.props(styles.pricePanel)}>
        <p {...stylex.props(styles.label)}>{t("productPage.bestPrice")}</p>
        <div {...stylex.props(styles.prices)}>
          <p {...stylex.props(shared.price, shared.bestPrice)}>{price}</p>
          {store.discount > 0 && (
            <span {...stylex.props(styles.discount)}>
              <s>
                {formatPrice(
                  offer.originalPrice,
                  store.product.currency,
                  "",
                ).trim()}
              </s>{" "}
              −{store.discount}%
            </span>
          )}
        </div>
      </div>
      <div {...stylex.props(styles.merchant)}>
        <ProductMerchantLogo src={offer.merchant.logoUrl} />
        <a
          href={offer.merchant.url}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.name)}
        >
          {offer.merchant.name}
        </a>
        <a
          href={offer.url}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(shared.button, shared.buyButton)}
          aria-label={t("productPage.buyAt", { merchant: offer.merchant.name })}
        >
          <span {...stylex.props(shared.onAccent)}>{t("productPage.buy")}</span>
        </a>
      </div>
      {store.activeTab === "overview" && (
        <button
          type="button"
          onClick={store.showPrices}
          {...stylex.props(styles.allOffers)}
        >
          <span {...stylex.props(styles.storeIcon)}>
            <Image src={uiAssets.storefront} alt="" width={24} height={24} />
          </span>
          <span {...stylex.props(styles.allOffersText)}>
            <span>
              {t("productPage.allOffers", {
                count: store.product.offers.length,
              })}
            </span>
            <span {...stylex.props(styles.from)}>
              {formatPrice(
                offer.price,
                store.product.currency,
                t("product.from"),
              )}
            </span>
          </span>
          <Image src={uiAssets.angleRight} alt="" width={24} height={24} />
        </button>
      )}
    </aside>
  );
});
