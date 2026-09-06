import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { Category } from "@/domain/entities";
import { getChildCategoryLevel } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CatalogCategoryBreadcrumbs } from "./catalog-category-breadcrumbs";
import { CategorySection } from "./category-section";

type MobileCatalogDetailProps = {
  categoryPath: Category[];
  selectedCategory: Category;
};

export const MobileCatalogDetail = ({
  categoryPath,
  selectedCategory,
}: MobileCatalogDetailProps) => {
  const sectionCategoryLevel = getChildCategoryLevel(categoryPath.length);

  return (
    <div {...stylex.props(styles.mobileOnly)}>
      <section
        {...stylex.props(layoutStyles.contentRail, styles.mobileTitleRow)}
      >
        <CatalogCategoryBreadcrumbs
          categoryPath={categoryPath}
          variant="mobile"
        />
      </section>

      <div
        {...stylex.props(layoutStyles.contentRail, styles.mobileDetailContent)}
      >
        {(selectedCategory.subCategories ?? []).map((category) => (
          <CategorySection
            category={category}
            categoryLevel={sectionCategoryLevel}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
};
