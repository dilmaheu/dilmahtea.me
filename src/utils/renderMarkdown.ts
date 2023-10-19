import { marked } from "marked";
import { parseHTML } from "linkedom";

export default function renderMarkdown(markdown: string, cid?: string): string {
  const html = marked(markdown);

  if (cid) {
    const { document } = parseHTML(html);

    document.querySelectorAll("*").forEach((element) => {
      element.setAttribute(cid, "");
    });

    return document.toString();
  }

  return html;
}
