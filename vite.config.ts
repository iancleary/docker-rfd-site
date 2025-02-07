import "dotenv/config";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
// @ts-ignore
import { denyImports } from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";

// tell typescript to ignore type definitions for next line
// @ts-ignore
import styleX from "vite-plugin-stylex";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    styleX({
      libraries: ["@iancleary/design-system/styles/tokens.stylex"],
      // // https://stylexjs.com/docs/api/configuration/babel-plugin/#unstable_moduleresolution
      unstable_moduleResolution: {
        type: "commonJS",
        //
        // rootDir cannot be "."
        // rootDir must be "./" since that resolves to the absolute path
        rootDir: "./",
      },
      useRemForFontSize: true,
    }),
    denyImports({
      client: {
        specifiers: ["fs-extra", /^node:/],
        files: ["**/.server/*", "**/*.server.*"],
      },
      server: {
        specifiers: ["jquery"],
      },
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: "ES2022", // <--------- ✅✅✅✅✅✅
  },
});
