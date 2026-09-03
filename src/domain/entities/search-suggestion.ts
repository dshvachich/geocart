export const SearchSuggestionType = {
  product: 'product',
  category: 'category',
} as const

export type SearchSuggestionType =
  (typeof SearchSuggestionType)[keyof typeof SearchSuggestionType]

export type SearchSuggestion = {
  id: string
  label?: string
  type: SearchSuggestionType
}
