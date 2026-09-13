import Image from "next/image";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import type { ComparisonGroup } from "@/domain/entities/comparison";
import { uiAssets } from "@/app-shell/components/assets";
import { useComparePageStore } from "../compare-page.context";
import { CompareSpecificationRow } from "./compare-specification-row";
import { compareSpecificationGroupStyles as styles } from "./compare-specification-group.styles";

type Props = { group: ComparisonGroup };

export const CompareSpecificationGroup = observer(({ group }: Props) => {
  const store = useComparePageStore();
  const isExpanded = !store.collapsedGroups.has(group.id);
  const contentId = `comparison-group-${group.id}`;
  return (
    <section>
      <h2 {...stylex.props(styles.heading)}>
        <button
          type="button"
          {...stylex.props(styles.toggle)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => store.toggleGroup(group.id)}
        >
          {group.label}
          <Image
            src={isExpanded ? uiAssets.angleUp : uiAssets.angleDown}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </h2>
      <div id={contentId} hidden={!isExpanded}>
        {group.rows.map((row) => (
          <CompareSpecificationRow key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
});
