"use client";

import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { Navbar } from "@/app-shell/components/navbar";
import { ProductCard } from "@/app-shell/components/product-card";
import { productGridStyles } from "@/app-shell/components/product-grid";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { FavoritesControls } from "./components/favorites-controls";
import { FavoritesEmptyState } from "./components/favorites-empty-state";

export const FavoritesPage = observer(() => {
  const favoritesStore = useContainer().get(FavoritesStore);
  const products = favoritesStore.visibleProducts;

  return (
    <main {...stylex.props(layoutStyles.page)}>
      <Navbar />

      <section {...stylex.props(layoutStyles.section, styles.headerSection)}>
        <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
          <h1 {...stylex.props(styles.title)}>Favorite products</h1>
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
          aria-label="Favorite products"
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
                product={product}
                priority={index < 6}
              />
            ))}
          </div>
        </section>
      )}

      {favoritesStore.isHydrated && products.length > 0 && <SectionLoader />}
      <Footer />
      <MobileTabbar activeItem="favorites" />
    </main>
  );
});

const styles = stylex.create({
  headerSection: {
    backgroundColor: "var(--color-bg-primary)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingTop: {
      default: 24,
      "@media (max-width: 760px)": 16,
    },
    paddingBottom: {
      default: 16,
      "@media (max-width: 760px)": 8,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  title: {
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 28,
      "@media (max-width: 760px)": 24,
    },
    fontWeight: 600,
    lineHeight: {
      default: "40px",
      "@media (max-width: 760px)": "32px",
    },
    letterSpacing: 0,
  },
  productsSection: {
    backgroundColor: "var(--color-bg-primary)",
  },
});
