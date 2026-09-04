import Image from "next/image";
import type { Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { searchBoxStyles as styles } from "./search-box.styles";

type SearchBoxFieldProps = {
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onSubmit: () => void;
  value: string;
  variant: "navbar" | "overlay";
};

export const SearchBoxField = ({
  inputRef,
  onChange,
  onFocus,
  onSubmit,
  value,
  variant,
}: SearchBoxFieldProps) => (
  <form
    {...stylex.props(
      styles.field,
      variant === "navbar" && styles.navbarField,
      variant === "overlay" && styles.overlayField,
    )}
    role="search"
    aria-label="Search products"
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
  >
    <Image
      {...stylex.props(iconStyles.icon)}
      src={uiAssets.search}
      alt=""
      width={24}
      height={24}
    />
    <input
      {...stylex.props(styles.input)}
      ref={inputRef}
      placeholder="Search products"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onFocus={onFocus}
    />
  </form>
);
