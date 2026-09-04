import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import type { Banner } from "@/domain/entities";
import { formatPrice } from "@/utils/string-utils";
import { heroCarouselStyles as styles } from "./hero-carousel.styles";

type HeroCarouselContentProps = {
  banner: Banner;
};

export const HeroCarouselContent = ({ banner }: HeroCarouselContentProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.content)}>
      <div>
        <p {...stylex.props(styles.kicker)}>
          {t("hero.fitbitAir.kicker", { defaultValue: banner.kicker })}
        </p>
        <h1 {...stylex.props(styles.title)}>
          {t("hero.fitbitAir.title", { defaultValue: banner.title })}
        </h1>
      </div>
      <button {...stylex.props(styles.priceButton)} type="button">
        {formatPrice(banner.price, banner.currency, t("product.from"))}
      </button>
    </div>
  );
};
