import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { DesktopCatalogContent } from "./desktop-catalog-content";
import { DesktopCatalogNavbar } from "./desktop-catalog-navbar";

type DesktopCatalogProps = {
  categories: Category[];
  rootCategory: Category;
};

export const DesktopCatalog = ({
  categories,
  rootCategory,
}: DesktopCatalogProps) => (
  <div {...stylex.props(styles.desktopOnly)}>
    <DesktopCatalogNavbar />
    <DesktopCatalogContent
      categories={categories}
      rootCategory={rootCategory}
    />
  </div>
);
