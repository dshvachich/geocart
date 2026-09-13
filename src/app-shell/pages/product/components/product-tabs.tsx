"use client";

import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useProductPageStore } from "../product-page.context";
import { productTabsStyles as styles } from "./product-tabs.styles";

const tabs = ["overview", "prices", "specifications"] as const;
const comingTabs = ["feedback", "discussions", "reviews"] as const;

export const ProductTabs = observer(() => {
  const store = useProductPageStore();
  const { t } = useTranslation();
  return (
    <div
      id="product-tabs"
      {...stylex.props(layoutStyles.contentRail, styles.container)}
    >
      <div
        role="tablist"
        aria-label={t("productPage.sections")}
        {...stylex.props(styles.tabs)}
      >
        {tabs.map((tab, index) => (
          <Fragment key={tab}>
            {index > 0 && (
              <span aria-hidden="true" {...stylex.props(styles.divider)} />
            )}
            <button
              type="button"
              role="tab"
              id={`product-tab-${tab}`}
              aria-selected={store.activeTab === tab}
              aria-controls={`product-panel-${tab}`}
              tabIndex={store.activeTab === tab ? 0 : -1}
              onKeyDown={store.handleTabKeyDown}
              onClick={() => store.selectTab(tab)}
              {...stylex.props(
                styles.tab,
                store.activeTab === tab && styles.active,
              )}
            >
              {t(`productPage.${tab}`)}
              {tab === "prices" && (
                <span {...stylex.props(styles.count)}>
                  {store.product.offers.length}
                </span>
              )}
            </button>
          </Fragment>
        ))}
        {comingTabs.map((tab) => (
          <Fragment key={tab}>
            <span aria-hidden="true" {...stylex.props(styles.divider)} />
            <button
              type="button"
              role="tab"
              aria-selected={false}
              disabled
              {...stylex.props(styles.tab, styles.disabled)}
            >
              {t(`productPage.${tab}`)}
              <span {...stylex.props(styles.soon)}>
                {t("productPage.soon")}
              </span>
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
});
