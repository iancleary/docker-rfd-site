import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeShiki from "@shikijs/rehype";
import { LRUCache } from "lru-cache";

// This exists so we don't have to reprocess mdxStrings if they don't change
// for every request for a given blog post/mdx file.
const mdxCache = new LRUCache<string, ReturnType<typeof compileMdx>>({
    max: 1000,
});

export async function compileMdx(mdxString: string) {
    const { code, frontmatter } = await bundleMDX({
        source: mdxString,
        mdxOptions(options, frontmatter) {
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMath];
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                [
                    /**
                     * Adds support for math
                     */
                    rehypeKatex,
                    {
                        // https://katex.org/docs/options.html
                        displayMode: true,
                        output: "mathml",
                    },
                ],
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                [
                    /**
                     * Adds support for math
                     */
                    rehypeShiki,
                    {
                        // Multiple themes
                        // https://shiki.style/packages/rehype
                        theme: "github-dark-default",
                        inline: "tailing-curly-colon", // or other options
                    },
                ],
            ];
            return options;
        },
    });
    return { code: code, frontmatter: frontmatter };
}

export async function complileMdxCached(mdxString: string) {
    if (mdxCache.has(mdxString)) {
        return mdxCache.get(mdxString)!;
    }
    return await compileMdx(mdxString);
}
