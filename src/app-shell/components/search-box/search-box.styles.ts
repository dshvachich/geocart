import * as stylex from "@stylexjs/stylex";

export const searchBoxStyles = stylex.create({
  field: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "center",
    gap: 4,
    minWidth: 160,
    height: 40,
    padding: "8px 12px",
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-secondary)",
  },
  navbarField: {
    minWidth: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
  },
  overlayField: {
    backgroundColor: {
      default: "var(--color-bg-primary)",
      "@media (max-width: 760px)": "var(--color-bg-secondary)",
    },
  },
  input: {
    width: "100%",
    minWidth: 0,
    borderWidth: 0,
    outline: "none",
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    fontSize: 16,
    lineHeight: "24px",
    "::placeholder": {
      color: "var(--color-fg-secondary)",
    },
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    overflowY: "auto",
    backgroundColor: {
      default: "var(--color-overlay)",
      "@media (max-width: 760px)": "var(--color-bg-primary)",
    },
  },
  overlayBar: {
    position: {
      default: "absolute",
      "@media (max-width: 760px)": "static",
    },
    top: {
      default: 16,
      "@media (max-width: 760px)": null,
    },
    left: {
      default: "calc((100vw - var(--layout-max-width)) / 2 + 313px)",
      "@media (max-width: 1180px)": "50%",
      "@media (max-width: 760px)": null,
    },
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    width: {
      default: 705,
      "@media (max-width: 1180px)": "min(705px, calc(100vw - 32px))",
      "@media (max-width: 760px)": "100%",
    },
    maxWidth: {
      default: "calc(100vw - 32px)",
      "@media (max-width: 760px)": 760,
    },
    marginInline: {
      default: null,
      "@media (max-width: 760px)": "auto",
    },
    padding: {
      default: 0,
      "@media (max-width: 760px)": "8px 16px",
    },
    transform: {
      default: null,
      "@media (max-width: 1180px)": "translateX(-50%)",
      "@media (max-width: 760px)": "none",
    },
  },
  closeButton: {
    flex: "0 0 auto",
    display: {
      default: "none",
      "@media (max-width: 760px)": "inline-flex",
    },
  },
  hints: {
    position: {
      default: "absolute",
      "@media (max-width: 760px)": "static",
    },
    top: {
      default: 64,
      "@media (max-width: 760px)": null,
    },
    left: {
      default: "calc((100vw - var(--layout-max-width)) / 2 + 313px)",
      "@media (max-width: 1180px)": "50%",
      "@media (max-width: 760px)": null,
    },
    width: {
      default: 705,
      "@media (max-width: 1180px)": "min(705px, calc(100vw - 32px))",
      "@media (max-width: 760px)": "100%",
    },
    maxWidth: {
      default: "calc(100vw - 32px)",
      "@media (max-width: 760px)": 760,
    },
    marginInline: {
      default: null,
      "@media (max-width: 760px)": "auto",
    },
    padding: {
      default: "12px 0",
      "@media (max-width: 760px)": "8px 0 24px",
    },
    borderRadius: {
      default: 20,
      "@media (max-width: 760px)": 0,
    },
    backgroundColor: "var(--color-bg-primary)",
    transform: {
      default: null,
      "@media (max-width: 1180px)": "translateX(-50%)",
      "@media (max-width: 760px)": "none",
    },
  },
  hintHeading: {
    padding: {
      default: "4px 20px",
      "@media (max-width: 760px)": "4px 16px",
    },
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  hintRow: {
    display: "block",
    width: "100%",
    minHeight: {
      default: 48,
      "@media (max-width: 760px)": 40,
    },
    padding: {
      default: "12px 20px",
      "@media (max-width: 760px)": "10px 16px",
    },
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--color-bg-secondary)",
      ":focus-visible": "var(--color-bg-secondary)",
    },
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
    textAlign: "left",
    outline: {
      default: null,
      ":hover": 0,
      ":focus-visible": 0,
    },
  },
  hintDivider: {
    height: 1,
    margin: {
      default: "8px 20px",
      "@media (max-width: 760px)": "8px 16px",
    },
    borderRadius: 16,
    backgroundColor: "var(--color-divider-light)",
  },
  categorySuggestion: {
    display: "flex",
    gap: 4,
  },
  categorySuggestionPrefix: {
    fontWeight: 500,
  },
  categorySuggestionName: {
    fontWeight: 600,
  },
});
