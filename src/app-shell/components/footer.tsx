"use client";

import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { FooterBottom } from "./footer/footer-bottom";
import { FooterBrand } from "./footer/footer-brand";
import { FooterColumn } from "./footer/footer-column";
import { footerColumns } from "./footer/footer.constants";
import { footerStyles as styles } from "./footer/footer.styles";

export const Footer = observer(() => {
  const appStore = useContainer().get(AppStore);

  return (
    <footer {...stylex.props(layoutStyles.section, styles.footer)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.rail)}>
        <div {...stylex.props(styles.main)}>
          <FooterBrand language={appStore.languageLabel} />

          {footerColumns.map((column) => (
            <FooterColumn
              key={column.id}
              links={column.links}
              titleKey={column.titleKey}
            />
          ))}
        </div>

        <div {...stylex.props(styles.divider)} />
        <FooterBottom />
      </div>
    </footer>
  );
});
