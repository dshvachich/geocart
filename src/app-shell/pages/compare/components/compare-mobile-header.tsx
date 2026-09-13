import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles } from "@/app-shell/styles/shared.styles";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import { useComparePageStore } from "../compare-page.context";
import { compareMobileHeaderStyles as styles } from "./compare-mobile-header.styles";

export const CompareMobileHeader = observer(() => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  if (!store.activeCategory) {
    return null;
  }
  const title = getLocalizedCategoryTitle(t, store.activeCategory);
  return (
    <header {...stylex.props(styles.header)}>
      <button
        type="button"
        {...stylex.props(controlStyles.iconButton, styles.button)}
        aria-label={t("common.back")}
        onClick={store.showCategories}
      >
        <Image src={uiAssets.comparisonBack} alt="" width={24} height={24} />
      </button>
      <h1 {...stylex.props(styles.title)}>{title}</h1>
      <button
        type="button"
        {...stylex.props(controlStyles.iconButton, styles.button)}
        aria-label={t("compare.removeCategory", { category: title })}
        onClick={store.removeActiveCategory}
      >
        <Image src={uiAssets.comparisonDelete} alt="" width={24} height={24} />
      </button>
    </header>
  );
});
