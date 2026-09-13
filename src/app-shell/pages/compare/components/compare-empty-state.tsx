import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { compareEmptyStateStyles as styles } from "./compare-empty-state.styles";

export const CompareEmptyState = () => {
  const { t } = useTranslation();
  return (
    <section {...stylex.props(layoutStyles.contentRail, styles.content)}>
      <span {...stylex.props(styles.icon)}>
        <Image src={uiAssets.list} alt="" width={24} height={24} />
      </span>
      <div>
        <h2 {...stylex.props(styles.title)}>{t("compare.emptyTitle")}</h2>
        <p {...stylex.props(styles.text)}>{t("compare.emptyText")}</p>
      </div>
      <Link href="/catalog" {...stylex.props(styles.link)}>
        <span {...stylex.props(styles.linkLabel)}>
          {t("favorites.openCatalog")}
        </span>
      </Link>
    </section>
  );
};
