import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { SearchSuggestion } from "@/domain/entities";
import { getSuggestionLabel } from "./search-box.helpers";
import { searchBoxStyles as styles } from "./search-box.styles";
import type { SearchNavigationParams } from "./search-box.types";

type SearchBoxProductSuggestionsProps = {
  onSearch: (params: SearchNavigationParams) => void;
  suggestions: SearchSuggestion[];
};

export const SearchBoxProductSuggestions = ({
  onSearch,
  suggestions,
}: SearchBoxProductSuggestionsProps) => {
  const { t } = useTranslation();

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
