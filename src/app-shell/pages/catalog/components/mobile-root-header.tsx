"use client";

import Link from "next/link";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { uiAssets } from "@/app-shell/components/assets";
import {
  controlStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CatalogSearchLink } from "./catalog-search-link";
import { HeaderDropdown } from "./header-dropdown";

export const MobileRootHeader = observer(() => {
  const appStore = useContainer().get(AppStore);

  return (
    <header {...stylex.props(styles.mobileRootHeader)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.mobileRootTop)}>
        <Link {...stylex.props(styles.mobileBrand)} href="/" aria-label="Home">
          Geocart
        </Link>

        <div {...stylex.props(styles.mobileHeaderControls)}>
          <HeaderDropdown
            icon={uiAssets.location}
            label={appStore.location.city}
          />
          <span
            {...stylex.props(controlStyles.verticalDivider)}
            aria-hidden="true"
          />
          <HeaderDropdown icon={uiAssets.globe} label={appStore.language} />
        </div>
      </div>

      <div {...stylex.props(layoutStyles.contentRail, styles.mobileSearchRow)}>
        <CatalogSearchLink />
      </div>
    </header>
  );
});
