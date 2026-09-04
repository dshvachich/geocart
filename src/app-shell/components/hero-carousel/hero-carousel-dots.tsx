import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { heroCarouselDots } from "./hero-carousel.constants";
import { heroCarouselStyles as styles } from "./hero-carousel.styles";

export const HeroCarouselDots = () => (
  <div {...stylex.props(styles.dots)} aria-hidden="true">
    {heroCarouselDots.map((dot, index) => (
      <Image
        {...stylex.props(styles.dot)}
        key={`${dot.src}-${index}`}
        src={dot.src}
        alt=""
        width={dot.size}
        height={dot.size}
      />
    ))}
  </div>
);
