import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import {
  getSearchFilterVariantLabel,
} from "@/domain/helpers/search-filter.helpers";
import type {
  SearchFilterVariant,
  SearchSelectableFilter,
} from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { getFilterTagHref } from "../filters-page.helpers";
import { filtersPageStyles as styles } from "../filters-page.styles";

type FilterTagProps = {
  filter: SearchSelectableFilter;
  option: SearchFilterVariant;
  searchParams: SearchQueryParams;
};

export const FilterTag = ({
  filter,
  option,
  searchParams,
}: FilterTagProps) => (
  <Link
    {...stylex.props(styles.filterTag, option.selected && styles.selectedTag)}
    href={getFilterTagHref({ filter, option, searchParams })}
  >
    {getSearchFilterVariantLabel(option)}
  </Link>
);
