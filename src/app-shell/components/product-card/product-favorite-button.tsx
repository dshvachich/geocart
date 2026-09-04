import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
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
}: ProductFavoriteButtonProps) => (
  <button
    {...stylex.props(styles.favoriteButton)}
    type="button"
    aria-label={
      isFavorite
        ? `Remove ${productName} from favorites`
        : `Add ${productName} to favorites`
    }
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
