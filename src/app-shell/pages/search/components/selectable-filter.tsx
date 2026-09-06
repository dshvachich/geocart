import * as stylex from "@stylexjs/stylex";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";
import { FilterHeader } from "./filter-header";
import { FilterTag } from "./filter-tag";

type SelectableFilterProps = {
  filter: SearchFilter;
  isExpanded: boolean;
  onToggle: () => void;
  path?: string;
  searchParams: SearchQueryParams;
};

export const SelectableFilter = ({
  filter,
  isExpanded,
  onToggle,
  path,
  searchParams,
}: SelectableFilterProps) => {
  if (filter.type === "range" || filter.type === "collapsed") {
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
        <div
          {...stylex.props(styles.filterBody, styles.filterBodyWithTags)}
          id={bodyId}
        >
          <div {...stylex.props(styles.tags)}>
            {filter.variants.map((option) => (
              <FilterTag
                key={option.value}
                filter={filter}
                option={option}
                path={path}
                searchParams={searchParams}
              />
            ))}
          </div>
        </div>
      )}
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};
