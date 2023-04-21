---
Title: Markdown Usage
---

We get content in **Markdown** format from the CMS. We render the Markdown content using the `Markdown` component provided by the `@astrojs/markdown-component` library.

```astro
---
import Markdown from "@astrojs/markdown-component";

const { page } = Astro.props;
---

<div class="prose">
  <Markdown>{page.Block_text}</Markdown>
</div>
```

If you have to render the markdown content programmatically, you'll need to use the [`renderMarkdown`](/src/utils/renderMarkdown.ts) utility function.

```astro
---
import { parseHTML } from "linkedom";
import renderMarkdown from "@utils/renderMarkdown";

const { page } = Astro.props,
  IntroHTML = await renderMarkdown(page.Intro_text);

const { document: IntroDocument } = parseHTML(IntroHTML),
  titles = [...IntroDocument.querySelectorAll("h2")];
---

{
  titles.map((title) => {
    return <h2>{title.textContent}</h2>;
  })
}
```
