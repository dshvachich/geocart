import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import {
  getCategoryHref,
  ROOT_CATEGORY_LEVEL,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type DesktopSidebarProps = {
  categories: Category[];
  selectedCategoryId: string;
};

export const DesktopSidebar = ({
  categories,
  selectedCategoryId,
}: DesktopSidebarProps) => {
  const { t } = useTranslation();

  return (
    <aside {...stylex.props(styles.desktopAside)}>
      <nav
        {...stylex.props(styles.desktopCategoryPanel)}
        aria-label={t("common.categories")}
      >
        <p {...stylex.props(styles.desktopSidebarHeading)}>
          {t("common.categories")}
        </p>

        <div {...stylex.props(styles.desktopSidebarRows)}>
          {categories.map((category) => {
            const isSelected = category.id === selectedCategoryId;
            const href = getCategoryHref(category, ROOT_CATEGORY_LEVEL);

            if (!href) {
              return null;
            }

            return (
              <Link
                {...stylex.props(
                  styles.desktopSidebarRow,
                  isSelected && styles.desktopSidebarRowSelected,
                )}
                href={href}
                key={category.id}
              >
                <span>{getLocalizedCategoryTitle(t, category)}</span>
                <Image
                  {...stylex.props(styles.desktopSidebarIcon)}
                  src={uiAssets.angleRight}
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
