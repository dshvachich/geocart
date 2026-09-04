import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";

type FooterControlProps = {
  icon: string;
  label: string;
};

export const FooterControl = ({ icon, label }: FooterControlProps) => (
  <button
    {...stylex.props(
      controlStyles.inlineControl,
      controlStyles.inlineControlOnDark,
    )}
    type="button"
  >
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
      src={uiAssets.footerCaret}
      alt=""
      width={12}
      height={12}
    />
  </button>
);
