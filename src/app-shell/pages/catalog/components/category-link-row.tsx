import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import { getCategoryHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type CategoryLinkRowProps = {
  category: Category;
  categoryLevel: number;
};

export const CategoryLinkRow = ({
  category,
  categoryLevel,
}: CategoryLinkRowProps) => {
  const { t } = useTranslation();
  const title = getLocalizedCategoryTitle(t, category);
  const href = getCategoryHref(category, categoryLevel);

  if (!href) {
    return <span {...stylex.props(styles.linkRow)}>{title}</span>;
  }

  return (
    <Link {...stylex.props(styles.linkRow)} href={href}>
      {title}
    </Link>
  );
};
