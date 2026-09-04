import * as stylex from "@stylexjs/stylex";
import type { SearchSuggestion } from "@/domain/entities";
import {
  getSuggestionLabel,
  splitCategoryLabel,
} from "./search-box.helpers";
import { searchBoxStyles as styles } from "./search-box.styles";
import type { SearchNavigationParams } from "./search-box.types";

type SearchBoxCategorySuggestionsProps = {
  onSearch: (params: SearchNavigationParams) => void;
  query: string;
  suggestions: SearchSuggestion[];
};

export const SearchBoxCategorySuggestions = ({
  onSearch,
  query,
  suggestions,
}: SearchBoxCategorySuggestionsProps) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <>
      <div {...stylex.props(styles.hintHeading)}>Categories</div>
      {suggestions.map((suggestion) => {
        const label = getSuggestionLabel(suggestion);
        const { prefix, suffix } = splitCategoryLabel(label, query);

        return (
          <button
            {...stylex.props(styles.hintRow, styles.categorySuggestion)}
            key={`${suggestion.type}-${suggestion.id}`}
            type="button"
            onClick={() =>
              onSearch({
                category: suggestion.id,
                query,
              })
            }
          >
            {prefix && (
              <span {...stylex.props(styles.categorySuggestionPrefix)}>
                {prefix}
              </span>
            )}
            <span {...stylex.props(styles.categorySuggestionName)}>
              {suffix}
            </span>
          </button>
        );
      })}
    </>
  );
};
