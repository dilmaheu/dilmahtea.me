---
Title: How to implement dynamic functionalities
---

By dynamic functionalities, we refer to the interactive functionalities of the website that appear and function differently based on various parameters. We aren't going to talk about the dynamic things that we handle on the server side.

In web, it's obvious that we must use JavaScript to add interactive functionalities to the website. But since we are using Astro, we have multiple options to write code for the client side. Below is the list of the available options in the order of our priority:

1. Scripts
2. Framework components

## Scripts

We primarily use scripts to add dynamic functionalities to the website. Astro provides two ways to add scripts to the website:

1. Hoisted scripts
2. Inline scripts

We want to use hoisted scripts as much as possible because they are bundled and have _TypeScript_ support. But, if we need access to server-side variables, or if we want to run the script as soon as the browser sees it, we use inline scripts. Check out the [Astro documentation on Client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/) to know how to use them, what are their advantages and disadvantages, and what are their differences.

### `DynamicHTML` component

The `DynamicHTML` component is a custom Astro component that we have created to make it easier to dynamically add content to the HTML during page load.

The `DynamicHTML` components accepts content inside its body. All the Astro template features can be used inside the component body. The content can also have placeholders that can be replaced inside the `htmlFn`
or `voidFn` function props using the `window.replacePlaceholders` function.

The component accepts one of the two functions as props:

- `htmlFn`: The `htmlFn` function is called with a single argument, the rendered HTML component body. The function should return the processed HTML string that will be rendered in the browser.
- `voidFn`: The `voidFn` function is called with two arguments, the rendered HTML component body and the `document.currentScript` script element. The function should return nothing. It can use the HTML body and process it and append the dynamic content manually to the DOM.

**Note:** If any components are used inside the `DynamicHTML` component body, no placeholders should be used their props. Because are props are server-side and the placeholders will be replaced on the client-side.

#### Code Examples

Below is a simple example of how to use the `DynamicHTML` component:

```astro
<span class="order-total recoleta font-bold leading-[110%]">
  €<DynamicHTML htmlFn={() => window.cart.total} />
</span>
```

Below is an example with placeholders:

```astro
<DynamicHTML
  htmlFn={(content) => {
    const { origin, pathname } = location,
      origin_url = origin + pathname,
      success_url = `${origin}/${window.preferredLocale}/crowdfunding-confirmation`;

    return window.replacePlaceholders(content, {
      origin_url,
      success_url,
    });
  }}
>
  <input
    type="hidden"
    name="origin_url"
    value={`<placeholder name="origin_url"></placeholder>`}
  />

  <input
    type="hidden"
    name="success_url"
    value={`<placeholder name="success_url"></placeholder>`}
  />
</DynamicHTML>
```

Below in an example with placeholders and the `voidFn` function:

```astro
<DynamicHTML
  voidFn={(content, currentScript) => {
    const { origin, pathname } = location,
      origin_url = origin + pathname,
      success_url = `${origin}/${window.preferredLocale}/crowdfunding-confirmation`;

    const processedHTML = window.replacePlaceholders(content, {
      origin_url,
      success_url,
    });

    currentScript.insertAdjacentHTML("beforebegin", processedHTML);
  }}
>
  <input
    type="hidden"
    name="origin_url"
    value={`<placeholder name="origin_url"></placeholder>`}
  />

  <input
    type="hidden"
    name="success_url"
    value={`<placeholder name="success_url"></placeholder>`}
  />
</DynamicHTML>
```

Check out the `DynamicHTML` components that we have used in the project to get a better understanding on the real-world usage of the component.

**Note:** The `DynamicHTML` component has been used in some places where it has made the code too complex. When we had created the component, we didn't plan to use framework components. But now since we are using framework components, we want to eventually rewrite those parts with frameworks components to make them easier to maintain.

## Solid JS components (Framework components)

We try to avoid using framework components as much as possible since they are not the fastest and smallest way to add dynamic functionalities to the website. But after a certain level of complexity, performance becomes less important than maintainability. So, we use framework components when we need to add dynamic functionalities that are too complex to implement with scripts.

We use [Solid JS](https://www.solidjs.com/) as our framework of choice. To know more about how to work with Solid JS, check out the [How to work with Solid JS components](/docs/tutorials/how-to-work-with-solid-components.md) tutorial.
