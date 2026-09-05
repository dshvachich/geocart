import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import {
  getDefaultCategoryPath,
  type CategoryPath,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { DesktopCatalogContent } from "./desktop-catalog-content";

type DesktopCatalogProps = {
  categories: Category[];
  categoryPath: CategoryPath | null;
};

export const DesktopCatalog = ({
  categories,
  categoryPath,
}: DesktopCatalogProps) => {
  const desktopCategoryPath = categoryPath ?? getDefaultCategoryPath(categories);

  return (
    <div {...stylex.props(styles.desktopOnly)}>
      {desktopCategoryPath && (
        <DesktopCatalogContent
          categories={categories}
          categoryPath={desktopCategoryPath}
        />
      )}
    </div>
  );
};
