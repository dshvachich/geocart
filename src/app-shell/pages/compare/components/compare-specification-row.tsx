import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import type { ComparisonRow } from "@/domain/entities/comparison";
import { useComparePageStore } from "../compare-page.context";
import { compareSpecificationRowStyles as styles } from "./compare-specification-row.styles";

type Props = { row: ComparisonRow };

export const CompareSpecificationRow = observer(({ row }: Props) => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  return (
    <dl {...stylex.props(styles.row)}>
      <dt {...stylex.props(styles.label, styles.labelSpan(row.values.length))}>
        {row.label}
      </dt>
      {row.values.map((value, index) => (
        <dd
          key={store.products[index].id}
          {...stylex.props(styles.value)}
          aria-label={`${store.products[index].name}: ${value ?? t("compare.missingValue")}`}
        >
          {value ?? "—"}
        </dd>
      ))}
    </dl>
  );
});
