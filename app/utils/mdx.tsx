import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

import * as stylex from "@stylexjs/stylex";
import {
  colors,
  line,
  size,
  spacing,
} from "@iancleary/design-system/styles/tokens.stylex";

import Demo from "~/components/demo";
import { Link, useLinkClickHandler } from "@remix-run/react";

const styles = stylex.create({
  h1: {
    color: colors.neutral100,
    paddingTop: size.large,
  },
  h2: {
    color: colors.neutral100,
    paddingTop: size.medium,
  },
  h3: {
    color: colors.neutral100,
    paddingTop: size.small,
  },
  h4: {
    color: colors.neutral100,
    paddingTop: size.small,
  },
  h5: {
    color: colors.neutral100,
  },
  h6: {
    color: colors.neutral100,
  },
  p: {
    color: colors.neutral100,
    lineHeight: "1.5rem",
    paddingBlockStart: size.medium,
    paddingBlockEnd: size.medium,
    fontSize: "1.1rem",
  },
  a: {
    color: colors.supportingPurple300,
  },
  ul: {
    color: colors.neutral100,
  },
  li: {
    color: colors.neutral100,
  },
  blockquote: {
    paddingInlineStart: size.medium,
    borderInlineStartColor: colors.neutral700,
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "0.2rem",
  },
  code: {
    backgroundColor: colors.neutral900,
    color: colors.neutral200,
    // padding: size.xsmall,
  },
  preWrapper: {
    paddingTop: size.medium,
    paddingBottom: size.medium,
  },
  pre: {
    backgroundColor: colors.neutral900,
    borderWidth: "0.1em",
    borderColor: colors.neutral600,
    borderStyle: "solid",
    borderRadius: size.small,
    color: colors.neutral800,
    paddingTop: size.small,
    paddingLeft: size.small,
    paddingBottom: size.small,
    // Allow horizontal scroll of child code block
    position: "relative",
    overflow: "auto",
  },
  b: {
    fontWeight: 800,
  },
  strong: {
    fontWeight: 800,
    // color: "red",
  },
  math: {
    color: colors.neutral100,
    fontSize: "1.1rem",
    paddingTop: size.small,
  },
});

export function H1({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h1">) {
  return <h1 {...stylex.props(styles.h1)}>{children}</h1>;
}

export function H2({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h2">) {
  return <h2 {...stylex.props(styles.h2)}>{children}</h2>;
}

export function H3({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h3">) {
  return <h3 {...stylex.props(styles.h3)}>{children}</h3>;
}

export function H4({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h4">) {
  return <h4 {...stylex.props(styles.h4)}>{children}</h4>;
}

export function H5({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h5">) {
  return <h5 {...stylex.props(styles.h5)}>{children}</h5>;
}

export function H6({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h6">) {
  return <h6 {...stylex.props(styles.h6)}>{children}</h6>;
}

export function Paragraph({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"p">) {
  return <p {...stylex.props(styles.p)}>{children}</p>;
}

export function Blockquote({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote {...stylex.props(styles.blockquote)}>{children}</blockquote>
  );
}

export function Ul({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"ul">) {
  return <ul {...stylex.props(styles.ul)}>{children}</ul>;
}

export function Li({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"li">) {
  return <li {...stylex.props(styles.li)}>{children}</li>;
}

export function Anchor({
  children,
  href,
  ...rest
}: React.ComponentPropsWithoutRef<"a">) {
  if (href !== undefined) {
    return (
      <Link to={href} {...stylex.props(styles.a)}>
        {children}
      </Link>
    );
  }
  return <a {...stylex.props(styles.a)}>{children}</a>;
}
export function Strong({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"strong">) {
  return <strong {...stylex.props(styles.strong)}>{children}</strong>;
}

export function Code({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"code">) {
  return <code {...stylex.props(styles.code)}>{children}</code>;
}

export function Pre({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"pre">) {
  return <pre {...stylex.props(styles.pre)}>{children}</pre>;
}

export function Math({ children }: { children: React.ReactNode }) {
  //@ts-ignore
  return <math {...stylex.props(styles.math)}>{children}</math>;
}

export function MDXPage({ code }: { code: string }) {
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <main>
      <Component
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          p: Paragraph,
          a: Anchor,
          ul: Ul,
          li: Li,
          blockquote: Blockquote,
          strong: Strong,
          code: Code,
          pre: Pre,
          math: Math,
          Demo: Demo,
        }}
      />
    </main>
  );
}

export default MDXPage;
