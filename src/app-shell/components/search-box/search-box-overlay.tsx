import Image from "next/image";
import type { Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import type { SearchSuggestion } from "@/domain/entities";
import { searchBoxStyles as styles } from "./search-box.styles";
import { SearchBoxField } from "./search-box-field";
import { SearchBoxSuggestions } from "./search-box-suggestions";
import type { SearchNavigationParams } from "./search-box.types";

type SearchBoxOverlayProps = {
  categorySuggestions: SearchSuggestion[];
  inputRef: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onClose: () => void;
  onSearch: (params: SearchNavigationParams) => void;
  productSuggestions: SearchSuggestion[];
  query: string;
  trimmedQuery: string;
};

export const SearchBoxOverlay = ({
  categorySuggestions,
  inputRef,
  onChange,
  onClose,
  onSearch,
  productSuggestions,
  query,
  trimmedQuery,
}: SearchBoxOverlayProps) => (
  <div
    {...stylex.props(styles.overlay)}
    role="dialog"
    aria-modal="true"
    aria-label="Search products"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }}
  >
    <div {...stylex.props(styles.overlayBar)}>
      <SearchBoxField
        inputRef={inputRef}
        value={query}
        variant="overlay"
        onChange={onChange}
        onSubmit={() => onSearch({ query })}
      />
      <button
        {...stylex.props(controlStyles.iconButton, styles.closeButton)}
        type="button"
        aria-label="Close search"
        onClick={onClose}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.close}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </div>

    {trimmedQuery && (
      <SearchBoxSuggestions
        categorySuggestions={categorySuggestions}
        productSuggestions={productSuggestions}
        query={trimmedQuery}
        onSearch={onSearch}
      />
    )}
  </div>
);
