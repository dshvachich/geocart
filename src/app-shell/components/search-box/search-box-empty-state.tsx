import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { searchBoxEmptyStateStyles as styles } from "./search-box-empty-state.styles";
import { searchBoxStyles } from "./search-box.styles";

export const SearchBoxEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div
      {...stylex.props(searchBoxStyles.hints, styles.container)}
      role="status"
    >
      <div {...stylex.props(styles.iconCircle)} aria-hidden="true">
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.searchEmpty}
          alt=""
          width={24}
          height={24}
        />
      </div>
      <div {...stylex.props(styles.text)}>
        <p {...stylex.props(styles.title)}>{t("search.emptyTitle")}</p>
        <p {...stylex.props(styles.description)}>{t("search.emptyText")}</p>
      </div>
    </div>
  );
};
