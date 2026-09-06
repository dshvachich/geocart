import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import type { SearchFilter } from "@/domain/entities";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";

type FilterHeaderProps = {
  filter: SearchFilter;
  controlsId?: string;
  isExpanded: boolean;
  onToggle: () => void;
};

export const FilterHeader = ({
  controlsId,
  filter,
  isExpanded,
  onToggle,
}: FilterHeaderProps) => {
  const { t } = useTranslation();

  return (
    <button
      {...stylex.props(styles.filterHeader)}
      type="button"
      aria-controls={controlsId}
      aria-expanded={isExpanded}
      onClick={onToggle}
    >
      <span {...stylex.props(styles.filterHeaderText)}>
        {t(`filters.${filter.id}`, { defaultValue: filter.label })}
      </span>
      <Image
        {...stylex.props(iconStyles.icon)}
        src={isExpanded ? uiAssets.angleUp : uiAssets.angleDown}
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
};
