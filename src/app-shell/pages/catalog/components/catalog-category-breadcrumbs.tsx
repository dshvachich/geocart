import Link from "next/link";
import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import { createCatalogHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type CatalogCategoryBreadcrumbsProps = {
  categoryPath: Category[];
  variant: "desktop" | "mobile";
};

export const CatalogCategoryBreadcrumbs = ({
  categoryPath,
  variant,
}: CatalogCategoryBreadcrumbsProps) => {
  const { t } = useTranslation();

  if (categoryPath.length === 0) {
    return null;
  }

  return (
    <nav
      {...stylex.props(
        styles.categoryBreadcrumbs,
        variant === "desktop" && styles.categoryBreadcrumbsDesktop,
        variant === "mobile" && styles.categoryBreadcrumbsMobile,
      )}
      aria-label={t("common.breadcrumbs")}
    >
      {categoryPath.map((category, index) => {
        const title = getLocalizedCategoryTitle(t, category);
        const isCurrent = index === categoryPath.length - 1;

        return (
          <Fragment key={category.id}>
            {index > 0 && (
              <span {...stylex.props(styles.categoryBreadcrumbSeparator)}>
                -&gt;
              </span>
            )}

            {isCurrent ? (
              <h1 {...stylex.props(styles.categoryBreadcrumbCurrent)}>
                {title}
              </h1>
            ) : (
              <Link
                {...stylex.props(styles.categoryBreadcrumbLink)}
                href={createCatalogHref(category.id)}
              >
                {title}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
