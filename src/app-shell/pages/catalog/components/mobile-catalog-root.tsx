import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import type { Category } from "@/domain/entities";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategoryCard } from "./category-card";

type MobileCatalogRootProps = {
  categories: Category[];
};

export const MobileCatalogRoot = ({ categories }: MobileCatalogRootProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.mobileOnly, styles.mobileCatalogRoot)}>
      <section
        {...stylex.props(styles.rootCategoriesSection)}
        aria-label={t("common.catalog")}
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
};
