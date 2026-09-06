"use client";

import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { Footer } from "@/app-shell/components/footer";
import { Navbar } from "@/app-shell/components/navbar";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchPageData } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { DesktopSearchFilters } from "./components/desktop-search-filters";
import { SearchControls } from "./components/search-controls";
import { SearchHeader } from "./components/search-header";
import { SearchResultsGrid } from "./components/search-results-grid";
import { SortSheet } from "./components/sort-sheet";
import { SearchPageStore } from "./search-page.store";
import { searchPageStyles as styles } from "./search-page.styles";

type SearchPageProps = {
  data: SearchPageData;
  searchParams: SearchQueryParams;
};

export const SearchPage = observer(
  ({ data, searchParams }: SearchPageProps) => {
    const searchPageStore = useMemo(() => new SearchPageStore(), []);

    return (
      <main {...stylex.props(layoutStyles.page)}>
        <Navbar />

        <SearchHeader
          breadcrumbs={data.breadcrumbs}
          eyebrow={data.eyebrow}
          title={data.title}
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
              <SearchResultsGrid products={data.products} />
              {data.hasMoreProducts && <SectionLoader />}
            </div>
          </div>
        </section>

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
