"use client";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { useProductPageStore } from "../product-page.context";
import { productSharedStyles as shared } from "../product-shared.styles";
import { ProductSpecificationGroup } from "./product-specification-group";

export const ProductSpecifications = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  return (
    <section>
      <h2 {...stylex.props(shared.sectionTitle)}>
        {t("productPage.specifications")}
      </h2>
      {store.product.attributeGroups.length === 0 && (
        <p {...stylex.props(shared.empty)}>
          {t("productPage.noSpecifications")}
        </p>
      )}
      {store.product.attributeGroups.map((group) => (
        <ProductSpecificationGroup key={group.id} group={group} />
      ))}
    </section>
  );
});
