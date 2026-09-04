import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { Category } from "@/domain/entities";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategorySection } from "./category-section";
import { MobileDetailToolbar } from "./mobile-detail-toolbar";

type MobileCatalogDetailProps = {
  parentCategory?: Category;
  selectedCategory: Category;
};

export const MobileCatalogDetail = ({
  parentCategory,
  selectedCategory,
}: MobileCatalogDetailProps) => (
  <div {...stylex.props(styles.mobileOnly)}>
    <MobileDetailToolbar parentCategory={parentCategory} />

    <section {...stylex.props(layoutStyles.contentRail, styles.mobileTitleRow)}>
      <h1 {...stylex.props(styles.mobileTitle)}>{selectedCategory.title}</h1>
    </section>

    <div
      {...stylex.props(layoutStyles.contentRail, styles.mobileDetailContent)}
    >
      {(selectedCategory.subCategories ?? []).map((category) => (
        <CategorySection category={category} key={category.id} />
      ))}
    </div>
  </div>
);
