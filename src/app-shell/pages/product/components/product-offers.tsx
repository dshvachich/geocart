"use client";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productSharedStyles as shared } from "../product-shared.styles";
import { ProductOfferRow } from "./product-offer-row";
import { productOffersStyles as styles } from "./product-offers.styles";

export const ProductOffers = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  return (
    <section
      aria-labelledby="product-prices-heading"
      {...stylex.props(
        styles.section,
        store.activeTab === "prices" && styles.pricesTab,
      )}
    >
      <h2
        id="product-prices-heading"
        {...stylex.props(
          shared.sectionTitle,
          store.activeTab === "prices" && styles.hiddenMobileHeading,
        )}
      >
        {t("productPage.prices")}
      </h2>
      {store.visibleOffers.length === 0 && (
        <p {...stylex.props(shared.empty)}>{t("productPage.noOffers")}</p>
      )}
      {store.visibleOffers.map((offer) => (
        <ProductOfferRow key={offer.id} offer={offer} />
      ))}
      {store.activeTab === "overview" && store.product.offers.length > 3 && (
        <div {...stylex.props(styles.more)}>
          <button
            type="button"
            onClick={store.showPrices}
            {...stylex.props(shared.button, styles.moreButton)}
          >
            {t("productPage.viewAllOffers")}
          </button>
        </div>
      )}
    </section>
  );
});
