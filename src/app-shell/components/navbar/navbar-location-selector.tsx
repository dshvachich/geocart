import Image from "next/image";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { AppStore } from "@/app-shell/app-store";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { navbarLocationOptions } from "./navbar.constants";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarLocationSelectorProps = {
  appStore: AppStore;
};

export const NavbarLocationSelector = observer(
  ({ appStore }: NavbarLocationSelectorProps) => (
    <div {...stylex.props(styles.dropdownAnchor)}>
      <button
        {...stylex.props(controlStyles.inlineControl)}
        type="button"
        aria-expanded={appStore.isLocationMenuOpen}
        aria-haspopup="menu"
        onClick={appStore.toggleLocationMenu}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.location}
          alt=""
          width={24}
          height={24}
        />
        <span>{appStore.location.city}</span>
        <Image
          {...stylex.props(
            iconStyles.iconSmall,
            appStore.isLocationMenuOpen && styles.caretOpen,
          )}
          src={uiAssets.caret}
          alt=""
          width={12}
          height={12}
        />
      </button>

      {appStore.isLocationMenuOpen && (
        <div
          {...stylex.props(styles.dropdown, styles.locationDropdown)}
          role="menu"
        >
          <div {...stylex.props(styles.dropdownHeading)}>Location</div>
          {navbarLocationOptions.map((city) => (
            <button
              {...stylex.props(styles.dropdownRow)}
              key={city}
              type="button"
              role="menuitem"
              onClick={() =>
                appStore.setLocation({
                  city,
                  country: "Georgia",
                })
              }
            >
              <span>{city}</span>
              {city === appStore.location.city && (
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
  ),
);
