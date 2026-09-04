import type { SearchSuggestion } from "@/domain/entities";

export type SearchNavigationParams = {
  category?: string;
  query: string;
};

export type SearchBoxAnchorRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export type SearchSuggestionsProps = {
  categorySuggestions: SearchSuggestion[];
  onSearch: (params: SearchNavigationParams) => void;
  productSuggestions: SearchSuggestion[];
  query: string;
};
