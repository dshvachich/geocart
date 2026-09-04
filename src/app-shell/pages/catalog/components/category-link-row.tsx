import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import type { Category } from "@/domain/entities";
import { getCategoryHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type CategoryLinkRowProps = {
  category: Category;
};

export const CategoryLinkRow = ({ category }: CategoryLinkRowProps) => (
  <Link {...stylex.props(styles.linkRow)} href={getCategoryHref(category)}>
    {category.title}
  </Link>
);
