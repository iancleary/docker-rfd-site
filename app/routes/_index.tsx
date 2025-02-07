import React from "react";
import type { MetaFunction, SerializeFrom } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import RfdTable from "~/components/rfdTable";
import { downloadMdxFileOrDirectory } from "~/utils/github.server"
import { getAllFrontmatter } from "~/utils/mdx.server"
import { Main } from "~/layouts/main";

import { GitHubFile, MdxListItem } from "types";

export async function loader({ params }: LoaderFunctionArgs) {

  const { entry, files } = await downloadMdxFileOrDirectory(`rfd`);

  const frontMatterList = await getAllFrontmatter(files);


  // console.log(parsedFiles);
  return json({
    files: files,
    frontMatterList: frontMatterList,
  });
}

function typeCleanseFiles(
  parsedFiles: SerializeFrom<GitHubFile>[]
): GitHubFile[] {
  return parsedFiles;
}

function typeCleanseFrontmatter(
  parsedFiles: SerializeFrom<MdxListItem>[]
): MdxListItem[] {
  return parsedFiles;
}

export default function Index(): React.ReactElement {
  const { files, frontMatterList } = useLoaderData<typeof loader>();
  // console.log(parsedFiles);
  const rfds = typeCleanseFiles(files);
  // console.log(rfds);

  const rfdsFrontmatter = typeCleanseFrontmatter(frontMatterList);
  // console.log(rfdsFrontmatter);

  return (
    <Main>
      <RfdTable rfds={rfdsFrontmatter} />
      {/* <Paragraph>{JSON.stringify(rfds)}</Paragraph> */}
      {/* <Paragraph>{JSON.stringify(rfdsFrontmatter)}</Paragraph> */}
    </Main>
  );
}
