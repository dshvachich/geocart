import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import { hasCategoryChildren } from "@/domain/helpers/category-tree.helpers";
import {
  getChildCategoryLevel,
  getCategoryHref,
  splitCategoryChildren,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategoryLinkRow } from "./category-link-row";

type CategorySectionProps = {
  category: Category;
  categoryLevel: number;
};

export const CategorySection = ({
  category,
  categoryLevel,
}: CategorySectionProps) => {
  const { t } = useTranslation();
  const { linkCategories, tagCategories } = splitCategoryChildren(category);
  const childCategoryLevel = getChildCategoryLevel(categoryLevel);
  const title = getLocalizedCategoryTitle(t, category);
  const href = getCategoryHref(category, categoryLevel);

  if (!hasCategoryChildren(category)) {
    return (
      <CategoryLinkRow category={category} categoryLevel={categoryLevel} />
    );
  }

  return (
    <section {...stylex.props(styles.categorySection)}>
      <div {...stylex.props(styles.groupHeader)}>
        {href ? (
          <Link {...stylex.props(styles.groupHeaderRow)} href={href}>
            <p {...stylex.props(styles.groupHeaderText)}>{title}</p>
          </Link>
        ) : (
          <div {...stylex.props(styles.groupHeaderRow)}>
            <p {...stylex.props(styles.groupHeaderText)}>{title}</p>
          </div>
        )}
        <div {...stylex.props(styles.groupHeaderBorder)} />
      </div>

      {tagCategories.length > 0 && (
        <div {...stylex.props(styles.tagsRow)}>
          {tagCategories.map((tagCategory) => {
            const tagTitle = getLocalizedCategoryTitle(t, tagCategory);
            const tagHref = getCategoryHref(
              tagCategory,
              childCategoryLevel,
            );

            if (!tagHref) {
              return (
                <span {...stylex.props(styles.tag)} key={tagCategory.id}>
                  {tagTitle}
                </span>
              );
            }

            return (
              <Link
                {...stylex.props(styles.tag)}
                href={tagHref}
                key={tagCategory.id}
              >
                {tagTitle}
              </Link>
            );
          })}
        </div>
      )}

      {tagCategories.length > 0 && linkCategories.length > 0 && (
        <div {...stylex.props(styles.detailDivider)} />
      )}

      {linkCategories.length > 0 && (
        <div {...stylex.props(styles.links)}>
          {linkCategories.map((linkCategory) => (
            <CategoryLinkRow
              category={linkCategory}
              categoryLevel={childCategoryLevel}
              key={linkCategory.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};
