"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { Fragment, useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { Footer } from "@/app-shell/components/footer";
import { Navbar } from "@/app-shell/components/navbar";
import { ProductCard } from "@/app-shell/components/product-card";
import { productGridStyles } from "@/app-shell/components/product-grid";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchPageData } from "@/data/search-page";
import type {
  SearchActiveFilter,
  SearchBreadcrumb,
  SearchCategory,
  SearchSortOption,
} from "@/domain/entities";
import {
  createSearchHref,
  removeSearchParam,
  SEARCH_FILTERS_PAGE_PATH,
  setSearchParam,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { SearchPageStore } from "./search-page.store";

type SearchPageProps = {
  data: SearchPageData;
  searchParams: SearchQueryParams;
};

type SearchBreadcrumbsProps = {
  breadcrumbs: SearchBreadcrumb[];
  searchParams: SearchQueryParams;
};

type SearchQuickCategoriesProps = {
  categories: SearchCategory[];
  searchParams: SearchQueryParams;
};

type SearchControlsProps = {
  activeFilters: SearchActiveFilter[];
  onOpenSort: () => void;
  searchParams: SearchQueryParams;
};

type SortSheetProps = {
  onClose: () => void;
  options: SearchSortOption[];
  searchParams: SearchQueryParams;
};

const SearchBreadcrumbs = ({
  breadcrumbs,
  searchParams,
}: SearchBreadcrumbsProps) => {
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav {...stylex.props(styles.breadcrumbs)} aria-label="Breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={breadcrumb.id}>
          {index > 0 && (
            <Image
              {...stylex.props(styles.breadcrumbIcon)}
              src={uiAssets.angleRight}
              alt=""
              width={16}
              height={16}
            />
          )}
          <Link
            {...stylex.props(styles.breadcrumbLink)}
            href={createSearchHref(
              setSearchParam(searchParams, "category", breadcrumb.id),
            )}
          >
            {breadcrumb.title}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

const SearchQuickCategories = ({
  categories,
  searchParams,
}: SearchQuickCategoriesProps) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
      <div {...stylex.props(styles.categoryStrip)}>
        {categories.map((category) => (
          <Link
            {...stylex.props(
              styles.categoryPill,
              category.selected && styles.selectedCategoryPill,
            )}
            href={createSearchHref(
              setSearchParam(searchParams, "category", category.id),
            )}
            key={category.id}
          >
            {category.imageSrc && (
              <span {...stylex.props(styles.categoryThumb)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...stylex.props(styles.categoryThumbImage)}
                  src={category.imageSrc}
                  alt=""
                />
              </span>
            )}
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SearchControls = ({
  activeFilters,
  onOpenSort,
  searchParams,
}: SearchControlsProps) => (
  <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
    <div {...stylex.props(styles.controls)}>
      <div {...stylex.props(styles.actionGroup)}>
        <button
          {...stylex.props(styles.actionButton)}
          type="button"
          aria-label="Open sorting"
          onClick={onOpenSort}
        >
          <Image src={uiAssets.sort} alt="" width={24} height={24} />
        </button>
        <Link
          {...stylex.props(styles.actionButton)}
          href={createSearchHref(searchParams, SEARCH_FILTERS_PAGE_PATH)}
          aria-label="Open filters"
        >
          <Image src={uiAssets.filters} alt="" width={24} height={24} />
        </Link>
      </div>

      {activeFilters.length > 0 && (
        <>
          <span
            {...stylex.props(
              controlStyles.verticalDivider,
              controlStyles.verticalDividerCatalogMobile,
            )}
            aria-hidden="true"
          />
          <div {...stylex.props(styles.selectedFilters)}>
            {activeFilters.map((filter) => (
              <Link
                {...stylex.props(styles.selectedFilter)}
                href={createSearchHref(
                  removeSearchParam(searchParams, filter.paramKey),
                )}
                key={filter.id}
              >
                <span>{filter.title}</span>
                {Boolean(filter.count) && (
                  <span {...stylex.props(styles.selectedFilterCount)}>
                    +{filter.count}
                  </span>
                )}
                <Image src={uiAssets.delete} alt="" width={24} height={24} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  </section>
);

const SortSheet = ({ onClose, options, searchParams }: SortSheetProps) => (
  <div
    {...stylex.props(styles.sheetOverlay)}
    role="dialog"
    aria-modal="true"
    aria-labelledby="search-sort-title"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }}
  >
    <div {...stylex.props(styles.sortSheet)}>
      <div {...stylex.props(styles.sortTitleRow)}>
        <h2 {...stylex.props(styles.sortTitle)} id="search-sort-title">
          Show first
        </h2>
      </div>

      <div {...stylex.props(styles.sortOptions)}>
        {options.map((option) => (
          <Link
            {...stylex.props(styles.sortOption)}
            href={createSearchHref({
              ...searchParams,
              sort: option.sort,
              sortOrder: option.sortOrder,
            })}
            key={option.id}
            onClick={onClose}
          >
            <span {...stylex.props(styles.sortOptionText)}>{option.title}</span>
            {option.isSelected && (
              <Image src={uiAssets.checkmark} alt="" width={24} height={24} />
            )}
          </Link>
        ))}
      </div>

      <div {...stylex.props(styles.sortFooter)}>
        <button
          {...stylex.props(styles.sortCancel)}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export const SearchPage = observer(
  ({ data, searchParams }: SearchPageProps) => {
    const searchPageStore = useMemo(() => new SearchPageStore(), []);

    return (
      <main {...stylex.props(layoutStyles.page)}>
        <Navbar />

        <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
          <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
            <SearchBreadcrumbs
              breadcrumbs={data.breadcrumbs}
              searchParams={searchParams}
            />
            {data.eyebrow && (
              <p {...stylex.props(styles.eyebrow)}>{data.eyebrow}</p>
            )}
            <h1 {...stylex.props(styles.title)}>{data.title}</h1>
          </div>
        </section>

        <SearchQuickCategories
          categories={data.quickCategories}
          searchParams={searchParams}
        />
        <SearchControls
          activeFilters={data.activeFilters}
          onOpenSort={searchPageStore.openSort}
          searchParams={searchParams}
        />

        <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
          <div
            {...stylex.props(
              productGridStyles.grid,
              productGridStyles.catalogGrid,
            )}
          >
            {data.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </section>

        <SectionLoader />
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

const styles = stylex.create({
  surfaceSection: {
    backgroundColor: "var(--color-bg-primary)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: {
      default: 24,
      "@media (max-width: 760px)": 16,
    },
    paddingBottom: {
      default: 16,
      "@media (max-width: 760px)": 8,
    },
  },
  breadcrumbs: {
    display: "flex",
    gap: 4,
    alignItems: "center",
    minHeight: 20,
    overflowX: "auto",
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    lineHeight: "20px",
    scrollbarWidth: "none",
    whiteSpace: "nowrap",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  breadcrumbIcon: {
    width: 16,
    height: 16,
    flex: "0 0 auto",
    objectFit: "contain",
  },
  breadcrumbLink: {
    flex: "0 0 auto",
  },
  eyebrow: {
    margin: 0,
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  title: {
    maxWidth: {
      default: 760,
      "@media (max-width: 760px)": "none",
    },
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 36,
      "@media (max-width: 760px)": 24,
    },
    fontWeight: 600,
    lineHeight: {
      default: "44px",
      "@media (max-width: 760px)": "32px",
    },
    letterSpacing: 0,
  },
  categoryStrip: {
    display: "flex",
    gap: 8,
    width: "100%",
    maxWidth: {
      default: "var(--layout-max-width)",
      "@media (max-width: 760px)": "none",
    },
    marginInline: "auto",
    overflowX: "auto",
    scrollbarWidth: "none",
    padding: {
      default: "8px var(--layout-gutter) 16px",
      "@media (max-width: 760px)": "8px 0 16px var(--layout-gutter-mobile)",
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  categoryPill: {
    display: "inline-flex",
    flex: "0 0 auto",
    alignItems: "center",
    gap: 12,
    height: 64,
    padding: "8px 24px 8px 8px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: 16,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
  },
  selectedCategoryPill: {
    borderColor: "var(--color-divider-soft)",
    backgroundColor: "var(--color-bg-primary)",
    boxShadow: "0 2px 4px rgb(0 0 0 / 6%)",
  },
  categoryThumb: {
    display: "flex",
    width: 48,
    height: 48,
    flex: "0 0 auto",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "var(--color-bg-secondary)",
  },
  categoryThumbImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    mixBlendMode: "darken",
  },
  controls: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    width: "100%",
    maxWidth: {
      default: "var(--layout-max-width)",
      "@media (max-width: 760px)": "none",
    },
    marginInline: "auto",
    overflowX: "auto",
    scrollbarWidth: "none",
    padding: {
      default: "8px var(--layout-gutter) 16px",
      "@media (max-width: 760px)": "8px 0 16px var(--layout-gutter-mobile)",
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  actionGroup: {
    display: "flex",
    flex: "0 0 auto",
    gap: 4,
    alignItems: "center",
  },
  actionButton: {
    display: "inline-flex",
    minWidth: 48,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
  },
  selectedFilters: {
    display: "flex",
    flex: "0 0 auto",
    gap: 4,
    alignItems: "center",
  },
  selectedFilter: {
    display: "inline-flex",
    height: 32,
    flex: "0 0 auto",
    alignItems: "center",
    gap: 4,
    padding: "4px 8px 4px 12px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    whiteSpace: "nowrap",
  },
  selectedFilterCount: {
    color: "var(--color-fg-secondary)",
    fontSize: 16,
    lineHeight: "24px",
  },
  sheetOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 90,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "var(--color-overlay)",
  },
  sortSheet: {
    display: "flex",
    width: "100%",
    maxWidth: {
      default: 480,
      "@media (max-width: 760px)": "none",
    },
    flexDirection: "column",
    padding: "16px 0",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-divider-light)",
    borderBottomWidth: 0,
    borderRadius: "24px 24px 0 0",
    backgroundColor: "var(--color-bg-primary)",
    boxShadow: "var(--shadow-dropdown)",
  },
  sortTitleRow: {
    display: "flex",
    alignItems: "center",
    minHeight: 40,
    padding: "8px 16px",
  },
  sortTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "24px",
  },
  sortOptions: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 16,
  },
  sortOption: {
    display: "flex",
    minHeight: 40,
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    textAlign: "left",
  },
  sortOptionText: {
    flex: "1 1 auto",
  },
  sortFooter: {
    padding: "0 16px",
  },
  sortCancel: {
    width: "100%",
    height: 40,
    padding: "8px 16px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-secondary)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
  },
});
