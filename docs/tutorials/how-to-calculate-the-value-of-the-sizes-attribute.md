---
Title: How to calculate the value of the `sizes` attribute
---

The `sizes` attribute is an attribute supported by the `img` and `picture` HTML elements. It's used by browsers to calculate the exact rendered width of an image before downloading and rendering it. It's used to determine the best image to download from the `srcset` attribute. THe default value of the `sizes` attribute is `100vw`.

It's crucial to set the `sizes` attribute correctly for **Image Optimization** to work properly. All the components provided by the `astro-imagetools` integration except `BackgroundImage` support the `sizes` attribute.

The `sizes` attribute is a string that contains a comma-separated list of media conditions and ends with a default width. The default width is used when none of the media conditions are met.

**Note:** Only `min-width` media conditions should be used in the `sizes` attribute. It's not a limitation of `astro-imagetools`, but we follow this convention for consistency. And for large `sizes` attributes, their values should be passed as an array of strings joined by commas for better readability.

Let's look at a few examples:

### Example 1

```astro
<style>
  .container {
    width: 300px;
  }
</style>

<div class="container">
  <Picture src="/path/to/image.ext" alt="Alt text" sizes="300px" />
</div>
```

In this example, the image inherits the width of the parent element. And the parent element has a fixed width of `300px`. So, the value of the `sizes` attribute should be `300px`.

### Example 2

```astro
<style>
  .container {
    width: 100vw;
    max-width: 300px;
  }
</style>

<div class="container">
  <Picture src="/path/to/image.ext" alt="Alt text" sizes="min(300px, 100vw)" />
</div>
```

In this example, the image inherits the width of the parent element. And the parent element has a `100vw` width with a `max-width` of `300px`. So, the value of the `sizes` attribute should be `min(300px, 100vw)`.

### Example 3

```astro
<style>
  .container {
    height: clamp(120px, 35vw + 10px, 165px);

    @media screen and (min-width: 768px) {
      height: clamp(100px, 15vw + 10px, 206px);
    }
  }
</style>

<div class="container absolute">
  <Picture
    alt="Alt text"
    src="/path/to/image-sm.ext"
    breakpoints={{ maxWidth: 768 }}
    sizes="calc(clamp(120px, 35vw + 10px, 165px) * 0.87)"
    artDirectives={[
      {
        src: "/path/to/image.ext",
        media: "(min-width: 768px)",
        breakpoints: { minWidth: 768 },
        sizes: "calc(clamp(100px, 15vw + 10px, 206px) * 1.15)",
      },
    ]}
  />
</div>
```

In this example, the image inherits the width of the parent element. But the parent element has a set height but not width. The width of the image has to be calculated from the height and the `aspect-ratio` of the image.

This is an art directed image. A diferrent image will be shown if the screen width is equal to or greater than `768px`. And the two images have a diferrent `aspect-ratio`. We can't tell what is the aspect ratio from the code. So, we have to calulcate it manually from the dimensions of the image.

In this case, the parent element's height before `768px` is `clamp(120px, 35vw + 10px, 165px)`, and the approximate aspect ratio of the image that's shown below `768px` is `0.87`. So, the value of the `sizes` attribute should be `calc(clamp(120px, 35vw + 10px, 165px) * 0.87)`.

And the parent element's height from `768px` is `calc(clamp(100px, 15vw + 10px, 206px)`, and the approximate aspect ratio of the image that's shown from `768px` is `1.15`. So, the value of the `sizes` attribute should be `calc(clamp(100px, 15vw + 10px, 206px) * 1.15)`.

### Example 4

```astro
<div class="md:w-[calc(100vw-72px)] px-[5vw]">
  <Picture
    src="/path/to/image.ext"
    alt="Alt text"
    sizes="(min-width: 640px) 90vw - 72px, 90vw"
  />
</div>
```

In this example, the image inherits the width of the parent element. The width of the parent element below `768px` is `100vw`, and from `768px` is `calc(100vw - 72px)`. But it also has `5vw` horizontal padding. So, the image width will be `10vw` less than the parent element width. So, the value of the `sizes` attribute should be `(min-width: 640px) 90vw - 72px, 90vw`.

### Example 5

```astro
<div
  class="wrapper grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[clamp(24px,3.125vw-8px,32px)]"
>
  {
    blogs.slice(0, 3).map((post, index) => (
      <div class="max-w-[380px] sm-max-w-none">
        <Picture
          src={post.Intro_blob.src}
          alt={post.Intro_blob.alt}
          sizes={[
            "(min-width: 1024px) calc((100vw - min(200px, 10vw) - (clamp(24px, 3.125vw - 8px, 32px) * 2)) / 3)",
            "(min-width: 640px) calc(45vw - 16px)",
            "min(90vw, 380px)",
          ].join(", ")}
        />
      </div>
    ))
  }
</div>
```

In this example, the image inherits the width of the parent element. The grand parent element is a grid container of 1 column below `640px`, 2 columns from `640px` to `1024px`, and 3 from `1024px`. The grid has a gap of `32px` below `640px`, and `clamp(24px, 3.125vw - 8px, 32px)` from `1024px`. Again, the `wrapper` class on the parent element adds a `min(100px, 5vw)` horizontal padding (check [`_base.scss`](/src/styles/_base.scss)).

The `sizes` attribute should have 3 values in this case, one for screens `>=` than `1024px`, one for screens `>=` than `640px` and a default value for screens smaller than `640px`.

To calculate the width of the image for screens `>=` than `1024px`, we have to subtract the horizontal padding of both sides from the width of the grand parent element, so `calc(100vw - min(200px, 10vw))`. Then we have to substract the space taken by the grid gaps. There are 3 columns, so there are 2 gaps, so `calc(100vw - min(200px, 10vw) - (clamp(24px, 3.125vw - 8px, 32px) * 2)`. Then we have to divide the remaining space by the number of columns, so `calc((100vw - min(200px, 10vw) - (clamp(24px, 3.125vw - 8px, 32px) * 2)) / 3)`.

We have to follow the same steps for screens `>=` than `640px`. Between `640px` and `1024px`, `min(200px, 10vw)` will always be `10vw`, so `calc(100vw - 10vw)` will always be `90vw`. And there are two columns & one gap, so the value of the `sizes` attribute should be `calc((90vw - 32px) / 2)`. But we can simplify it to `calc(45vw - 16px)`.

And, for screens smaller than `640px`, there's just one column & no gap, so the parent element width will be the same as the grand parent element, so `90vw`. But below `640px`, the parent element has `max-width` set to `380px`, so the value of the `sizes` attribute should be `min(90vw, 380px)`.

Finally, the values are passed as an array to the `sizes` attribute, and joined with a comma for the sake of readability.
