import Image from "next/image";
import type { CSSProperties, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import type {
  SearchCategorySuggestion,
  SearchProductSuggestion,
} from "@/domain/entities";
import { searchBoxStyles as styles } from "./search-box.styles";
import { SearchBoxField } from "./search-box-field";
import { SearchBoxEmptyState } from "./search-box-empty-state";
import { SearchBoxSuggestions } from "./search-box-suggestions";
import type {
  SearchBoxAnchorRect,
  SearchNavigationParams,
} from "./search-box.types";

type SearchBoxOverlayProps = {
  anchorRect: SearchBoxAnchorRect | null;
  categorySuggestions: SearchCategorySuggestion[];
  hasEmptySuggestions: boolean;
  inputRef: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onClose: () => void;
  onSearch: (params: SearchNavigationParams) => void;
  productSuggestions: SearchProductSuggestion[];
  query: string;
  trimmedQuery: string;
};

type SearchBoxOverlayStyle = CSSProperties & {
  "--search-box-hints-top"?: string;
  "--search-box-overlay-left"?: string;
  "--search-box-overlay-top"?: string;
  "--search-box-overlay-width"?: string;
};

export const SearchBoxOverlay = ({
  anchorRect,
  categorySuggestions,
  hasEmptySuggestions,
  inputRef,
  onChange,
  onClose,
  onSearch,
  productSuggestions,
  query,
  trimmedQuery,
}: SearchBoxOverlayProps) => {
  const { t } = useTranslation();
  const overlayStyle: SearchBoxOverlayStyle | undefined = anchorRect
    ? {
        "--search-box-hints-top": `${anchorRect.top + anchorRect.height + 8}px`,
        "--search-box-overlay-left": `${anchorRect.left}px`,
        "--search-box-overlay-top": `${anchorRect.top}px`,
        "--search-box-overlay-width": `${anchorRect.width}px`,
      }
    : undefined;

  return (
    <div
      {...stylex.props(styles.overlay)}
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label={t("common.search")}
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
          aria-label={t("common.closeSearch")}
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

      {hasEmptySuggestions && <SearchBoxEmptyState />}

      {trimmedQuery &&
        (productSuggestions.length > 0 || categorySuggestions.length > 0) && (
          <SearchBoxSuggestions
            categorySuggestions={categorySuggestions}
            productSuggestions={productSuggestions}
            query={trimmedQuery}
            onSearch={onSearch}
          />
        )}
    </div>
  );
};
