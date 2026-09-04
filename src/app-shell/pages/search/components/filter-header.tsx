import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import type { SearchFilter } from "@/domain/entities";
import { filtersPageStyles as styles } from "../filters-page.styles";

type FilterHeaderProps = {
  filter: SearchFilter;
};

export const FilterHeader = ({ filter }: FilterHeaderProps) => (
  <button {...stylex.props(styles.filterHeader)} type="button">
    <span {...stylex.props(styles.filterHeaderText)}>{filter.label}</span>
    <Image
      {...stylex.props(iconStyles.icon)}
      src={filter.type === "collapsed" ? uiAssets.angleDown : uiAssets.angleUp}
      alt=""
      width={24}
      height={24}
    />
  </button>
);
