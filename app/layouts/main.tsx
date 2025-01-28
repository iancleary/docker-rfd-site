import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    fontFamily: "system-ui, sans-serif",
    overflow: "hidden",

    width: {
      "@media (max-width: 1400px)": "90%",
      default: "60%",
    },
    paddingBlockStart: {
      default: 16,
      "@media (min-width: 800px)": 32,
    },
    paddingBlockEnd: {
      default: 16,
      "@media (min-width: 800px)": 32,
    },
  },
});

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.content)}>{children}</div>
    </div>
  );
}
