import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { Category } from "@/domain/entities";
import { createSearchHref } from "@/utils/search-query-utils";
import {
  createCatalogHref,
} from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type DesktopSidebarProps = {
  categories: Category[];
  selectedCategoryId: string;
};

export const DesktopSidebar = ({
  categories,
  selectedCategoryId,
}: DesktopSidebarProps) => (
  <aside {...stylex.props(styles.desktopAside)}>
    <nav {...stylex.props(styles.desktopCategoryPanel)} aria-label="Categories">
      <p {...stylex.props(styles.desktopSidebarHeading)}>Categories</p>

      <div {...stylex.props(styles.desktopSidebarRows)}>
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;

          return (
            <Link
              {...stylex.props(
                styles.desktopSidebarRow,
                isSelected && styles.desktopSidebarRowSelected,
              )}
              href={createCatalogHref(category.id)}
              key={category.id}
            >
              <span>{category.title}</span>
              <Image
                {...stylex.props(styles.desktopSidebarIcon)}
                src={uiAssets.angleRight}
                alt=""
                width={24}
                height={24}
              />
            </Link>
          );
        })}
      </div>
    </nav>

    <article {...stylex.props(styles.desktopPromo)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...stylex.props(styles.desktopPromoImage)}
        src={uiAssets.catalogPromoPlaystation}
        alt=""
      />
      <div {...stylex.props(styles.desktopPromoContent)}>
        <div {...stylex.props(styles.desktopPromoText)}>
          <p {...stylex.props(styles.desktopPromoKicker)}>Sony PlayStation</p>
          <h2 {...stylex.props(styles.desktopPromoTitle)}>
            <span>PlayStation 5 Pro</span>
            <span>Ultimate Gaming</span>
          </h2>
        </div>
        <Link
          {...stylex.props(styles.desktopPromoButton)}
          href={createSearchHref({ q: "PlayStation 5 Pro" })}
        >
          from 754 ₾
        </Link>
      </div>
    </article>
  </aside>
);
