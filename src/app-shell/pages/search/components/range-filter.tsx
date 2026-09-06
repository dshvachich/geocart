import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { formatSearchRangeFilterValue } from "@/domain/helpers/search-filter.helpers";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";
import { FilterHeader } from "./filter-header";

type RangeFilterProps = {
  filter: SearchFilter;
  isExpanded: boolean;
  onToggle: () => void;
  searchParams: SearchQueryParams;
};

export const RangeFilter = ({
  filter,
  isExpanded,
  onToggle,
}: RangeFilterProps) => {
  const { t } = useTranslation();

  if (filter.type !== "range") {
    return null;
  }

  const bodyId = `${filter.id}-filter-body`;

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader
        controlsId={bodyId}
        filter={filter}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && (
        <div {...stylex.props(styles.filterBody)} id={bodyId}>
          <div {...stylex.props(styles.rangePair)}>
            <div {...stylex.props(styles.inputValue)}>
              {t("search.from")}{" "}
              {formatSearchRangeFilterValue(filter, filter.selectedMin)}
            </div>
            <div {...stylex.props(styles.inputValue, styles.mutedInputValue)}>
              {t("search.to")}{" "}
              {formatSearchRangeFilterValue(filter, filter.selectedMax)}
            </div>
          </div>
        </div>
      )}
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};
