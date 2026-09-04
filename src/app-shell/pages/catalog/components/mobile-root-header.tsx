"use client";

import Link from "next/link";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { AppStore } from "@/app-shell/app-store";
import { NavbarLanguageSelector } from "@/app-shell/components/navbar/navbar-language-selector";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CatalogSearchLink } from "./catalog-search-link";

export const MobileRootHeader = observer(() => {
  const { t } = useTranslation();
  const appStore = useContainer().get(AppStore);

  return (
    <header {...stylex.props(styles.mobileRootHeader)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.mobileRootTop)}>
        <Link
          {...stylex.props(styles.mobileBrand)}
          href="/"
          aria-label={t("common.home")}
        >
          {t("common.brand")}
        </Link>

        <div {...stylex.props(styles.mobileHeaderControls)}>
          <NavbarLanguageSelector appStore={appStore} />
        </div>
      </div>

      <div {...stylex.props(layoutStyles.contentRail, styles.mobileSearchRow)}>
        <CatalogSearchLink />
      </div>
    </header>
  );
});
