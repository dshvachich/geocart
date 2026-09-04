import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import type { CategoryPath } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { DesktopCatalogContent } from "./desktop-catalog-content";
import { DesktopCatalogNavbar } from "./desktop-catalog-navbar";
import { DesktopCatalogRoot } from "./desktop-catalog-root";

type DesktopCatalogProps = {
  categories: Category[];
  categoryPath: CategoryPath | null;
};

export const DesktopCatalog = ({
  categories,
  categoryPath,
}: DesktopCatalogProps) => (
  <div {...stylex.props(styles.desktopOnly)}>
    <DesktopCatalogNavbar />
    {categoryPath ? (
      <DesktopCatalogContent
        categories={categories}
        categoryPath={categoryPath}
      />
    ) : (
      <DesktopCatalogRoot categories={categories} />
    )}
  </div>
);
