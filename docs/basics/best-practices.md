---
Title: Coding Best Practices
---

## 1. Validate the HTML

Make sure the generated HTML is W3C validated using the [W3C Markup Validator](https://validator.w3.org/). It helps to prevent unexpected errors and helps improve SEO.

## 2. Make sure the website is accessible

Always make sure the website is WCAG compliant. Whenever you add a new feature, test it both manually such as using a screen reader and automatically using tools such as [WAVE](https://wave.webaim.org/).

The tools are not perfect and they can't detect all the issues. Always remember to add proper labels to any custom interactive elements and make them navigable using keyboard.

## 3. Dynamic Content

All the content of our website must update whenever the content is updated in the CMS. Make sure that there are no hardcoded values in the code and the data updates whether they are handled on the server-side or client-side.

## 4. I18N

Make sure that the website is fully localized. The website must be fully functional in all the supported languages and work properly even if content isn't available in all the languages.

## 5. Casing

Using the appropriate _case_ is an important part of naming things. We adhere to the following guidelines to select the correct case:

1. kebab-case: ID & Classes, SASS modules & variables, documentation pages, font files, custom attributes; e.g. `checkout-info-form`, `hero-img-container`, `_poly-fluid.scss`, `poly-fluid-sizing`, `best-practices.md`, `recoleta-v2.woff2`, `data-available-combinations`
2. camelCase: JS/TS variables, Solid signals, Solid component slots, utilities,; e.g. `preferredLocale`, `productFilters.ts`, `alertCircleIcon`, `renderMarkdown.ts`
3. snake_case: CMS fields; e.g. `checkout_step_order`;
4. PascalCase: Components, Stores; e.g. `BlogDetails.astro`, `CMS.js`
5. MACRO_CASE: Environmental variables, Constants; e.g. `ACCESS_TOKEN`, `CMS_IMAGES_DIR`

**Note:** We have used non-conventation cases for most of our CMS fields, such as `Intro_blob`, `Intro_Text`. Now, it'll take a lot of efforts to go through all of the fields and change their names. So, we'll continue to use them as they are. But, for any new fields, we'll use the correct case.

## 6. Formatting

Before pushing, make sure the code is formatted. Both manual and automatic efforts may be required to format the code. You must leave space between elements, lines of code, and style rules, properly separate them (for JS, with code blocks and semi-colons), and may have to edit the auto-formatted code if it does not look good enough.

The command to run the auto-formatter (_Prettier_) is:

```bash
pnpm format
```

If you want to preview the changes before applying them, then run:

```bash
pnpm format:preview
```

## 7. Use descriptive names

All of the things we have to name, such as _variables_, _filenames_, _CMS fields_, and so on, must have descriptive names that explain what they mean and do.

```js
// don't do this
function calcTime(x) {
  var d = x[0];
  var h = x[1];
  var m = x[2];

  // ...
}

// do this
function calcTime(timeArray) {
  const [day, hour, minute] = timeArray;

  // ...
}
```

## 8. Write scoped styles

If a set of styles applies only to one page or component, they must be scoped to that page or component. It guarantees that the styles will be applied.

```astro
---
// don't do this
import styles from "../path/to/styles.scss";
---

<!-- do this -->
<style>
  /* ... */
</style>
```

## 9. Use _Semantic Tags_

Instead of using plain _divs_ for everything, always try to use semantic tags, such as: `<section>` for different sections of a webpage, `<article>` for content, `<nav>` for navigations, `<header>` and `<footer>` for the header and footer, and so on. It improves accessibility and makes the code more descriptive.

## 10. Recurring Elements & Images

We have different content types for _Collections_ (Blog, How-to, Recipes, etc.) and _Singles_ (Blog Details, How-to Details, Recipe Details, etc.). But it's possible that a piece of data or an image will be used across multiple pages of the same type or different types. Create a new field in the `Recurring_elements` content-type for it, or `Recurring Images` for images, and add them via the _Content Manager_.

If there are too many recurring elements that have been used only in one type of content, then it's better to create a new single content-type for them. For example, we have the `Aria label recurring element` content-type for the aria labels and related texts and we have the `Checkout Recurring Elements` content-type for the checkout pages.

## 11. Order attributes by importance and specificity

Attributes of an element should be ordered by their importance and specificity. For example, `id` should always come before `class` or `class:list`. Or, if there are uncommon attributes, that are specific to a certain element, they should come first, such as `role`, `aria-label`, `tabindex`, etc.

```astro
{/* don't do this */}
<div
  class:list={[
    "focus:outline-1 outline-black -outline-offset-1",
    "h-full ml-auto overflow-y-auto text-black bg-secondary",
  ]}
  id="cart-overlay-products-container"
  role="alert"
  tabindex="0"
  aria-label={checkoutRecurData.Aria_label_cart_focus_text}
>
  ...
</div>

{/* do this */}
<div
  role="alert"
  tabindex="0"
  aria-label={checkoutRecurData.Aria_label_cart_focus_text}
  id="cart-overlay-products-container"
  class:list={[
    "focus:outline-1 outline-black -outline-offset-1",
    "h-full ml-auto overflow-y-auto text-black bg-secondary",
  ]}
>
  ...
</div>
```

## 12. Order classes by importance and specificity

The same rule applies to the classes of an element. They should be ordered by their importance and specificity. The primary class names should come before the secondary class names (e.g. Tailwind classes). And the primary class names should be listed in the order of their specificity.

```astro
{/* don't do this */}
<div
  class="relative h-full flex flex-wrap justify-center z-30 wrapper hero-text-container"
>
  ...
</div>

{/* do this */}
<div
  class="hero-text-container wrapper relative h-full flex flex-wrap justify-center z-30"
>
  ...
</div>
```

## 13. Use `class:list`

Use the `class:list` template directive instead of the `class` attribute if an element has a long list of classes, or if it contains interpolations or is concatenated, or if there are any conditional classes. It improves the organization of the classes and increases readability.

```astro
{/* don't do this */}
<div
  class={"relative w-full sm:w-1/2 order-1 mb-4 sm:mb-0 " + isEven
    ? "pr-0 sm:pr-5 md:pr-12 lg:pr-24"
    : "sm:order-2 pl-0 sm:pl-5 md:pl-12 lg:pl-24"}
>
  ...
</div>

{/* do this */}
<div
  class:list={[
    "relative w-full sm:w-1/2 order-1 mb-4 sm:mb-0",
    isEven
      ? "pr-0 sm:pr-5 md:pr-12 lg:pr-24"
      : "sm:order-2 pl-0 sm:pl-5 md:pl-12 lg:pl-24",
  ]}
>
  ...
</div>
```

## 14. Use Tailwind classes as much as possible

Always try to use Tailwind classes for simple styles both inside the `class` attribute and custom styles. It helps to keep the code closer to the HTML and the stylesheets more organized. As a result, it's much easier to tweak any styles in this way.

Using arbitrary classes is fine but if any classes are complex to read and understand, then it's better to use custom styles.

## 15. Order listlike things by length from shortest to longest

Order listlike things such as imports by length from shortest to longest. It makes them look cleaner and easier to read.

```astro
---
// don't do this
import { Picture } from "astro-imagetools/components";
import CMS from "@store/CMS";
import RecurringImages from "@store/RecurringImages";
import BaseLayout from "@layouts/BaseLayout.astro";
import ClipPathSVG from "@components/ClipPathSVG.astro";

// do this
import CMS from "@store/CMS";
import BaseLayout from "@layouts/BaseLayout.astro";
import RecurringImages from "@store/RecurringImages";
import { Picture } from "astro-imagetools/components";
import ClipPathSVG from "@components/ClipPathSVG.astro";
---
```

## 16. Separate the imports into groups

When there are many imports (e.g. more than 5), separate the similar imports into groups with a line break between each group. It makes the imports look cleaner and easier to manage.

```astro
---
// don't do this
import CMS from "@store/CMS";
import SearchBar from "@components/SearchBar.astro";
import RecurringImages from "@store/RecurringImages";
import localizeCMSImage from "@utils/localizeCMSImage";
import ClipPathSVG from "@components/ClipPathSVG.astro";
import DynamicHTML from "@components/DynamicHTML.astro";
import { Picture, BackgroundPicture } from "astro-imagetools/components";
import LangSelectorsDropdown from "@components/LangSelectorsDropdown.astro";

// do this
import { Picture, BackgroundPicture } from "astro-imagetools/components";

import CMS from "@store/CMS";
import RecurringImages from "@store/RecurringImages";
import localizeCMSImage from "@utils/localizeCMSImage";

import SearchBar from "@components/SearchBar.astro";
import ClipPathSVG from "@components/ClipPathSVG.astro";
import DynamicHTML from "@components/DynamicHTML.astro";
import LangSelectorsDropdown from "@components/LangSelectorsDropdown.astro";
---
```

## 17. Always use import aliases

Always use import aliases to import components, styles, utilities or any other files. It helps to keep the imports organized and makes them easier to manage.

```astro
---
// don't do this
import ClippedPicture from "../components/ClippedPicture.astro";

// do this
import ClippedPicture from "@components/ClippedPicture.astro";
---
```

## 18. Extract raster images from SVGs

For the curved designs, Figma embeds raster images (PNG, JPG, WEBP, and so on) within SVGs. They must be pulled out from the SVGs so that it's possible to optimize them and for accessibility reasons. If you are having difficulty, seek assistance from the seniors.

## 19. Use _layouts_

If a _layout_ for a specific type of page is available, it must be used. Add slots for any use cases that aren't covered by the layout.

## 20. Break down large components

If a page/component grows too long (hundreds of lines of code), or if some parts of it are too specific and will improve the readability of the component if removed, break it down into multiple components. It helps to keep the codebase organized.

## 21. Generate elements on the server-side

Remember that if the data required to generate/create an element or elements is available on the server in any form, they can always be generated on the server. If you are having difficulty, seek assistance from the seniors.

## 22. Don't conditionally hide elements on the client-side

If an element or elements are shown conditionally and data about both the condition and the elements is available on the server-side, don't hide the elements on the client-side, instead don't generate them.

```astro
{/* don't do this */}
<img
  class:list={["mt-20", step.Step_blob.data !== null && "hidden"]}
  src={imgSrcPrefix +
    step.Step_blob.data.attributes.provider_metadata.public_id +
    `/small`}
/>

{/* do this */}
{
  step.Step_blob.data ?? (
    <img
      class="mt-20"
      src={
        imgSrcPrefix +
        step.Step_blob.data.attributes.provider_metadata.public_id +
        `/small`
      }
    />
  )
}
```

## 23. Always use JavaScript comments instead of HTML comments

HTML comments are exposed to the client. Comments are used to help us, our development team understand the code. We don't want other developers to see them. Use JavaScript comments if you need to use comments within Astro components.

```astro
{/* don't do this */}
<!-- <ClippedPicture
  id="crowdfunding-info-bg-curve"
  src={crowdfunding_info_section_background.src}
  path="M1,0.055 S0.962,-0.005,0.847,0 C0.729,0.006,0.602,0.049,0.484,0.044 C0.381,0.04,0.239,0.018,0.136,0.028 C0.073,0.034,0,0.055,0,0.055 V0.965 s0.032,0.035,0.156,0.035 c0.061,0,0.136,-0.012,0.193,-0.027 c0.06,-0.016,0.161,-0.017,0.231,-0.017 c0.074,0,0.2,0.037,0.315,0.01 s0.106,-0.071,0.106,-0.071 V0.055"
/> -->

{/* do this */}
{
  /* (
    <ClippedPicture
      id="crowdfunding-info-bg-curve"
      src={crowdfunding_info_section_background.src}
      path="M1,0.055 S0.962,-0.005,0.847,0 C0.729,0.006,0.602,0.049,0.484,0.044 C0.381,0.04,0.239,0.018,0.136,0.028 C0.073,0.034,0,0.055,0,0.055 V0.965 s0.032,0.035,0.156,0.035 c0.061,0,0.136,-0.012,0.193,-0.027 c0.06,-0.016,0.161,-0.017,0.231,-0.017 c0.074,0,0.2,0.037,0.315,0.01 s0.106,-0.071,0.106,-0.071 V0.055"
    />
  ) */
}
```

## 24. Balance between performance and nice-looking when writing code

When building logic, give more importance to performance than making the code looking nice but don't make it gibberish just to make it run just a few milliseconds faster unless it's absolutely necessary.

```js
const fruits = ["apple", "banana", "orange", "grape", "watermelon"];

// don't do this
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// do this
fruits.forEach((fruit) => console.log(fruit));
```

## 25. Use block-scoped variables

All variables should be declared using `let` and `const` unless using `var` makes sense. It keeps the variables scoped to the block they are defined within and helps to avoid variable naming and memory issues.

```js
// don't do this
var d = timeArray[0];
var h = timeArray[1];
var m = timeArray[2];

// do this
const [day, hour, minute] = timeArray;
```

## 26. Avoid disemvoweling

Avoid disemvoweling variable names. It makes them harder to read and understand. If you want to shorten the names, use common short forms instead.

```astro
---
// don't do this
locales.map((lcl, idx) => {});

// do this
locales.map((locale, i) => {});
---
```

## 27. Always perform strict equality check

When comparing equality of two values, always use the _strict equality check_ (`===`) rather than the _loose equality check_ (`==`). It helps to prevent unexpected errors.

```astro
{/* don't do this */}
{page.type == "homepage" && <Posts page={page} />}

{/* do this */}
{page.type === "homepage" && <Posts page={page} />}
```

## 28. Convert values to boolean when checking for truthiness

When checking for truthiness, convert the value to boolean if the expression signature doesn't make sense.

```js
const hasToRemoveItem = !!target.closest(".remove-item-btn");
```

```js
const productExistsInCart = !!cart[productId];
```

## 29. Remove unused variables

Remove any unused variables that have never been used or have become obsolete after a recent rewrite/refactoring to keep the code clean.

## 30. Use \_ to indicate unused parameters

If a callback function accepts multiple parameters but you don't need to one or multiple of the first parameters, use `_` to indicate that the parameter is unused.

```js
// don't do this
const blogPages = getPages(homeBlog, (page, { locale }) => ({
  type: "blog",
  posts: locale && getPosts(blogs, locale),
}));

// do this
const blogPages = getPages(homeBlog, (_, { locale }) => ({
  type: "blog",
  posts: locale && getPosts(blogs, locale),
}));
```

## 31. Prefix mobile versions with `sm`/`Sm`

If there are two different versions of something for mobile and desktop, always prefix the name/label for the mobile version with `sm` or `Sm` depending on what language you are using. Even if there's no need to name/label the desktop version, the mobile version should must be prefixed with `sm` or `Sm`.

```astro
{/* don't do this */}
<div>
  {/* Desktop version */}
  <div>...</div>

  {/* Mobile version */}
  <div id="localization-menu-open-btn">...</div>
</div>

{/* do this */}
<div>
  {/* Desktop version */}
  <div>...</div>

  {/* Mobile version */}
  <div id="localization-menu-sm-open-btn">...</div>
</div>

<script>
  // don't do this
  const localizationMenuOpenBtn = document.getElementById(
    "localization-menu-open-btn"
  );

  // do this
  const localizationMenuSmOpenBtn = document.getElementById(
    "localization-menu-sm-open-btn"
  );
</script>
```
