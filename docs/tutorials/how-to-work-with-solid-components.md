---
Title: How to work with Solid JS components
---

We try to rely on _Astro components_ as much as possible. So, we try to use vanilla JS for client side dynamic functionalities. But for complex dynamic functionalities it's not good to use the Astro components since it'll be too complicated to handle. In such cases, we use [Solid JS](https://www.solidjs.com/) components.

**Note:** We are not going to discuss how to use Solid JS components here. Check out the [Solid JS documentation](https://www.solidjs.com/guides).

## Sharing State

In many cases, we might need to share one state between multiple components. Solid JS has built-in support for this. To do this, first create a signal and export the _Accessor_ & _Setter_ from a module. We store the signals in the `src/store/signals` directory.

```ts
import { createSignal } from "solid-js";

declare interface ProductFilters {
  tea_variant?: string;
  tea_size?: string;
}

const [productFilters, setProductFilters] = createSignal<ProductFilters>(
  JSON.parse(localStorage.getItem("preferredFilters") || "{}")
);

export { productFilters, setProductFilters };
```

Then import the _Accessor_ & _Setter_ in the components where you want to use it.

## Pruning props

In Astro, when we pass props to a client-side rendered framework component, we pass the props from the _server side_.
And if any of the props is an object, we might not need all the properties or sub-properties of it. The passed props get stringified and added to the final HTML. So, we should pass only the required data to the client-side.

We store the Solid JS components in the `src/components/solid` directory. Create an _Astro wrapper component_ in the same directory with the same name as the Solid component. We'll import it instead of the Solid component wherever we'll use it. The wrapper component should accept the props required by the Solid component and prune the props before passing them. Render the slots inside the wrapper component and pass them as props.

```astro
---
import FilteredProducts from "@solid/FilteredProducts";

let { page, recurData, white_right_arrow, category, subCategory } = Astro.props;

const alertCircleIcon = await Astro.slots.render("alertCircleIcon");

page = {
  Aria_label_all_teas_text: page.Aria_label_all_teas_text,
  Aria_label_tea_item_text: page.Aria_label_tea_item_text,
};

recurData = {
  Item_stock_text: recurData.Item_stock_text,
  Product_sold_out_text: recurData.Product_sold_out_text,
  Product_stock_other_formats_text: recurData.Product_stock_other_formats_text,
};
---

<FilteredProducts
  client:load
  alertCircleIcon={alertCircleIcon}
  page={page}
  recurData={recurData}
  white_right_arrow={white_right_arrow}
  category={category}
  subCategory={subCategory}
/>
```
