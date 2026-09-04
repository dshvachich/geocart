import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import {
  controlStyles,
  iconStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import type { Banner } from "@/domain/entities";
import { formatPrice } from "@/utils/string-utils";
import { uiAssets } from "./assets";

type HeroCarouselProps = {
  banner: Banner;
};

const dots = [
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotMedium, size: 6 },
  { src: uiAssets.dotLarge, size: 8 },
  { src: uiAssets.dotMedium, size: 6 },
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotSmall, size: 4 },
];

export const HeroCarousel = ({ banner }: HeroCarouselProps) => (
  <section
    {...stylex.props(layoutStyles.section, styles.safeArea)}
    aria-label="Featured product"
  >
    <div
      {...stylex.props(layoutStyles.contentRail, styles.carousel)}
      style={{ backgroundImage: `url(${banner.imageSrc})` }}
    >
      <div {...stylex.props(styles.content)}>
        <div>
          <p {...stylex.props(styles.kicker)}>{banner.kicker}</p>
          <h1 {...stylex.props(styles.title)}>Make every move a healthy one</h1>
        </div>
        <button {...stylex.props(styles.priceButton)} type="button">
          {formatPrice(banner.price, banner.currency)}
        </button>
      </div>

      <div {...stylex.props(styles.controls)} aria-label="Carousel controls">
        <button
          {...stylex.props(controlStyles.iconButton, styles.arrow)}
          type="button"
          aria-label="Previous product"
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
          aria-label="Next product"
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

      <div {...stylex.props(styles.dots)} aria-hidden="true">
        {dots.map((dot, index) => (
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
    </div>
  </section>
);

const styles = stylex.create({
  safeArea: {
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: "var(--color-bg-secondary)",
  },
  carousel: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: {
      default: 360,
      "@media (max-width: 760px)": 320,
    },
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundSize: "cover",
    paddingTop: {
      default: 80,
      "@media (max-width: 760px)": 40,
    },
    paddingBottom: {
      default: 80,
      "@media (max-width: 760px)": 40,
    },
  },
  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    width: {
      default: 404,
      "@media (max-width: 760px)": "min(280px, 68%)",
    },
    minHeight: {
      default: 200,
      "@media (max-width: 760px)": 188,
    },
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  kicker: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
  },
  title: {
    margin: 0,
    fontSize: {
      default: 36,
      "@media (max-width: 760px)": 30,
    },
    fontWeight: 600,
    lineHeight: {
      default: "44px",
      "@media (max-width: 760px)": "36px",
    },
  },
  priceButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 40,
    padding: "8px 16px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-on-dark)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    whiteSpace: "nowrap",
  },
  controls: {
    position: "relative",
    zIndex: 1,
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    width: 40,
    flexDirection: "column",
    gap: 8,
  },
  arrow: {
    backgroundColor: "var(--color-bg-primary)",
  },
  arrowNextIcon: {
    transform: "rotate(180deg)",
  },
  dots: {
    position: "absolute",
    bottom: 16,
    left: "50%",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    transform: "translateX(-50%)",
  },
  dot: {
    objectFit: "contain",
  },
});
