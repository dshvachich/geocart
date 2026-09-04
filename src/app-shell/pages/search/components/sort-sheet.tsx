import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { SearchSortOption } from "@/domain/entities";
import {
  createSearchHref,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchPageStyles as styles } from "../search-page.styles";

type SortSheetProps = {
  onClose: () => void;
  options: SearchSortOption[];
  searchParams: SearchQueryParams;
};

export const SortSheet = ({
  onClose,
  options,
  searchParams,
}: SortSheetProps) => (
  <div
    {...stylex.props(styles.sheetOverlay)}
    role="dialog"
    aria-modal="true"
    aria-labelledby="search-sort-title"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }}
  >
    <div {...stylex.props(styles.sortSheet)}>
      <div {...stylex.props(styles.sortTitleRow)}>
        <h2 {...stylex.props(styles.sortTitle)} id="search-sort-title">
          Show first
        </h2>
      </div>

      <div {...stylex.props(styles.sortOptions)}>
        {options.map((option) => (
          <Link
            {...stylex.props(styles.sortOption)}
            href={createSearchHref({
              ...searchParams,
              sort: option.sort,
              sortOrder: option.sortOrder,
            })}
            key={option.id}
            onClick={onClose}
          >
            <span {...stylex.props(styles.sortOptionText)}>{option.title}</span>
            {option.isSelected && (
              <Image src={uiAssets.checkmark} alt="" width={24} height={24} />
            )}
          </Link>
        ))}
      </div>

      <div {...stylex.props(styles.sortFooter)}>
        <button
          {...stylex.props(styles.sortCancel)}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);
