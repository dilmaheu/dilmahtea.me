---
Title: How to work with remote images
---

`astro-imagetools` supports remote images. So, you don't need to do anything special for remote images. Just pass the URL of the remote image to the `src` attribute of the component that you want to use.

```astro
---
import { Picture } from "astro-imagetools/components";

const { page } = Astro.props,
  { ASSETS_URL } = import.meta.env;
---

<Picture
  src={ASSETS_URL + page.Intro_blob.data.attributes.url}
  alt={page.Intro_blob.data.attributes.alternativeText}
  sizes="clamp(330px, 26.4vw + 150px, 560px)"
/>
```

But if you just need to import the remote image, and don't need advanced optimizations, you can use the `importRemoteImage` API provided by `astro-imagetools`. The `importRemoteImage` API is configured to be availble globally in the `astro-imagetools.config.mjs` file. So, you don't need to import it.

```astro
---
const { page } = Astro.props,
  { ASSETS_URL } = import.meta.env;

const favicon = importRemoteImage(
  ASSETS_URL + page.Favicon.data.attributes.url
);
---

<link rel="icon" href={favicon} />
```

## SVG Images from the CMS

`astro-imagetools` doesn't support SVG images. If you want to use SVG images from the CMS, you have to use the [`localizeCMSImage`](/src/utils/localizeCMSImage.js) utility function to localize the image. You can pass the relative image URLs provided by the CMS to the `localizeCMSImage` function directly.

```astro
---
import CMS from "@store/CMS";
import localizeCMSImage from "@utils/localizeCMSImage";

const { locale } = Astro.props.page;

const recurData = CMS.get("recurringElement", locale);

const { Nav_menu_cart_icon: cartIcon } = recurData;
---

<img
  src={await localizeCMSImage(cartIcon?.data?.attributes.url)}
  alt={cartIcon?.data?.attributes.alternativeText}
/>
```
