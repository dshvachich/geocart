import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { productCardStyles as styles } from "./product-card.styles";

type ProductFavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  productName: string;
};

export const ProductFavoriteButton = ({
  isFavorite,
  onToggleFavorite,
  productName,
}: ProductFavoriteButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      {...stylex.props(styles.favoriteButton)}
      type="button"
      aria-label={t(
        isFavorite ? "product.removeFavorite" : "product.addFavorite",
        {
          product: productName,
        },
      )}
      aria-pressed={isFavorite}
      onClick={onToggleFavorite}
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
        src={isFavorite ? uiAssets.heartFilled : uiAssets.heartOutline}
        alt=""
        width={18}
        height={16}
      />
    </button>
  );
};
