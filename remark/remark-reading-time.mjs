import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // Astro v4 / v5 puts frontmatter in data.astro.frontmatter
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
