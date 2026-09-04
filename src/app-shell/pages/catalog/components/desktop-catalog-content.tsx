import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import { createDesktopColumns } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategorySection } from "./category-section";
import { DesktopSidebar } from "./desktop-sidebar";

type DesktopCatalogContentProps = {
  categories: Category[];
  rootCategory: Category;
};

export const DesktopCatalogContent = ({
  categories,
  rootCategory,
}: DesktopCatalogContentProps) => {
  const columns = createDesktopColumns(rootCategory.subCategories ?? []);

  return (
    <div {...stylex.props(styles.desktopContent)}>
      <DesktopSidebar
        categories={categories}
        selectedCategoryId={rootCategory.id}
      />

      <section
        {...stylex.props(styles.desktopMain)}
        aria-label={rootCategory.title}
      >
        <h1 {...stylex.props(styles.desktopTitle)}>{rootCategory.title}</h1>

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
                <CategorySection category={category} key={category.id} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
