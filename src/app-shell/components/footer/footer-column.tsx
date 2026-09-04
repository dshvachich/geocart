import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { footerStyles as styles } from "./footer.styles";

type FooterLink = {
  id: string;
  titleKey: string;
};

type FooterColumnProps = {
  links: FooterLink[];
  titleKey: string;
};

export const FooterColumn = ({ links, titleKey }: FooterColumnProps) => {
  const { t } = useTranslation();
  const title = t(titleKey);

  return (
    <nav {...stylex.props(styles.column)} aria-label={title}>
      <p {...stylex.props(styles.heading)}>{title}</p>
      {links.map((link) => (
        <Link {...stylex.props(styles.link)} href="/" key={link.id}>
          {t(link.titleKey)}
        </Link>
      ))}
    </nav>
  );
};
