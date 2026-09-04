import * as stylex from "@stylexjs/stylex";
import { searchBoxStyles as styles } from "./search-box.styles";
import type { SearchSuggestionsProps } from "./search-box.types";
import { SearchBoxCategorySuggestions } from "./search-box-category-suggestions";
import { SearchBoxProductSuggestions } from "./search-box-product-suggestions";

export const SearchBoxSuggestions = ({
  categorySuggestions,
  onSearch,
  productSuggestions,
  query,
}: SearchSuggestionsProps) => (
  <div {...stylex.props(styles.hints)}>
    <SearchBoxProductSuggestions
      suggestions={productSuggestions}
      onSearch={onSearch}
    />

    {productSuggestions.length > 0 && categorySuggestions.length > 0 && (
      <div {...stylex.props(styles.hintDivider)} />
    )}

    <SearchBoxCategorySuggestions
      suggestions={categorySuggestions}
      query={query}
      onSearch={onSearch}
    />
  </div>
);
