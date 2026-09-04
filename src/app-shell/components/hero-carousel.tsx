"use client";

import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { Banner } from "@/domain/entities";
import { HeroCarouselContent } from "./hero-carousel/hero-carousel-content";
import { HeroCarouselControls } from "./hero-carousel/hero-carousel-controls";
import { HeroCarouselDots } from "./hero-carousel/hero-carousel-dots";
import { heroCarouselStyles as styles } from "./hero-carousel/hero-carousel.styles";

type HeroCarouselProps = {
  banner: Banner;
};

export const HeroCarousel = ({ banner }: HeroCarouselProps) => {
  const { t } = useTranslation();

  return (
    <section
      {...stylex.props(layoutStyles.section, styles.safeArea)}
      aria-label={t("hero.featuredProduct")}
    >
      <div
        {...stylex.props(layoutStyles.contentRail, styles.carousel)}
        style={{ backgroundImage: `url(${banner.imageSrc})` }}
      >
        <HeroCarouselContent banner={banner} />
        <HeroCarouselControls />
        <HeroCarouselDots />
      </div>
    </section>
  );
};
