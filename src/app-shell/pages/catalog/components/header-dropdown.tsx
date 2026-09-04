import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { catalogPageStyles as styles } from "../catalog-page.styles";

type HeaderDropdownProps = {
  icon: string;
  label: string;
};

export const HeaderDropdown = ({ icon, label }: HeaderDropdownProps) => (
  <button {...stylex.props(styles.headerControl)} type="button">
    <Image
      {...stylex.props(iconStyles.icon)}
      src={icon}
      alt=""
      width={24}
      height={24}
    />
    <span>{label}</span>
    <Image
      {...stylex.props(iconStyles.iconSmall)}
      src={uiAssets.caret}
      alt=""
      width={12}
      height={12}
    />
  </button>
);
