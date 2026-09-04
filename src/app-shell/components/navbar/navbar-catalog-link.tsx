import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { createSearchHref } from "@/utils/search-query-utils";
import { navbarStyles as styles } from "./navbar.styles";

export const NavbarCatalogLink = () => (
  <Link
    {...stylex.props(styles.catalogButton)}
    href={createSearchHref({ category: "mobile-phones" })}
  >
    <span
      {...stylex.props(styles.catalogIconSlot, styles.catalogIconDefault)}
      aria-hidden="true"
    >
      <Image
        {...stylex.props(iconStyles.icon)}
        src={uiAssets.catalog}
        alt=""
        width={24}
        height={24}
      />
    </span>
    <span
      {...stylex.props(styles.catalogIconSlot, styles.catalogIconMuted)}
      aria-hidden="true"
    >
      <Image
        {...stylex.props(iconStyles.icon)}
        src={uiAssets.catalogMuted}
        alt=""
        width={24}
        height={24}
      />
    </span>
    <span {...stylex.props(styles.catalogLabel)}>Catalog</span>
  </Link>
);
