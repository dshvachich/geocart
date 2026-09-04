import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { heroCarouselStyles as styles } from "./hero-carousel.styles";

export const HeroCarouselControls = () => {
  const { t } = useTranslation();

  return (
    <div
      {...stylex.props(styles.controls)}
      aria-label={t("hero.carouselControls")}
    >
      <button
        {...stylex.props(controlStyles.iconButton, styles.arrow)}
        type="button"
        aria-label={t("hero.previousProduct")}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.arrowLeft}
          alt=""
          width={24}
          height={24}
        />
      </button>
      <button
        {...stylex.props(controlStyles.iconButton, styles.arrow)}
        type="button"
        aria-label={t("hero.nextProduct")}
      >
        <Image
          {...stylex.props(iconStyles.icon, styles.arrowNextIcon)}
          src={uiAssets.arrowRight}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};
