import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { SearchBreadcrumb } from "@/domain/entities";
import { searchPageStyles as styles } from "../search-page.styles";
import { SearchBreadcrumbs } from "./search-breadcrumbs";

type SearchHeaderProps = {
  breadcrumbs: SearchBreadcrumb[];
  eyebrow: string;
  title: string;
};

export const SearchHeader = ({
  breadcrumbs,
  eyebrow,
  title,
}: SearchHeaderProps) => (
  <section {...stylex.props(layoutStyles.section, styles.surfaceSection)}>
    <div {...stylex.props(layoutStyles.contentRail, styles.header)}>
      <SearchBreadcrumbs breadcrumbs={breadcrumbs} />
      {eyebrow && <p {...stylex.props(styles.eyebrow)}>{eyebrow}</p>}
      <h1 {...stylex.props(styles.title)}>{title}</h1>
    </div>
  </section>
);
