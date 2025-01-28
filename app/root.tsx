import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import * as stylex from "@stylexjs/stylex";
import { colors } from "@iancleary/design-system/styles/tokens.stylex";
import { Root } from "~/layouts/root";
// import "./index.css";
import stylexCSS from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylexCSS },
];

const styles = stylex.create({
  root: {
    backgroundColor: colors.neutral50,
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...stylex.props(styles.root)}>
      {/* <html lang="en"> */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Root>{children}</Root>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
