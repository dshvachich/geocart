import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import {
  createDesktopColumns,
  getChildCategoryLevel,
  type CategoryPath,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CatalogCategoryBreadcrumbs } from "./catalog-category-breadcrumbs";
import { CategorySection } from "./category-section";
import { DesktopSidebar } from "./desktop-sidebar";

type DesktopCatalogContentProps = {
  categories: Category[];
  categoryPath: CategoryPath;
};

export const DesktopCatalogContent = ({
  categories,
  categoryPath,
}: DesktopCatalogContentProps) => {
  const { t } = useTranslation();
  const columns = createDesktopColumns(
    categoryPath.selectedCategory.subCategories ?? [],
  );
  const sectionCategoryLevel = getChildCategoryLevel(categoryPath.path.length);
  const selectedCategoryTitle = getLocalizedCategoryTitle(
    t,
    categoryPath.selectedCategory,
  );

  return (
    <div {...stylex.props(styles.desktopContent)}>
      <DesktopSidebar
        categories={categories}
        selectedCategoryId={categoryPath.rootCategory.id}
      />

      <section
        {...stylex.props(styles.desktopMain)}
        aria-label={selectedCategoryTitle}
      >
        <CatalogCategoryBreadcrumbs
          categoryPath={categoryPath.path}
          variant="desktop"
        />

        <div {...stylex.props(styles.desktopColumns)}>
          {columns.map((column, index) => (
            <div
              {...stylex.props(
                styles.desktopColumn,
                index === 0 && styles.desktopColumnFirst,
                index === 1 && styles.desktopColumnSecond,
              )}
              key={index}
            >
              {column.map((category) => (
                <CategorySection
                  category={category}
                  categoryLevel={sectionCategoryLevel}
                  key={category.id}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
