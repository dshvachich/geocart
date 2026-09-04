import * as stylex from "@stylexjs/stylex";

export const footerStyles = stylex.create({
  footer: {
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-dark-secondary)",
  },
  rail: {
    paddingRight: {
      default: null,
      "@media (max-width: 760px)": 17,
    },
    paddingLeft: {
      default: null,
      "@media (max-width: 760px)": 17,
    },
  },
  main: {
    display: {
      default: "grid",
      "@media (max-width: 760px)": "flex",
    },
    gridTemplateColumns: "minmax(320px, 512px) repeat(3, minmax(140px, 1fr))",
    flexDirection: {
      default: null,
      "@media (max-width: 760px)": "column",
    },
    gap: 16,
    paddingTop: {
      default: 48,
      "@media (max-width: 760px)": 24,
    },
    paddingBottom: {
      default: 48,
      "@media (max-width: 760px)": 24,
    },
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: {
      default: 24,
      "@media (max-width: 760px)": 17,
    },
  },
  logo: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 4,
    marginLeft: 0,
    fontFamily: "var(--font-display)",
    fontSize: {
      default: 28,
      "@media (max-width: 760px)": 24,
    },
    fontWeight: 800,
    lineHeight: {
      default: "40px",
      "@media (max-width: 760px)": "32px",
    },
  },
  copy: {
    margin: 0,
    fontSize: 14,
    lineHeight: "20px",
  },
  controls: {
    display: "flex",
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: 16,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 8,
  },
  heading: {
    margin: 0,
    color: "var(--color-fg-dark-tertiary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  link: {
    margin: 0,
    fontSize: 14,
    lineHeight: "20px",
  },
  divider: {
    height: 1,
    backgroundColor: "var(--color-divider-dark)",
  },
  bottom: {
    display: "flex",
    alignItems: {
      default: "center",
      "@media (max-width: 760px)": "flex-start",
    },
    justifyContent: "space-between",
    flexDirection: {
      default: "row",
      "@media (max-width: 760px)": "column",
    },
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: {
      default: 24,
      "@media (max-width: 760px)": 16,
    },
    paddingTop: 24,
    paddingBottom: 24,
    color: "var(--color-fg-dark-tertiary)",
    fontSize: 14,
    lineHeight: "20px",
  },
  legal: {
    display: "flex",
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: {
      default: 16,
      "@media (max-width: 760px)": 4,
    },
    alignItems: "center",
  },
});
