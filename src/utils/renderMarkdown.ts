import { marked } from "marked";

export default function renderMarkdown(markdown: string): string {
  const html = marked(markdown);

  return html;
}
