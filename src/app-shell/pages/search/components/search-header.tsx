import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { searchPageStyles as styles } from "../search-page.styles";

type SearchHeaderProps = {
  showEyebrow: boolean;
  title: string;
};

export const SearchHeader = ({
  showEyebrow,
  title,
}: SearchHeaderProps) => {
  const { t } = useTranslation();

  return (
    <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
        {showEyebrow && (
          <p {...stylex.props(styles.eyebrow)}>{t("search.resultsEyebrow")}</p>
        )}
        <h1 {...stylex.props(styles.title)}>{title}</h1>
      </div>
    </section>
  );
};
