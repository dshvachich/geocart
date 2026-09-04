import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchActiveFilter } from "@/domain/entities";
import {
  createSearchHref,
  removeSearchParam,
  SEARCH_FILTERS_PAGE_PATH,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchControlsProps = {
  activeFilters: SearchActiveFilter[];
  onOpenSort: () => void;
  searchParams: SearchQueryParams;
};

export const SearchControls = ({
  activeFilters,
  onOpenSort,
  searchParams,
}: SearchControlsProps) => {
  const { t } = useTranslation();

  return (
    <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
      <div {...stylex.props(styles.controls)}>
        <div {...stylex.props(styles.actionGroup)}>
          <button
            {...stylex.props(styles.actionButton)}
            type="button"
            aria-label={t("search.openSorting")}
            onClick={onOpenSort}
          >
            <Image src={uiAssets.sort} alt="" width={24} height={24} />
          </button>
          <Link
            {...stylex.props(styles.actionButton)}
            href={createSearchHref(searchParams, SEARCH_FILTERS_PAGE_PATH)}
            aria-label={t("search.openFilters")}
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
};
