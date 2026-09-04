import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import { getCategoryHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type CategoryLinkRowProps = {
  category: Category;
};

export const CategoryLinkRow = ({ category }: CategoryLinkRowProps) => {
  const { t } = useTranslation();

  return (
    <Link {...stylex.props(styles.linkRow)} href={getCategoryHref(category)}>
      {getLocalizedCategoryTitle(t, category)}
    </Link>
  );
};
