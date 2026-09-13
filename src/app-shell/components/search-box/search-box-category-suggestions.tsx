import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { SearchCategorySuggestion } from "@/domain/entities";
import {
  getSuggestionLabel,
  splitCategoryLabel,
} from "./search-box.helpers";
import { searchBoxStyles as styles } from "./search-box.styles";
import type { SearchNavigationParams } from "./search-box.types";

type SearchBoxCategorySuggestionsProps = {
  onSearch: (params: SearchNavigationParams) => void;
  query: string;
  suggestions: SearchCategorySuggestion[];
};

export const SearchBoxCategorySuggestions = ({
  onSearch,
  query,
  suggestions,
}: SearchBoxCategorySuggestionsProps) => {
  const { t } = useTranslation();

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <>
      <div {...stylex.props(styles.hintHeading)}>
        {t("search.categoriesHeading")}
      </div>
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
