import type {
  SearchCategorySuggestion,
  SearchProductSuggestion,
} from "@/domain/entities";

export type SearchNavigationParams = {
  category?: string;
  productId?: number;
  productSlug?: string;
  query: string;
};

export type SearchBoxAnchorRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export type SearchSuggestionsProps = {
  categorySuggestions: SearchCategorySuggestion[];
  onSearch: (params: SearchNavigationParams) => void;
  productSuggestions: SearchProductSuggestion[];
  query: string;
};
