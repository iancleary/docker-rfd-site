import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "@iancleary/design-system/styles/tokens.stylex";

const styles = stylex.create({
  text: {
    color: colors.neutral100,
  },
});

function Demo() {
  return <div {...stylex.props(styles.text)}>Neat demo!</div>;
}

export default Demo;
