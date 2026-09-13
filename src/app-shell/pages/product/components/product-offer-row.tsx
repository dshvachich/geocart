"use client";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { ProductOffer } from "@/domain/entities/product-details";
import { getOfferPriceDifference } from "@/domain/helpers/product-details.helpers";
import { formatPrice } from "@/utils/string-utils";
import { useProductPageStore } from "../product-page.context";
import { ProductMerchantLogo } from "./product-merchant-logo";
import { productSharedStyles as shared } from "../product-shared.styles";
import { productOfferRowStyles as styles } from "./product-offer-row.styles";

type Props = { offer: ProductOffer };

export const ProductOfferRow = observer(({ offer }: Props) => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  const best = store.bestOffer;
  const isBest = best?.price === offer.price;
  const difference = best ? getOfferPriceDifference(offer, best) : 0;
  return (
    <article {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.merchant)}>
        <ProductMerchantLogo src={offer.merchant.logoUrl} />
        <div {...stylex.props(styles.merchantInfo)}>
          <a
            href={offer.merchant.url}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.name)}
          >
            {offer.merchant.name}
          </a>
          {offer.merchant.phone &&
            (store.revealedPhones.has(offer.id) ? (
              <a
                href={`tel:${offer.merchant.phone.replace(/[^+\d]/g, "")}`}
                {...stylex.props(styles.phone)}
              >
                {offer.merchant.phone}
              </a>
            ) : (
              <button
                type="button"
                {...stylex.props(styles.phone)}
                onClick={() => store.revealPhone(offer.id)}
              >
                <Image src={uiAssets.call} alt="" width={16} height={16} />
                {t("productPage.showPhone")}
              </button>
            ))}
        </div>
      </div>
      <div {...stylex.props(styles.details)}>
        <a
          href={offer.merchant.url}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.learnMore)}
        >
          <span {...stylex.props(styles.learnMore)}>
            {t("productPage.shopDetails")}
          </span>
        </a>
      </div>
      <div {...stylex.props(styles.purchase)}>
        <div {...stylex.props(styles.price)}>
          <p {...stylex.props(shared.price, isBest && shared.bestPrice)}>
            {formatPrice(offer.price, store.product.currency, "").trim()}
          </p>
          {isBest && (
            <span {...stylex.props(styles.comparison)}>
              {t("productPage.bestPrice")}
            </span>
          )}
          {!isBest && difference > 0 && (
            <span {...stylex.props(styles.comparison)}>
              {t("productPage.priceDifference", { percent: difference })}
            </span>
          )}
        </div>
        <a
          href={offer.url}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(shared.button, shared.buyButton, styles.buyLink)}
          aria-label={t("productPage.buyAt", { merchant: offer.merchant.name })}
        >
          <span {...stylex.props(shared.onAccent, styles.buyLabel)}>
            {t("productPage.buy")}
          </span>
          <Image
            src={uiAssets.productBuyArrow}
            alt=""
            width={24}
            height={24}
            {...stylex.props(shared.buyArrow, styles.buyIcon)}
          />
        </a>
      </div>
    </article>
  );
});
