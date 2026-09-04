import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { getLocalizedCategoryTitle } from "@/app-shell/localization/category-title";
import type { Category } from "@/domain/entities";
import { createSearchHref } from "@/utils/search-query-utils";
import { getCategoryHref } from "../catalog-page.helpers";
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

            return (
              <Link
                {...stylex.props(
                  styles.desktopSidebarRow,
                  isSelected && styles.desktopSidebarRowSelected,
                )}
                href={getCategoryHref(category)}
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

      <article {...stylex.props(styles.desktopPromo)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...stylex.props(styles.desktopPromoImage)}
          src={uiAssets.catalogPromoPlaystation}
          alt=""
        />
        <div {...stylex.props(styles.desktopPromoContent)}>
          <div {...stylex.props(styles.desktopPromoText)}>
            <p {...stylex.props(styles.desktopPromoKicker)}>
              {t("catalog.promoKicker")}
            </p>
            <h2 {...stylex.props(styles.desktopPromoTitle)}>
              <span>{t("catalog.promoTitleLine1")}</span>
              <span>{t("catalog.promoTitleLine2")}</span>
            </h2>
          </div>
          <Link
            {...stylex.props(styles.desktopPromoButton)}
            href={createSearchHref({ q: "PlayStation 5 Pro" })}
          >
            {t("catalog.promoButton")}
          </Link>
        </div>
      </article>
    </aside>
  );
};
