import type { SearchSuggestion } from "@/domain/entities";

export const getSuggestionLabel = (suggestion: SearchSuggestion) =>
  suggestion.label?.trim() || suggestion.id;

export const splitCategoryLabel = (label: string, query: string) => {
  const normalizedQuery = query.trim();

  if (
    !normalizedQuery ||
    !label.toLowerCase().startsWith(normalizedQuery.toLowerCase())
  ) {
    return {
      prefix: "",
      suffix: label,
    };
  }

  return {
    prefix: label.slice(0, normalizedQuery.length),
    suffix: label.slice(normalizedQuery.length),
  };
};
