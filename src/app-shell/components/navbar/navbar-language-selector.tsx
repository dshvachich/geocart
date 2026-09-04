import Image from "next/image";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import type { AppStore } from "@/app-shell/app-store";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { navbarLanguageOptions } from "./navbar.constants";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarLanguageSelectorProps = {
  appStore: AppStore;
};

export const NavbarLanguageSelector = observer(
  ({ appStore }: NavbarLanguageSelectorProps) => {
    const { t } = useTranslation();

    return (
      <div {...stylex.props(styles.dropdownAnchor)}>
        <button
          {...stylex.props(controlStyles.inlineControl)}
          type="button"
          aria-label={t("common.language")}
          aria-expanded={appStore.isLanguageMenuOpen}
          aria-haspopup="menu"
          onClick={appStore.toggleLanguageMenu}
        >
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.globe}
            alt=""
            width={24}
            height={24}
          />
          <span>{appStore.languageLabel}</span>
          <Image
            {...stylex.props(
              iconStyles.iconSmall,
              appStore.isLanguageMenuOpen && styles.caretOpen,
            )}
            src={uiAssets.caret}
            alt=""
            width={12}
            height={12}
          />
        </button>

        {appStore.isLanguageMenuOpen && (
          <div
            {...stylex.props(styles.dropdown, styles.languageDropdown)}
            role="menu"
          >
            <div {...stylex.props(styles.dropdownHeading)}>
              {t("common.language")}
            </div>
            {navbarLanguageOptions.map((language) => (
              <button
                {...stylex.props(styles.dropdownRow)}
                key={language.locale}
                type="button"
                role="menuitemradio"
                aria-checked={language.locale === appStore.language}
                onClick={() => appStore.setLanguage(language.locale)}
              >
                <Image
                  {...stylex.props(styles.dropdownFlag)}
                  src={language.flag}
                  alt=""
                  width={24}
                  height={24}
                />
                <span>{language.title}</span>
                {language.locale === appStore.language && (
                  <span
                    {...stylex.props(styles.dropdownCheck)}
                    aria-hidden="true"
                  >
                    <Image
                      src={uiAssets.checkmark}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
