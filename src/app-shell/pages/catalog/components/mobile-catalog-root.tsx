import * as stylex from "@stylexjs/stylex";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import type { Category } from "@/domain/entities";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategoryCard } from "./category-card";
import { MobileRootHeader } from "./mobile-root-header";

type MobileCatalogRootProps = {
  categories: Category[];
};

export const MobileCatalogRoot = ({ categories }: MobileCatalogRootProps) => (
  <div {...stylex.props(styles.mobileOnly, styles.mobileCatalogRoot)}>
    <MobileRootHeader />

    <section
      {...stylex.props(styles.rootCategoriesSection)}
      aria-label="Catalog"
    >
      <div {...stylex.props(styles.rootCategoriesGrid)}>
        {categories.map((category, index) => (
          <CategoryCard category={category} index={index} key={category.id} />
        ))}
      </div>
    </section>

    <MobileTabbar activeItem="catalog" />
  </div>
);
