/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

type MdxPage = {
  code: string;

  /**
   * It's annoying that all these are set to optional I know, but there's
   * no great way to ensure that the MDX files have these properties,
   * especially when a common use case will be to edit them without running
   * the app or build. So we're going to force you to handle situations when
   * these values are missing to avoid runtime errors.
   */
  frontmatter: {
    title?: string;
    authors?: string;
    state?: string;
    labels?: string;
    pubDate?: string;
    updatedDate?: string;
  };
};

/**
 * This is a separate type from MdxPage because the code string is often
 * pretty big and the pages that simply list the pages shouldn't include the code.
 */
type MdxPageWithoutCode = Omit<MdxPage, "code">;

type MdxListItem = MdxPageWithoutCode & {
  number: string;
  slug: string;
  editLink?: string;
};

type GitHubFile = { path: string; content: string };

export { MdxPage, MdxListItem, GitHubFile };
