import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node"; // or cloudflare/deno
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
    backgroundColor: colors.neutral950,
  },
});

declare global {
  interface Window {
    ENV: {
      TITLE: string;
    };
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    ENV: {
      TITLE: process.env.TITLE ?? "RFD / Ian Cleary",
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data == "undefined") {
    return [{ title: "RFD / Ian Cleary" }];
  } else {
    return [{ title: data.ENV.TITLE ?? "RFD" }];
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
