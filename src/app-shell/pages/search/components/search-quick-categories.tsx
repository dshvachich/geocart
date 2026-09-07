import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
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
  const { t } = useTranslation();

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
              !category.imageSrc && styles.categoryPillWithoutImage,
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
            <span>{getLocalizedCategoryTitle(t, category)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
