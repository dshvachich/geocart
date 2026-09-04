import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { favoritesEmptyStateStyles as styles } from "./favorites-empty-state.styles";

export const FavoritesEmptyState = () => {
  const { t } = useTranslation();

  return (
    <section {...stylex.props(layoutStyles.section, styles.section)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.content)}>
        <h2 {...stylex.props(styles.title)}>{t("favorites.emptyTitle")}</h2>
        <p {...stylex.props(styles.text)}>{t("favorites.emptyText")}</p>
        <Link {...stylex.props(styles.link)} href="/catalog">
          {t("favorites.openCatalog")}
        </Link>
      </div>
    </section>
  );
};
