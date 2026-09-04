import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { Category } from "@/domain/entities";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CategoryCard } from "./category-card";

type DesktopCatalogRootProps = {
  categories: Category[];
};

export const DesktopCatalogRoot = ({ categories }: DesktopCatalogRootProps) => {
  const { t } = useTranslation();

  return (
    <section
      {...stylex.props(styles.desktopRootContent)}
      aria-label={t("common.catalog")}
    >
      <h1 {...stylex.props(styles.desktopTitle)}>{t("common.catalog")}</h1>

      <div {...stylex.props(styles.desktopRootGrid)}>
        {categories.map((category, index) => (
          <CategoryCard category={category} index={index} key={category.id} />
        ))}
      </div>
    </section>
  );
};
