export const SearchSuggestionType = {
  product: 'product',
  category: 'category',
} as const

export type SearchSuggestionType =
  (typeof SearchSuggestionType)[keyof typeof SearchSuggestionType]

export type SearchCategorySuggestion = {
  id: string
  label: string
  type: typeof SearchSuggestionType.category
}

export type SearchProductSuggestion = {
  id: number
  slug: string
  label: string
  type: typeof SearchSuggestionType.product
}

export type SearchSuggestion = SearchCategorySuggestion | SearchProductSuggestion
