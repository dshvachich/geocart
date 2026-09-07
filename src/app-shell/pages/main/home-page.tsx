"use client";

import { CategoryBar } from "@/app-shell/components/category-bar";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { Navbar } from "@/app-shell/components/navbar";
import { ProductGrid } from "@/app-shell/components/product-grid";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { AppStore } from "@/app-shell/app-store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { HomePageData } from "@/domain/entities";
import { useContainer } from "@/di/di-provider";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { homePageStyles as styles } from "./home-page.styles";
import { HomePageStore } from "./home-page.store";

type HomePageProps = {
  initialData: HomePageData;
};

const PRODUCTS_PRELOAD_ROOT_MARGIN = "1200px 0px";

export const HomePage = observer(({ initialData }: HomePageProps) => {
  const container = useContainer();
  const appStore = container.get(AppStore);
  const paginationBoundaryRef = useRef<HTMLDivElement | null>(null);
  const homePageStore = useMemo(() => new HomePageStore(initialData), [
    initialData,
  ]);
  const hasMoreProducts = homePageStore.hasMoreProducts;
  const isLoadingMore = homePageStore.isLoadingMore;
  const hasPaginationSlot = hasMoreProducts || isLoadingMore;

  useEffect(() => {
    const paginationBoundary = paginationBoundaryRef.current;

    if (!paginationBoundary || !hasMoreProducts || isLoadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void homePageStore.loadMoreProducts(appStore.language);
        }
      },
      {
        rootMargin: PRODUCTS_PRELOAD_ROOT_MARGIN,
      },
    );

    observer.observe(paginationBoundary);

    return () => observer.disconnect();
  }, [appStore.language, hasMoreProducts, homePageStore, isLoadingMore]);

  return (
    <main {...stylex.props(layoutStyles.page)}>
      <Navbar />
      <CategoryBar categories={initialData.categories} />
      <ProductGrid
        isHoverImageSwitchEnabled
        products={homePageStore.products}
      />
      {hasPaginationSlot && (
        <div {...stylex.props(styles.paginationSlot)}>
          {isLoadingMore && <SectionLoader />}
          {hasMoreProducts && (
            <div
              {...stylex.props(styles.paginationBoundary)}
              ref={paginationBoundaryRef}
              aria-hidden="true"
            />
          )}
        </div>
      )}
      {!hasPaginationSlot && (
        <div {...stylex.props(layoutStyles.footerGap)} aria-hidden="true" />
      )}
      <Footer />
      <MobileTabbar />
    </main>
  );
});
