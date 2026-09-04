"use client";

import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { sectionLoaderStyles as styles } from "./section-loader.styles";

export const SectionLoader = () => {
  const { t } = useTranslation();

  return (
    <div
      {...stylex.props(layoutStyles.section, styles.section)}
      aria-label={t("common.loadingMoreProducts")}
    >
      <div {...stylex.props(styles.loader)} />
    </div>
  );
};
