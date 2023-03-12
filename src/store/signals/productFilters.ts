import { createSignal } from "solid-js";

declare interface ProductFilters {
  tea_variant?: string;
  tea_size?: string;
}

const [productFilters, setProductFilters] = createSignal<ProductFilters>(
  JSON.parse(localStorage.getItem("preferredFilters") || "{}")
);

export { productFilters, setProductFilters };
