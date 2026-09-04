import type {
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

type GetFilterTagHrefParams = {
  filter: SearchSelectableFilter;
  option: SearchFilterVariant;
  searchParams: SearchQueryParams;
};

export const getFilterTagHref = ({
  filter,
  option,
  searchParams,
}: GetFilterTagHrefParams) => {
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
