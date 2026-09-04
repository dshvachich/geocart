import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { CatalogPageData } from "@/domain/entities";
import { findCategoryPath, getCategoryPath } from "./catalog-page.helpers";
import { DesktopCatalog } from "./components/desktop-catalog";
import { MobileCatalogDetail } from "./components/mobile-catalog-detail";
import { MobileCatalogRoot } from "./components/mobile-catalog-root";

type CatalogPageProps = {
  data: CatalogPageData;
  selectedCategoryId?: string;
};

export const CatalogPage = ({ data, selectedCategoryId }: CatalogPageProps) => {
  const categoryPath = getCategoryPath(data.categories, selectedCategoryId);
  const explicitMobilePath = selectedCategoryId
    ? findCategoryPath(data.categories, selectedCategoryId)
    : null;
  const mobileSelectedCategory =
    explicitMobilePath?.[explicitMobilePath.length - 1];

  return (
    <main {...stylex.props(layoutStyles.page)}>
      {!mobileSelectedCategory && (
        <MobileCatalogRoot categories={data.categories} />
      )}

      {mobileSelectedCategory && (
        <MobileCatalogDetail
          parentCategory={explicitMobilePath?.[explicitMobilePath.length - 2]}
          selectedCategory={mobileSelectedCategory}
        />
      )}

      {categoryPath && (
        <DesktopCatalog
          categories={data.categories}
          rootCategory={categoryPath.rootCategory}
        />
      )}
    </main>
  );
};
