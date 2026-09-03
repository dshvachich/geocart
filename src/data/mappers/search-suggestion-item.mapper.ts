import type { SearchSuggestionItem } from '@/data/openapi/models'
import type { SearchSuggestion } from '@/domain/entities'

export const SearchSuggestionItemToSearchSuggestionMapperExtension = {
  toEntity(suggestion: SearchSuggestionItem): SearchSuggestion {
    return {
      id: suggestion.id,
      label: suggestion.label,
      type: suggestion.type,
    }
  },
}
