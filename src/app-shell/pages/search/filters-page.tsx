import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import type { SearchFiltersPageData } from "@/data/search-page";
import type {
  SearchFilter,
  SearchFilterVariant,
  SearchSelectableFilter,
} from "@/domain/entities";
import {
  createSearchHref,
  SEARCH_FILTERS_PAGE_PATH,
  setSearchParam,
  toggleCommaSeparatedSearchParam,
  type SearchQueryParams,
} from "@/utils/search-query-utils";

type FiltersPageProps = {
  data: SearchFiltersPageData;
  searchParams: SearchQueryParams;
};

type FilterGroupProps = {
  filter: SearchFilter;
  searchParams: SearchQueryParams;
};

type FilterTagProps = {
  filter: SearchSelectableFilter;
  option: SearchFilterVariant;
  searchParams: SearchQueryParams;
};

const isPriceFilter = (filter: SearchFilter) =>
  filter.label.toLowerCase().includes("price") || filter.label.includes("₾");

const formatRangeValue = (filter: SearchFilter, value: number) => {
  if (filter.type !== "range") {
    return String(value);
  }

  return `${value}${isPriceFilter(filter) ? " ₾" : ""}`;
};

const getVariantLabel = (variant: SearchFilterVariant) =>
  variant.label?.trim() || variant.value;

const getFilterTagHref = ({ filter, option, searchParams }: FilterTagProps) => {
  if (filter.type === "toggle") {
    return createSearchHref(
      setSearchParam(
        searchParams,
        filter.id,
        option.selected ? undefined : option.value,
      ),
      SEARCH_FILTERS_PAGE_PATH,
    );
  }

  return createSearchHref(
    toggleCommaSeparatedSearchParam({
      key: filter.id,
      params: searchParams,
      value: option.value,
    }),
    SEARCH_FILTERS_PAGE_PATH,
  );
};

const FilterTag = ({ filter, option, searchParams }: FilterTagProps) => (
  <Link
    {...stylex.props(styles.filterTag, option.selected && styles.selectedTag)}
    href={getFilterTagHref({ filter, option, searchParams })}
  >
    {getVariantLabel(option)}
  </Link>
);

const FilterHeader = ({ filter }: Pick<FilterGroupProps, "filter">) => (
  <button {...stylex.props(styles.filterHeader)} type="button">
    <span {...stylex.props(styles.filterHeaderText)}>{filter.label}</span>
    <Image
      {...stylex.props(iconStyles.icon)}
      src={filter.type === "collapsed" ? uiAssets.angleDown : uiAssets.angleUp}
      alt=""
      width={24}
      height={24}
    />
  </button>
);

const RangeFilter = ({ filter }: FilterGroupProps) => {
  if (filter.type !== "range") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader filter={filter} />
      <div {...stylex.props(styles.filterBody)}>
        <div {...stylex.props(styles.rangePair)}>
          <div {...stylex.props(styles.inputValue)}>
            From {formatRangeValue(filter, filter.selectedMin)}
          </div>
          <div {...stylex.props(styles.inputValue, styles.mutedInputValue)}>
            To {formatRangeValue(filter, filter.selectedMax)}
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};

const SelectableFilter = ({ filter, searchParams }: FilterGroupProps) => {
  if (filter.type === "range" || filter.type === "collapsed") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader filter={filter} />
      <div {...stylex.props(styles.filterBody, styles.filterBodyWithTags)}>
        <div {...stylex.props(styles.tags)}>
          {filter.variants.map((option) => (
            <FilterTag
              key={option.value}
              filter={filter}
              option={option}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};

const CollapsedFilter = ({ filter }: FilterGroupProps) => {
  if (filter.type !== "collapsed") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader filter={filter} />
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};

const FilterGroup = ({ filter, searchParams }: FilterGroupProps) => {
  if (filter.type === "range") {
    return <RangeFilter filter={filter} searchParams={searchParams} />;
  }

  if (filter.type === "checkbox" || filter.type === "toggle") {
    return <SelectableFilter filter={filter} searchParams={searchParams} />;
  }

  return <CollapsedFilter filter={filter} searchParams={searchParams} />;
};

export const FiltersPage = ({ data, searchParams }: FiltersPageProps) => (
  <main {...stylex.props(styles.page)}>
    <header {...stylex.props(styles.topbar)}>
      <h1 {...stylex.props(styles.title)}>Filters</h1>
      <Link
        {...stylex.props(controlStyles.iconButton, styles.closeButton)}
        href={createSearchHref(searchParams)}
        aria-label="Close filters"
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.close}
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </header>

    <div {...stylex.props(styles.list)}>
      {data.filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          filter={filter}
          searchParams={searchParams}
        />
      ))}
    </div>
  </main>
);

const styles = stylex.create({
  page: {
    width: "100%",
    maxWidth: {
      default: 480,
      "@media (max-width: 760px)": "none",
    },
    minHeight: "100vh",
    marginInline: "auto",
    backgroundColor: "var(--color-bg-primary)",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    minHeight: 56,
    padding: "8px 16px",
  },
  title: {
    flex: "1 1 auto",
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "24px",
  },
  closeButton: {
    flex: "0 0 auto",
    backgroundColor: "var(--color-bg-secondary)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    padding: "0 16px 32px",
  },
  filterGroup: {
    width: "100%",
  },
  filterHeader: {
    display: "flex",
    width: "100%",
    minHeight: 47,
    alignItems: "center",
    gap: 8,
    padding: "12px 0 11px",
    borderWidth: 0,
    backgroundColor: "var(--color-bg-primary)",
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    lineHeight: "20px",
    textAlign: "left",
  },
  filterHeaderText: {
    flex: "1 1 auto",
  },
  filterBody: {
    paddingBottom: 16,
  },
  filterBodyWithTags: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  rangePair: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  inputValue: {
    display: "flex",
    height: 40,
    flex: "1 1 0",
    alignItems: "center",
    minWidth: 0,
    padding: "8px 12px",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: 16,
    lineHeight: "24px",
    whiteSpace: "nowrap",
  },
  mutedInputValue: {
    color: "var(--color-fg-secondary)",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "center",
  },
  filterTag: {
    display: "inline-flex",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderWidth: 0,
    borderRadius: 24,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    whiteSpace: "nowrap",
  },
  selectedTag: {
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-on-dark)",
  },
  divider: {
    height: 1,
    backgroundColor: "var(--color-divider-light)",
  },
});
