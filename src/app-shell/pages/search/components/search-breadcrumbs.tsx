import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { SearchBreadcrumb } from "@/domain/entities";
import {
  createSearchHref,
  setSearchParam,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchBreadcrumbsProps = {
  breadcrumbs: SearchBreadcrumb[];
  searchParams: SearchQueryParams;
};

export const SearchBreadcrumbs = ({
  breadcrumbs,
  searchParams,
}: SearchBreadcrumbsProps) => {
  const { t } = useTranslation();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      {...stylex.props(styles.breadcrumbs)}
      aria-label={t("common.breadcrumbs")}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={breadcrumb.id}>
          {index > 0 && (
            <Image
              {...stylex.props(styles.breadcrumbIcon)}
              src={uiAssets.angleRight}
              alt=""
              width={16}
              height={16}
            />
          )}
          <Link
            {...stylex.props(styles.breadcrumbLink)}
            href={createSearchHref(
              setSearchParam(searchParams, "category", breadcrumb.id),
            )}
          >
            {getLocalizedCategoryTitle(t, breadcrumb)}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};
