import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { footerStyles as styles } from "./footer.styles";

export const FooterBottom = () => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(styles.bottom)}>
      <div {...stylex.props(styles.legal)}>
        <span>{t("footer.copyright")}</span>
        <Link href="/">{t("footer.terms")}</Link>
        <Link href="/">{t("footer.privacy")}</Link>
      </div>
      <span>{t("footer.made")}</span>
    </div>
  );
};
