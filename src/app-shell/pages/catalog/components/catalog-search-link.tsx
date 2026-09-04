import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { createSearchHref } from "@/utils/search-query-utils";
import { catalogPageStyles as styles } from "../catalog-page.styles";

export const CatalogSearchLink = () => (
  <Link
    {...stylex.props(styles.searchField)}
    href={createSearchHref({})}
    aria-label="Search products"
  >
    <Image
      {...stylex.props(iconStyles.icon)}
      src={uiAssets.search}
      alt=""
      width={24}
      height={24}
    />
    <span {...stylex.props(styles.searchPlaceholder)}>Search products</span>
  </Link>
);
