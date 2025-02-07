import React, { useMemo } from "react";
import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Main } from "~/layouts/main";
import { H1, MDXPage, Paragraph } from "~/utils/mdx";
import { downloadFile } from "~/utils/github.server";
import { complileMdxCached } from "~/utils/compile-mdx.server";

// import * as stylex from "@stylexjs/stylex";
// import {
//   colors,
//   line,
//   size,
//   spacing,
// } from "@iancleary/design-system/styles/tokens.stylex";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `RFD ${params.id}` },
    { name: "description", content: `Request for Discussion ${params.id}` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const mdxString = await downloadFile(`rfd/${params.id}.mdx`);

  const { code, frontmatter } = await complileMdxCached(mdxString);

  const number = params.id ?? "Number";
  return json({
    code: code,
    frontmatter: frontmatter,
    number: number.replace(/^0+/, ""), // '0042' ->'42'
  });
}

export default function Post({}) {
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  // const { code, frontmatter, number } = useLoaderData<typeof loader>();
  const { code, frontmatter, number } = useLoaderData<typeof loader>();

  useEffect(() => {
    document.title = `${number} - ${frontmatter.title}`;
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <Main>
      <div>
        <H1>{frontmatter.title}</H1>
        {/* <Paragraph>{JSON.stringify({ frontmatter })}</Paragraph> */}
      </div>
      <MDXPage code={code} />
    </Main>
  );
}
