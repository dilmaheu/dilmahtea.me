import {
  MarkdownRenderingOptions,
  renderMarkdown as astroMarkdownRemarkRenderMarkdown,
} from "@astrojs/markdown-remark";

export default async function renderMarkdown(
  markdown: string,
  opts?: MarkdownRenderingOptions,
): Promise<string> {
  const { code } = await astroMarkdownRemarkRenderMarkdown(
    markdown,
    opts ?? {},
  );

  return code;
}
