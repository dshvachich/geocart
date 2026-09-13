import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles, layoutStyles } from "@/app-shell/styles/shared.styles";
import { favoritesEmptyStateStyles as styles } from "./favorites-empty-state.styles";

export const FavoritesEmptyState = () => {
  const { t } = useTranslation();

  return (
    <section {...stylex.props(layoutStyles.section, styles.section)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.content)}>
        <div {...stylex.props(styles.iconCircle)} aria-hidden="true">
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.favoritesEmptyHeart}
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div {...stylex.props(styles.copy)}>
          <h2 {...stylex.props(styles.title)}>{t("favorites.emptyTitle")}</h2>
          <p {...stylex.props(styles.text)}>{t("favorites.emptyText")}</p>
        </div>
        <Link {...stylex.props(styles.link)} href="/catalog">
          <span {...stylex.props(styles.linkLabel)}>
            {t("favorites.openCatalog")}
          </span>
        </Link>
      </div>
    </section>
  );
};
