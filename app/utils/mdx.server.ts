import { GitHubFile, MdxListItem } from "types";
import fm from "front-matter";

function getSlug(s: string) {
    return s.replace(/.mdx/, "");
}

function getNumber(s: string) {
    return s.replace(/.mdx/, "").replace("rfd\/", "").replace(/^0+/, "");
}



export function getFrontmatterObject(data: GitHubFile): MdxListItem {


    var content = fm(data.content);

    var object = {
        number: getNumber(data.path), // '0042' ->'42'
        slug: getSlug(data.path),

        frontmatter: {
            //@ts-ignore
            title: content.attributes.title,
            //@ts-ignore
            authors: content.attributes.authors,
            //@ts-ignore
            state: content.attributes.state,
            //@ts-ignore
            labels: content.attributes.labels,
            //@ts-ignore
            pubDate: content.attributes.pubDate,
            //@ts-ignore
            updatedDate: content.attributes.updatedDate,
        }

    }
    // console.log(object);

    return object;
}

export async function getAllFrontmatter(
    dataList: GitHubFile[]
): Promise<MdxListItem[]> {
    // console.log(dirPath);
    const parsedFrontmatter = dataList.map(getFrontmatterObject);

    // console.log(files);

    return parsedFrontmatter;
}