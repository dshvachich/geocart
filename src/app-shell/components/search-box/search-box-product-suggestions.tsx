import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { SearchProductSuggestion } from "@/domain/entities";
import { getSuggestionLabel } from "./search-box.helpers";
import { searchBoxStyles as styles } from "./search-box.styles";
import type { SearchNavigationParams } from "./search-box.types";

type SearchBoxProductSuggestionsProps = {
  onSearch: (params: SearchNavigationParams) => void;
  suggestions: SearchProductSuggestion[];
};

export const SearchBoxProductSuggestions = ({
  onSearch,
  suggestions,
}: SearchBoxProductSuggestionsProps) => {
  const { t } = useTranslation();

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <>
      <div {...stylex.props(styles.hintHeading)}>
        {t("search.productsHeading")}
      </div>
      {suggestions.map((suggestion) => (
        <button
          {...stylex.props(styles.hintRow)}
          key={`${suggestion.type}-${suggestion.id}`}
          type="button"
          onClick={() =>
            onSearch({
              productId: suggestion.id,
              productSlug: suggestion.slug,
              query: getSuggestionLabel(suggestion),
            })
          }
        >
          {getSuggestionLabel(suggestion)}
        </button>
      ))}
    </>
  );
};
