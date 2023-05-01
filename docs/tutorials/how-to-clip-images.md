---
Title: How to clip images
---

We use clipped images and elements too on many parts of the website. We have created dedicated components for this purpose to make clipping elements easier. Below is described how to clip elements using these components.

## Define the SVG clip path

First, you need to define the SVG clip path. To do this, you have to use the [`ClipPathSVG`](/src/components/ClipPathSVG.astro) component. This component accepts the following props:

- `id` - the ID of the clip path. This ID is used to reference the clip path in the `clip-path` CSS property.
- `path` - the SVG path that defines the clipping area.

```astro
---
import ClipPathSVG from "@components/ClipPathSVG.astro";
---

<ClipPathSVG
  id="hero-background-curve"
  path="M1 0v.939A.27.27 0 0 1 .828 1H.81A1.462 1.462 0 0 1 .648.987C.586.981.522.974.451.974.376.974.312.981.252.988.202.994.156 1 .11 1H.097C.009.996 0 .956 0 .956V0"
/>
```

**Note:** You'll have to extract the paths from the **Figma** file. Once you get the path, you should optimize it first. You can use [SVGOMG](https://jakearchibald.github.io/svgomg/) for this. Once you have the optimized path, you can pass it to the `path` prop.

## Apply the clip path to the element

Once you have defined the clip path, you can apply it to the element using the [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) CSS property.

```astro
<section
  class="hero overflow-hidden relative"
  style="clip-path: url(#hero-background-curve);"
>
  {/* ... */}
</section>
```

## `ClippedPicture` component

If you have to clip an image, and also optimize it, you can use the [`ClippedPicture`](/src/components/ClippedPicture.astro) component. This component accepts the same props as the [`Picture`](https://astro-imagetools-docs.vercel.app/components/Picture) component provided by `astro-imagetools`. In addition, it accepts the `id` and `path` like the `ClipPathSVG` component.

```astro
---
import ClippedPicture from "@components/ClippedPicture.astro";
---

<ClippedPicture
  id="estate-map-curve"
  sizes="calc(100vw - min(10vw, 200px))"
  alt={page.Location?.data?.attributes.alternativeText}
  src={ASSETS_URL + page.Location?.data?.attributes.url}
  path="M.04.089C.086.001.164.009.262.005c.165-.007.26.005.425 0 .115-.003.179 0 .242.029C.977.057 1 .335 1 .513.996.676 1 .9.946.927.888.952.753.961.694.976.583 1 .464.97.363.976.271.982.156 1 .054.927 0 .859-.001.687 0 .513.002.348-.007.18.04.089"
/>
```
