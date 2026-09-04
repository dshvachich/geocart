import * as stylex from "@stylexjs/stylex";

export const favoritesControlsStyles = stylex.create({
  section: {
    backgroundColor: "var(--color-bg-primary)",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: {
      default: 72,
      "@media (max-width: 760px)": 56,
    },
    paddingTop: {
      default: 16,
      "@media (max-width: 760px)": 8,
    },
    paddingBottom: 16,
    overflow: "hidden",
    backgroundColor: "var(--color-bg-primary)",
  },
  filtersGroup: {
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: 8,
  },
  clearFilterButton: {
    display: {
      default: "none",
      "@media (max-width: 760px)": "inline-flex",
    },
    flex: "0 0 auto",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    height: 32,
    padding: "4px 12px",
    borderWidth: 0,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
  },
  mobileDivider: {
    display: {
      default: "none",
      "@media (max-width: 760px)": "block",
    },
    flex: "0 0 2px",
  },
  tags: {
    display: "flex",
    minWidth: 0,
    gap: {
      default: 8,
      "@media (max-width: 760px)": 4,
    },
    alignItems: "center",
    overflowX: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  viewSegment: {
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    flex: "0 0 auto",
    alignItems: "center",
    gap: 2,
    height: 40,
    padding: 2,
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
  },
  segmentButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  activeSegment: {
    backgroundColor: "var(--color-bg-primary)",
  },
});
