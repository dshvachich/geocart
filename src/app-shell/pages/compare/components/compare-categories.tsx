import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useComparePageStore } from "../compare-page.context";
import { CompareCategoryCard } from "./compare-category-card";
import { compareCategoriesStyles as styles } from "./compare-categories.styles";

export const CompareCategories = observer(() => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  if (!store.comparison.count) {
    return null;
  }
  return (
    <nav
      {...stylex.props(layoutStyles.contentRail, styles.categories)}
      aria-label={t("common.categories")}
    >
      {store.categories.map((category) => (
        <CompareCategoryCard key={category.id} category={category} />
      ))}
    </nav>
  );
});
