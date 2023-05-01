---
Title: Responsive Styling
---

**Responsiveness** refers to the ability of a website to adapt to and provide a good UX & UI on different screen sizes. It must be ensured across all the areas of the website.

## Media Queries

Media queries are the most common way to write responsive styles. The `min-width` and `max-width` queries are the most commonly used ones. They are used to apply styles to elements based on the viewport width.

We try to avoid using media queries directly since we are using **Tailwind CSS**. Instead, we want to rely on the [responsive styling features](https://tailwindcss.com/docs/responsive-design) provided by Tailwind CSS.

```astro
<!-- don't do this -->
<style>
  @media screen and (min-width: 768px) {
    .container {
      width: 50%;
    }
  }
</style>

<!-- do this -->
<div class="container md:w-1/2">
  {/* ... */}
</div>
```

But in some cases, it's not possible to avoid using media queries. For example, when we want to use a different query, or if the provided breakpoints are not enough, or if the `class` or `class:list` props become overcomplicated.

```astro
<style>
  @media screen and (min-width: 412px) {
    .container {
      width: 50%;
    }
  }
</style>

<div class="container">
  {/* ... */}
</div>
```

**Note:** Since responsive styling in **Tailwind CSS** is based on the `min-width` media query by default and what we are doing, we want to use only and only `min-width` media queries in custom styles. It makes it easier to compare the code to Tailwind styles and keep the design mobile-first.

```scss
selector {
  // don't do this
  grid-template-columns: repeat(auto-fill, minmax(200px, 5fr));

  @media (max-width: 639.98px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  // do this
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 5fr));
  }
}
```

## Fluid Styling

**Fluid Styling** is an interesting way to write responsive styles so that the styles adapt to all screen sizes automatically without writing multiple conditional media queries. It is achieved through using relative units like `rem`, `vw`, `%`, etc., and CSS functions like `clamp()`, `calc()`, `min()`, etc.

```css
.hero-icon {
  height: calc(6vw + 15px);
  min-height: 40px;
  max-height: 100px;
}
```

It's a good example of a fluid styling that works well across all devices and screen sizes without writing media queries to adjust it. The height of the `hero-icon` is calculated using a combination of the `vw` & `px` units. And so that the value doesn't produce weird results in small & large screen sizes, we have set a minimum and maximum value.

The above style can be simplified using the modern CSS `clamp()` function.

```css
.hero-icon {
  height: clamp(40px, 6vw + 15px, 100px);
}
```

### `poly-fluid-clamp`

`poly-fluid-clamp` is a SASS mixin to automatically generate a `clamp()` function for a given property given the values for the minimum & maximum end of the range where the value should change fluidly.

```scss
@use "src/styles/poly-fluid" as *;

.nav-icon {
  width: poly-fluid-clamp(
    (
      768px: 35px,
      1024px: 50px,
    )
  );
  height: poly-fluid-clamp(
    (
      768px: 35px,
      1024px: 50px,
    )
  );
  padding: poly-fluid-clamp(
    (
      768px: 10px,
      1024px: 12px,
    )
  );
}
```

### `poly-fluid-sizing`

`poly-fluid-sizing` is a SASS mixin to automatically generate fluid styles using the `calc()` function across multiple breakpoints given the values for different breakpoints.

```scss
@use "src/styles/poly-fluid" as *;

.hero {
  @include poly-fluid-sizing(
    "padding-top",
    (
      639.98px: 135px,
      640px: 70px,
      768px: 74px,
      1024px: 104px,
    )
  );
}
```
