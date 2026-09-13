"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { Navbar } from "@/app-shell/components/navbar";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { ComparisonStore } from "@/app-shell/stores/comparison.store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { ProductDetails } from "@/domain/entities/product-details";
import type { ProductListResult } from "@/domain/entities/product";
import type { SupportedLocale } from "@/domain/types/locale";
import { useContainer } from "@/di/di-provider";
import { ProductPageContext } from "./product-page.context";
import { ProductPageStore } from "./product-page.store";
import { productPageStyles as styles } from "./product-page.styles";
import { ProductHeader } from "./components/product-header";
import { ProductTabs } from "./components/product-tabs";
import { ProductOverview } from "./components/product-overview";
import { ProductOffers } from "./components/product-offers";
import { ProductSpecifications } from "./components/product-specifications";
import { ProductBestOffer } from "./components/product-best-offer";
import { ProductMoreProducts } from "./components/product-more-products";
import { ProductMobileBestOffer } from "./components/product-mobile-best-offer";

type Props = {
  product: ProductDetails;
  recommendations: ProductListResult;
  locale: SupportedLocale;
};

export const ProductPage = observer(
  ({ product, recommendations, locale }: Props) => {
    const router = useRouter();
    const favorites = useContainer().get(FavoritesStore);
    const comparison = useContainer().get(ComparisonStore);
    const store = useMemo(
      () =>
        new ProductPageStore(
          product,
          favorites,
          router.push,
          recommendations,
          locale,
          comparison,
        ),
      [product, favorites, router, recommendations, locale, comparison],
    );
    return (
      <ProductPageContext.Provider value={store}>
        <main
          {...stylex.props(
            layoutStyles.page,
            styles.page,
            !!store.bestOffer && styles.pageWithOffer,
          )}
        >
          <Navbar />
          <ProductHeader />
          <ProductTabs />
          <div {...stylex.props(layoutStyles.contentRail, styles.content)}>
            <div
              id={`product-panel-${store.activeTab}`}
              role="tabpanel"
              aria-labelledby={`product-tab-${store.activeTab}`}
              {...stylex.props(styles.primary)}
            >
              {store.activeTab === "overview" && <ProductOverview />}
              {store.activeTab !== "specifications" && <ProductOffers />}
              {store.activeTab === "specifications" && (
                <ProductSpecifications />
              )}
            </div>
            <ProductBestOffer />
          </div>
          <div
            {...stylex.props(
              store.activeTab !== "overview" && styles.desktopOnly,
            )}
          >
            <ProductMoreProducts />
            <div {...stylex.props(layoutStyles.footerGap)} />
            <Footer />
          </div>
          <ProductMobileBestOffer />
          <MobileTabbar activeItem={null} respectSafeArea />
        </main>
      </ProductPageContext.Provider>
    );
  },
);
