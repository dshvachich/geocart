import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import { getCategoryHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type CategoryCardProps = {
  category: Category;
  index: number;
};

const getRootCardImageStyle = (index: number) => {
  switch (index % 6) {
    case 0:
      return styles.rootCardImageMobile;
    case 1:
      return styles.rootCardImageComputers;
    case 2:
      return styles.rootCardImageTv;
    case 3:
      return styles.rootCardImagePhoto;
    case 4:
      return styles.rootCardImageHome;
    default:
      return styles.rootCardImageHealth;
  }
};

export const CategoryCard = ({ category, index }: CategoryCardProps) => (
  <Link {...stylex.props(styles.rootCard)} href={getCategoryHref(category)}>
    <h2 {...stylex.props(styles.rootCardTitle)}>{category.title}</h2>
    {category.imageSrc && (
      <span {...stylex.props(styles.rootCardImageClip)} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...stylex.props(styles.rootCardImage, getRootCardImageStyle(index))}
          src={category.imageSrc}
          alt=""
        />
      </span>
    )}
  </Link>
);
