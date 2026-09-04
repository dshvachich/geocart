import type { SearchSuggestion } from "@/domain/entities";

export type SearchNavigationParams = {
  category?: string;
  query: string;
};

export type SearchSuggestionsProps = {
  categorySuggestions: SearchSuggestion[];
  onSearch: (params: SearchNavigationParams) => void;
  productSuggestions: SearchSuggestion[];
  query: string;
};
