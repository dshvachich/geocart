import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useComparePageStore } from "../compare-page.context";
import { compareControlsStyles as styles } from "./compare-controls.styles";

export const CompareControls = observer(() => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  return (
    <div {...stylex.props(layoutStyles.contentRail)}>
      <div {...stylex.props(styles.controls)}>
        <div
          {...stylex.props(styles.segment)}
          role="group"
          aria-label={t("compare.details")}
        >
          <button
            type="button"
            {...stylex.props(
              styles.option,
              !store.differencesOnly && styles.selected,
            )}
            aria-pressed={!store.differencesOnly}
            onClick={store.showAllDetails}
          >
            {t("compare.allDetails")}
          </button>
          <button
            type="button"
            {...stylex.props(
              styles.option,
              store.differencesOnly && styles.selected,
            )}
            aria-pressed={store.differencesOnly}
            onClick={store.showDifferentDetails}
          >
            {t("compare.differentDetails")}
          </button>
        </div>
        <button
          type="button"
          {...stylex.props(styles.deleteButton)}
          onClick={store.removeActiveCategory}
        >
          <Image
            src={uiAssets.comparisonDelete}
            alt=""
            width={24}
            height={24}
          />
          {t("compare.deleteList")}
        </button>
      </div>
    </div>
  );
});
