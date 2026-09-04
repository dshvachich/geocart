import * as stylex from "@stylexjs/stylex";
import { ProductCard } from "@/app-shell/components/product-card";
import { productGridStyles } from "@/app-shell/components/product-grid.styles";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { Product } from "@/domain/entities";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchResultsGridProps = {
  products: Product[];
};

export const SearchResultsGrid = ({ products }: SearchResultsGridProps) => (
  <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
    <div
      {...stylex.props(
        productGridStyles.grid,
        productGridStyles.catalogGrid,
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  </section>
);
