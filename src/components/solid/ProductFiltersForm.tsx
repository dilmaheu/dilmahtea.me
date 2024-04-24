import {
  productFilters,
  setProductFilters,
} from "@store/signals/productFilters";
import { onMount } from "solid-js";

const VariantOptions = ({ type, data, tea_variant, tea_size }) =>
  data.map(({ Title, localizedTitle, availableCombinations }) => (
    <option
      value={Title}
      data-key={localizedTitle}
      data-available-combinations={availableCombinations}
      selected={(type === "variant" ? tea_variant : tea_size) === Title}
    >
      {localizedTitle}
    </option>
  ));

export default function ProductFiltersForm({
  productSizes,
  productVariants,
  recurData,
  ariaLabelRecurData,
  type,
}) {
  const { tea_variant, tea_size } = productFilters();

  function updateProductFilters(event) {
    const filters = Object.fromEntries(new FormData(this));

    sessionStorage.setItem("preferredFilters", JSON.stringify(filters));

    setProductFilters(filters);

    displayAvailableCombinations(event.target);
  }

  function displayAvailableCombinations(target) {
    const [selectedOption] = target.selectedOptions;

    const availableCombinations = JSON.parse(
      selectedOption.dataset.availableCombinations || "null",
    );

    (target.name === "tea_variant"
      ? target.nextElementSibling
      : target.previousElementSibling
    )
      .querySelectorAll("option:not([value=''])")
      .forEach((option: HTMLOptionElement) => {
        const shouldBeHidden =
          availableCombinations &&
          !availableCombinations.includes(option.value);

        option.hidden = shouldBeHidden;
        option.disabled = shouldBeHidden;
      });
  }

  onMount(() => {
    const filterSelectors = document.querySelectorAll(
      "#product-filters select",
    );

    filterSelectors.forEach((filterSelector) =>
      displayAvailableCombinations(filterSelector),
    );
  });

  return (
    <form
      id="product-filters"
      class="flex flex-wrap items-center division-in-element-gap"
      onchange={updateProductFilters}
    >
      <select
        aria-label={ariaLabelRecurData.Select_tea_variant_text}
        id="tea_variant"
        name="tea_variant"
        class={[
          type === "header" ? "selector-default" : "selector-primary",
          "max-w-[90vw]",
        ].join(" ")}
      >
        <option value="" selected>
          {recurData.text_all_tea_variants}
        </option>

        <VariantOptions
          type="variant"
          data={productVariants.data}
          tea_variant={tea_variant}
          tea_size={tea_size}
        />
      </select>

      <select
        aria-label={ariaLabelRecurData.Select_tea_size_text}
        id="tea_size"
        name="tea_size"
        class={[
          type === "header" ? "selector-default" : "selector-primary",
          "max-w-[90vw]",
        ].join(" ")}
      >
        <option value="" selected>
          {recurData.text_all_tea_sizes}
        </option>

        <VariantOptions
          type="size"
          data={productSizes.data}
          tea_variant={tea_variant}
          tea_size={tea_size}
        />
      </select>
    </form>
  );
}
