import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import type { Product } from "@/domain/entities";
import { formatOffers, formatPrice } from "@/utils/string-utils";
import { uiAssets } from "./assets";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export const ProductCard = ({
  product,
  priority = false,
}: ProductCardProps) => (
  <article {...stylex.props(styles.card)}>
    <div {...stylex.props(styles.media)}>
      <span {...stylex.props(styles.imageFrame)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...stylex.props(
            styles.productImage,
            product.imageFit === "cover" && styles.coverImage,
          )}
          src={product.imageSrc}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
        />
      </span>

      {product.isNew && <span {...stylex.props(styles.tag)}>New</span>}

      <button
        {...stylex.props(styles.favoriteButton)}
        type="button"
        aria-label={`Add ${product.name} to favorites`}
      >
        <Image
          {...stylex.props(styles.favoriteShape)}
          src={uiAssets.favoriteShape}
          alt=""
          width={24}
          height={22}
        />
        <Image
          {...stylex.props(styles.favoriteHeart)}
          src={
            product.isFavorite ? uiAssets.heartFilled : uiAssets.heartOutline
          }
          alt=""
          width={18}
          height={16}
        />
      </button>

      <div {...stylex.props(styles.indicators)} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            {...stylex.props(
              styles.indicator,
              index === 0 && styles.activeIndicator,
            )}
            key={index}
          />
        ))}
      </div>
    </div>

    <div {...stylex.props(styles.content)}>
      <h2 {...stylex.props(styles.name)}>{product.name}</h2>
      <p {...stylex.props(styles.price)}>
        {formatPrice(product.price, product.currency)}
      </p>
      <p {...stylex.props(styles.offers)}>{formatOffers(product.offers)}</p>
    </div>
  </article>
);

const styles = stylex.create({
  card: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: {
      default: 12,
      "@media (max-width: 760px)": 8,
    },
    padding: {
      default: "8px 8px 16px",
      "@media (max-width: 760px)": 8,
    },
  },
  media: {
    position: "relative",
    height: {
      default: 290,
      "@media (max-width: 760px)": 208,
    },
    padding: {
      default: null,
      "@media (max-width: 760px)": 8,
    },
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "var(--color-bg-secondary)",
  },
  imageFrame: {
    position: "relative",
    display: "block",
    width: "100%",
    height: {
      default: 258,
      "@media (max-width: 760px)": "100%",
    },
    marginTop: {
      default: 16,
      "@media (max-width: 760px)": 0,
    },
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    mixBlendMode: "darken",
  },
  coverImage: {
    objectFit: "cover",
  },
  tag: {
    position: "absolute",
    top: {
      default: 16,
      "@media (max-width: 760px)": 12,
    },
    left: {
      default: 16,
      "@media (max-width: 760px)": 12,
    },
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    padding: "2px 8px",
    borderRadius: 24,
    backgroundColor: "var(--color-accent)",
    color: "var(--color-fg-on-dark)",
    fontSize: {
      default: 14,
      "@media (max-width: 760px)": 12,
    },
    fontWeight: 500,
    lineHeight: "20px",
  },
  favoriteButton: {
    position: "absolute",
    top: {
      default: 8,
      "@media (max-width: 760px)": 5,
    },
    right: {
      default: 8,
      "@media (max-width: 760px)": 4,
    },
    width: 40,
    height: 40,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  favoriteShape: {
    position: "absolute",
    top: 9,
    left: 8,
    width: 24,
    height: 22,
    objectFit: "contain",
  },
  favoriteHeart: {
    position: "absolute",
    top: 12,
    left: 11,
    width: 18,
    height: 16,
    objectFit: "contain",
  },
  indicators: {
    position: "absolute",
    bottom: 8,
    left: "50%",
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    alignItems: "center",
    gap: 2,
    transform: "translateX(-50%)",
  },
  indicator: {
    width: 16,
    height: 4,
    borderRadius: 16,
    backgroundColor: "rgb(0 0 0 / 10%)",
  },
  activeIndicator: {
    backgroundColor: "rgb(0 0 0 / 30%)",
  },
  content: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: 4,
  },
  name: {
    minHeight: {
      default: 48,
      "@media (max-width: 760px)": 32,
    },
    margin: 0,
    overflow: "hidden",
    color: "var(--color-fg-primary)",
    display: "-webkit-box",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 12,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "16px",
    },
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: {
      default: 2,
      "@media (max-width: 760px)": 3,
    },
  },
  price: {
    margin: 0,
    color: "var(--color-accent)",
    fontSize: {
      default: 20,
      "@media (max-width: 760px)": 16,
    },
    fontWeight: 600,
    lineHeight: "24px",
  },
  offers: {
    margin: 0,
    color: "var(--color-fg-secondary)",
    fontSize: {
      default: 14,
      "@media (max-width: 760px)": 12,
    },
    lineHeight: {
      default: "20px",
      "@media (max-width: 760px)": "16px",
    },
  },
});
