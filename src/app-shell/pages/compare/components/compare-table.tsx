import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { useComparePageStore } from "../compare-page.context";
import { CompareProductCard } from "./compare-product-card";
import { CompareSpecificationGroup } from "./compare-specification-group";
import { compareTableStyles as styles } from "./compare-table.styles";

export const CompareTable = observer(() => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  return (
    <section {...stylex.props(styles.rail)} aria-label={t("compare.title")}>
      <div
        id="comparison-scroll"
        {...stylex.props(styles.scroll)}
        tabIndex={0}
        role="region"
        aria-label={t("compare.scrollProducts")}
      >
        <div {...stylex.props(styles.table)}>
          <div {...stylex.props(styles.cards)}>
            {store.products.map((product) => (
              <CompareProductCard key={product.id} product={product} />
            ))}
          </div>
          <div {...stylex.props(styles.groups)}>
            {store.groups.map((group) => (
              <CompareSpecificationGroup key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>
      {store.groups.length === 0 && (
        <p role="status" {...stylex.props(styles.empty)}>
          {t(
            store.differencesOnly
              ? "compare.noDifferences"
              : "compare.noDetails",
          )}
        </p>
      )}
    </section>
  );
});
