"use client";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { ProductAttributeGroup } from "@/domain/entities/product-details";
import { useProductPageStore } from "../product-page.context";
import { ProductAttributeRow } from "./product-attribute-row";
import { productSpecificationGroupStyles as styles } from "./product-specification-group.styles";

type Props = { group: ProductAttributeGroup };

export const ProductSpecificationGroup = observer(({ group }: Props) => {
  const store = useProductPageStore();
  const isOpen = !store.collapsedGroups.has(group.id);
  return (
    <section {...stylex.props(styles.group)}>
      <h3 {...stylex.props(styles.heading)}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`attributes-${group.id}`}
          onClick={() => store.toggleGroup(group.id)}
          {...stylex.props(styles.toggle)}
        >
          {group.label}
          <Image
            src={isOpen ? uiAssets.angleUp : uiAssets.angleDown}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </h3>
      <dl
        id={`attributes-${group.id}`}
        hidden={!isOpen}
        {...stylex.props(styles.attributes)}
      >
        {group.attributes.map((attribute) => (
          <ProductAttributeRow key={attribute.id} attribute={attribute} />
        ))}
      </dl>
    </section>
  );
});
