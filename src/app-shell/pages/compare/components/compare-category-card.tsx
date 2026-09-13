import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles } from "@/app-shell/styles/shared.styles";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { ComparisonCategory } from "@/domain/entities/comparison";
import { useComparePageStore } from "../compare-page.context";
import { compareCategoryCardStyles as styles } from "./compare-category-card.styles";

type Props = { category: ComparisonCategory };

export const CompareCategoryCard = observer(({ category }: Props) => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  const title = getLocalizedCategoryTitle(t, category);
  return (
    <div
      {...stylex.props(
        styles.card,
        store.activeCategory?.id === category.id && styles.active,
      )}
    >
      <button
        type="button"
        {...stylex.props(styles.select)}
        onClick={() => store.selectCategory(category.id)}
      >
        <span {...stylex.props(styles.imageFrame)}>
          {category.imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...stylex.props(styles.image)}
              src={category.imageSrc}
              alt=""
            />
          )}
        </span>
        <span {...stylex.props(styles.copy)}>
          <span {...stylex.props(styles.title)}>{title}</span>
          <span {...stylex.props(styles.count)}>
            {t("compare.items", { count: category.count })}
          </span>
        </span>
      </button>
      <button
        type="button"
        {...stylex.props(controlStyles.iconButton, styles.remove)}
        aria-label={t("compare.removeCategory", { category: title })}
        onClick={() => store.removeCategory(category.id)}
      >
        <Image src={uiAssets.comparisonDelete} alt="" width={24} height={24} />
      </button>
    </div>
  );
});
