import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, size } from "@iancleary/design-system/styles/tokens.stylex";
import { Link } from "@remix-run/react";
import { Paragraph } from "~/utils/mdx";
import { MdxListItem } from "types";

const styles = stylex.create({
  text: {
    color: colors.neutral900,
    paddingTop: size.medium,
    paddingBottom: size.medium,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  link: {
    color: colors.neutral700,
    textDecoration: "none",
  },
  gridWrapper: {
    display: "grid",
    gridTemplateColumns: "8fr 3fr 3fr 5fr",
    columnGap: size.small,
    // columnGap: size.medium,
    // columns: 12,
    // width: "100%",
    // height: "3rem",
    backgroundColor: colors.neutral200,
    borderRadius: size.medium,
    // marginBottom: "1rem",
  },
  gridColumnNamesRow: {
    paddingInlineStart: size.medium,
    textTransform: "uppercase",
    // paddingInlineEnd: size.medium,
  },
  gridColumnNames: {
    color: colors.neutral900,
    paddingTop: size.medium,
    paddingBottom: size.medium,

    fontSize: size.medium,
  },
  gridContentRowWrapper: {
    paddingTop: size.medium,
  },
  gridContentRow: {
    paddingInlineStart: size.medium,
    backgroundColor: colors.neutral100,
  },
  gridContent: {
    color: colors.neutral900,
    paddingTop: size.medium,
    paddingBottom: size.medium,
    fontSize: size.medium,
    columnGap: size.small,
  },
  topHelpers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingInlineStart: size.medium,
    paddingInlineEnd: size.medium,
  },
  number: {
    fontSize: "1rem",
    display: "inline-flex",
    backgroundColor: {
      default: "inherit",
      ":hover": colors.neutral200,
    },
    padding: size.xsmall,
    borderRadius: size.small,
    width: "auto",
  },
  state: {
    textTransform: "capitalize",
    color: colors.neutral900,
    display: "flex",
    alignItems: "center",
  },
  date: {
    textTransform: "capitalize",
    color: colors.neutral900,
    display: "flex",
    alignItems: "center",
  },
  labels: {
    textTransform: "capitalize",
    color: colors.neutral900,
    display: "flex",
    alignItems: "center",
  },
});

function getDateFormat(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

function ContentTable({
  mdxListItems,
}: {
  mdxListItems: MdxListItem[];
}): React.ReactElement {
  return (
    <div>
      <h1 {...stylex.props(styles.main, styles.text)}>
        Requests for Discussion
      </h1>
      <div>
        <div {...stylex.props(styles.topHelpers)}>
          {/* <div {...stylex.props(styles.text)}>Filter</div> */}
          <div {...stylex.props(styles.text)}></div>
          <div {...stylex.props(styles.text)}>Results: {mdxListItems.length}</div>
        </div>
        <div {...stylex.props(styles.gridWrapper, styles.gridColumnNamesRow)}>
          <div {...stylex.props(styles.gridColumnNames)}>Number / Title</div>
          <div {...stylex.props(styles.gridColumnNames)}>State</div>
          <div {...stylex.props(styles.gridColumnNames)}>Updated</div>
          <div {...stylex.props(styles.gridColumnNames)}>Labels</div>
        </div>
        {mdxListItems.map((mdxListItem) => (
          <div
            {...stylex.props(styles.gridContentRowWrapper)}
            key={mdxListItem.slug}
          >
            <div {...stylex.props(styles.gridWrapper, styles.gridContentRow)}>
              <div {...stylex.props(styles.gridContent)}>
                <Link
                  {...stylex.props(styles.link)}
                  to={mdxListItem.slug}
                  key={mdxListItem.number}
                >
                  <div {...stylex.props(styles.number)}>
                    <div>
                      <div>
                        RFD <span>{mdxListItem.number}</span>
                      </div>
                      <div>{mdxListItem.frontmatter.title}</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div {...stylex.props(styles.state)}>{mdxListItem.frontmatter.state}</div>
              <div {...stylex.props(styles.date)}>
                {(mdxListItem.frontmatter.updatedDate !== undefined && getDateFormat(mdxListItem.frontmatter.updatedDate)) ?? "updatedDate is not defined"}
              </div>
              <div {...stylex.props(styles.labels)}>{mdxListItem.frontmatter.labels}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentTable;
