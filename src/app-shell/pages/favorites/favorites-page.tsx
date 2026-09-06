"use client";

import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { Navbar } from "@/app-shell/components/navbar";
import { ProductCard } from "@/app-shell/components/product-card";
import { productGridStyles } from "@/app-shell/components/product-grid.styles";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { FavoritesControls } from "./components/favorites-controls";
import { FavoritesEmptyState } from "./components/favorites-empty-state";
import { favoritesPageStyles as styles } from "./favorites-page.styles";

export const FavoritesPage = observer(() => {
  const { t } = useTranslation();
  const favoritesStore = useContainer().get(FavoritesStore);
  const products = favoritesStore.visibleProducts;

  return (
    <main {...stylex.props(layoutStyles.page)}>
      <Navbar />

      <section {...stylex.props(layoutStyles.section, styles.headerSection)}>
        <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
          <h1 {...stylex.props(styles.title)}>{t("favorites.title")}</h1>
        </div>
      </section>

      {favoritesStore.count > 0 && (
        <FavoritesControls categories={favoritesStore.categories} />
      )}

      {!favoritesStore.isHydrated && <SectionLoader />}

      {favoritesStore.isHydrated && favoritesStore.count === 0 && (
        <FavoritesEmptyState />
      )}

      {favoritesStore.isHydrated && products.length > 0 && (
        <section
          {...stylex.props(layoutStyles.section, styles.productsSection)}
          aria-label={t("favorites.title")}
        >
          <div
            {...stylex.props(
              productGridStyles.grid,
              productGridStyles.catalogGrid,
            )}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                isHoverImageSwitchEnabled
                product={product}
                priority={index < 6}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
      <MobileTabbar activeItem="favorites" />
    </main>
  );
});
