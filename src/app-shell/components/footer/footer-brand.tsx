import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { FooterControl } from "./footer-control";
import { footerStyles as styles } from "./footer.styles";

type FooterBrandProps = {
  language: string;
};

export const FooterBrand = ({ language }: FooterBrandProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.brand)}>
      <div>
        <p {...stylex.props(styles.logo)}>{t("common.brand")}</p>
        <p {...stylex.props(styles.copy)}>
          {t("footer.description")}
          <br />
          {t("footer.contact")}
        </p>
      </div>

      <div {...stylex.props(styles.controls)}>
        <FooterControl icon={uiAssets.footerGlobe} label={language} />
      </div>
    </div>
  );
};
