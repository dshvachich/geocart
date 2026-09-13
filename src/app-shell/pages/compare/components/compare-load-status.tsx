import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useComparePageStore } from "../compare-page.context";
import { compareLoadStatusStyles as styles } from "./compare-load-status.styles";

export const CompareLoadStatus = observer(() => {
  const store = useComparePageStore();
  const { t } = useTranslation();
  if (
    store.isLoading ||
    (!store.failedIds.length && !store.unavailableIds.length)
  ) {
    return null;
  }
  return (
    <div
      {...stylex.props(layoutStyles.contentRail, styles.status)}
      role="status"
    >
      {store.failedIds.length > 0 && (
        <div {...stylex.props(styles.message)}>
          <p>{t("compare.loadError")}</p>
          <button
            type="button"
            {...stylex.props(styles.button)}
            onClick={store.loadProducts}
          >
            {t("productPage.retry")}
          </button>
        </div>
      )}
      {store.unavailableIds.length > 0 && (
        <div {...stylex.props(styles.message)}>
          <p>
            {t("compare.unavailable", { count: store.unavailableIds.length })}
          </p>
          <button
            type="button"
            {...stylex.props(styles.button)}
            onClick={store.removeUnavailableProducts}
          >
            {t("compare.removeUnavailable")}
          </button>
        </div>
      )}
    </div>
  );
});
