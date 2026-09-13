import type { SearchSuggestion as SearchSuggestionDto } from "@/data/openapi/models";
import { SearchSuggestionType, type SearchSuggestion } from "@/domain/entities";

export const SearchSuggestionDtoToSearchSuggestionMapperExtension = {
  toEntity(suggestions: SearchSuggestionDto): SearchSuggestion[] {
    return [
      ...suggestions.products.map((suggestion) => ({
        id: suggestion.id,
        slug: suggestion.slug,
        label: suggestion.label,
        type: SearchSuggestionType.product,
      })),
      ...suggestions.categories.map((suggestion) => ({
        id: suggestion.id,
        label: suggestion.label,
        type: SearchSuggestionType.category,
      })),
    ];
  },
};
