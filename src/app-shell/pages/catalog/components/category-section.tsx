import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import {
  getCategoryHref,
  splitCategoryChildren,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategoryLinkRow } from "./category-link-row";

type CategorySectionProps = {
  category: Category;
};

export const CategorySection = ({ category }: CategorySectionProps) => {
  const { linkCategories, tagCategories } = splitCategoryChildren(category);

  if ((category.subCategories?.length ?? 0) === 0) {
    return <CategoryLinkRow category={category} />;
  }

  return (
    <section {...stylex.props(styles.categorySection)}>
      <div {...stylex.props(styles.groupHeader)}>
        <div {...stylex.props(styles.groupHeaderRow)}>
          <p {...stylex.props(styles.groupHeaderText)}>{category.title}</p>
        </div>
        <div {...stylex.props(styles.groupHeaderBorder)} />
      </div>

      {tagCategories.length > 0 && (
        <div {...stylex.props(styles.tagsRow)}>
          {tagCategories.map((tagCategory) => (
            <Link
              {...stylex.props(styles.tag)}
              href={getCategoryHref(tagCategory)}
              key={tagCategory.id}
            >
              {tagCategory.title}
            </Link>
          ))}
        </div>
      )}

      {tagCategories.length > 0 && linkCategories.length > 0 && (
        <div {...stylex.props(styles.detailDivider)} />
      )}

      {linkCategories.length > 0 && (
        <div {...stylex.props(styles.links)}>
          {linkCategories.map((linkCategory) => (
            <CategoryLinkRow category={linkCategory} key={linkCategory.id} />
          ))}
        </div>
      )}
    </section>
  );
};
