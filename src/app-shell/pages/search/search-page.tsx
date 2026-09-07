"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { Footer } from "@/app-shell/components/footer";
import { Navbar } from "@/app-shell/components/navbar";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchPageData } from "@/domain/entities";
import { useContainer } from "@/di/di-provider";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { DesktopSearchFilters } from "./components/desktop-search-filters";
import { SearchControls } from "./components/search-controls";
import { SearchHeader } from "./components/search-header";
import { SearchQuickCategories } from "./components/search-quick-categories";
import { SearchResultsGrid } from "./components/search-results-grid";
import { SortSheet } from "./components/sort-sheet";
import { SearchPageStore } from "./search-page.store";
import { searchPageStyles as styles } from "./search-page.styles";

type SearchPageProps = {
  data: SearchPageData;
  searchParams: SearchQueryParams;
};

const PRODUCTS_PRELOAD_ROOT_MARGIN = "1200px 0px";

export const SearchPage = observer(
  ({ data, searchParams }: SearchPageProps) => {
    const container = useContainer();
    const appStore = container.get(AppStore);
    const paginationBoundaryRef = useRef<HTMLDivElement | null>(null);
    const searchPageStore = useMemo(
      () => new SearchPageStore(data, searchParams),
      [data, searchParams],
    );
    const hasMoreProducts = searchPageStore.hasMoreProducts;
    const isLoadingMore = searchPageStore.isLoadingMore;
    const hasPaginationSlot = hasMoreProducts || isLoadingMore;

    useEffect(() => {
      const paginationBoundary = paginationBoundaryRef.current;

      if (!paginationBoundary || !hasMoreProducts || isLoadingMore) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            void searchPageStore.loadMoreProducts(appStore.language);
          }
        },
        {
          rootMargin: PRODUCTS_PRELOAD_ROOT_MARGIN,
        },
      );

      observer.observe(paginationBoundary);

      return () => observer.disconnect();
    }, [appStore.language, hasMoreProducts, isLoadingMore, searchPageStore]);

    return (
      <main {...stylex.props(layoutStyles.page)}>
        <Navbar />

        <SearchHeader
          showEyebrow={Boolean(searchParams.q?.trim())}
          title={data.title}
        />
        <SearchQuickCategories
          categories={data.quickCategories}
          searchParams={searchParams}
        />

        <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
          <div {...stylex.props(layoutStyles.contentRail, styles.content)}>
            <DesktopSearchFilters
              filters={data.filters}
              searchParams={searchParams}
            />
            <div {...stylex.props(styles.resultsPane)}>
              <SearchControls
                activeFilters={data.activeFilters}
                onOpenSort={searchPageStore.openSort}
                searchParams={searchParams}
                sortOptions={data.sortOptions}
              />
              <SearchResultsGrid
                hasMoreProducts={hasMoreProducts}
                isLoadingMore={isLoadingMore}
                paginationBoundaryRef={paginationBoundaryRef}
                products={searchPageStore.products}
              />
            </div>
          </div>
        </section>
        {!hasPaginationSlot && (
          <div {...stylex.props(layoutStyles.footerGap)} aria-hidden="true" />
        )}

        <Footer />

        {searchPageStore.isSortOpen && (
          <SortSheet
            options={data.sortOptions}
            searchParams={searchParams}
            onClose={searchPageStore.closeSort}
          />
        )}
      </main>
    );
  },
);
