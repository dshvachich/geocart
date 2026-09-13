"use client";

import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { sectionLoaderStyles as styles } from "./section-loader.styles";

type SectionLoaderProps = {
  label?: string;
};

export const SectionLoader = ({ label }: SectionLoaderProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...stylex.props(layoutStyles.section, styles.section)}
      role="status"
      aria-label={label ?? t("common.loadingMoreProducts")}
    >
      <Image
        {...stylex.props(styles.loader)}
        src={uiAssets.loader}
        alt=""
        width={40}
        height={40}
      />
    </div>
  );
};
