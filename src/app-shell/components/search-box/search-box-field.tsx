import Image from "next/image";
import type { Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { searchBoxStyles as styles } from "./search-box.styles";

type SearchBoxFieldProps = {
  fieldRef?: Ref<HTMLFormElement>;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onSubmit: () => void;
  value: string;
  variant: "navbar" | "overlay";
};

export const SearchBoxField = ({
  fieldRef,
  inputRef,
  onChange,
  onFocus,
  onSubmit,
  value,
  variant,
}: SearchBoxFieldProps) => {
  const { t } = useTranslation();

  return (
    <form
      {...stylex.props(
        styles.field,
        variant === "navbar" && styles.navbarField,
        variant === "overlay" && styles.overlayField,
      )}
      ref={fieldRef}
      role="search"
      aria-label={t("common.search")}
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
        placeholder={t("common.search")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
      />
    </form>
  );
};
