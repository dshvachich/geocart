import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchCategory } from "@/domain/entities";
import {
  createSearchHref,
  setSearchParam,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchQuickCategoriesProps = {
  categories: SearchCategory[];
  searchParams: SearchQueryParams;
};

export const SearchQuickCategories = ({
  categories,
  searchParams,
}: SearchQuickCategoriesProps) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
      <div {...stylex.props(styles.categoryStrip)}>
        {categories.map((category) => (
          <Link
            {...stylex.props(
              styles.categoryPill,
              category.selected && styles.selectedCategoryPill,
            )}
            href={createSearchHref(
              setSearchParam(searchParams, "category", category.id),
            )}
            key={category.id}
          >
            {category.imageSrc && (
              <span {...stylex.props(styles.categoryThumb)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...stylex.props(styles.categoryThumbImage)}
                  src={category.imageSrc}
                  alt=""
                />
              </span>
            )}
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
