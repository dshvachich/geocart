import * as stylex from "@stylexjs/stylex";
import type { RefObject } from "react";
import { ProductCard } from "@/app-shell/components/product-card";
import { productGridStyles } from "@/app-shell/components/product-grid.styles";
import { SectionLoader } from "@/app-shell/components/section-loader";
import type { Product } from "@/domain/entities";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchResultsGridProps = {
  hasMoreProducts: boolean;
  isLoadingMore: boolean;
  paginationBoundaryRef: RefObject<HTMLDivElement>;
  products: Product[];
};

export const SearchResultsGrid = ({
  hasMoreProducts,
  isLoadingMore,
  paginationBoundaryRef,
  products,
}: SearchResultsGridProps) => (
  <div
    {...stylex.props(
      productGridStyles.grid,
      productGridStyles.catalogGrid,
      styles.resultsGrid,
    )}
  >
    {products.map((product, index) => (
      <ProductCard key={product.id} product={product} priority={index < 4} />
    ))}
    {(hasMoreProducts || isLoadingMore) && (
      <div {...stylex.props(styles.resultsPaginationSlot)}>
        {isLoadingMore && <SectionLoader />}
        {hasMoreProducts && (
          <div
            {...stylex.props(styles.paginationBoundary)}
            ref={paginationBoundaryRef}
            aria-hidden="true"
          />
        )}
      </div>
    )}
  </div>
);
