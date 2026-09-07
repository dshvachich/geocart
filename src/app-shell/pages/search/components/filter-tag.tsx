import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { getSearchFilterVariantLabel } from "@/domain/helpers/search-filter.helpers";
import type {
  SearchFilterVariant,
  SearchSelectableFilter,
} from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { getFilterTagHref } from "../search-filters-page.helpers";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";

type FilterTagProps = {
  filter: SearchSelectableFilter;
  option: SearchFilterVariant;
  path?: string;
  searchParams: SearchQueryParams;
};

export const FilterTag = ({
  filter,
  option,
  path,
  searchParams,
}: FilterTagProps) => (
  <Link
    {...stylex.props(
      styles.filterTag,
      option.selected ? styles.selectedTag : styles.defaultTag,
    )}
    href={getFilterTagHref({ filter, option, path, searchParams })}
  >
    <span
      {...stylex.props(
        option.selected ? styles.selectedTagText : styles.defaultTagText,
      )}
    >
      {getSearchFilterVariantLabel(option)}
    </span>
  </Link>
);
