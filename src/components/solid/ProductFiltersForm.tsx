import {
  productFilters,
  setProductFilters,
} from "@store/signals/productFilters";
import { onMount } from "solid-js";

function VariantOptions({ type, locale, data, tea_variant, tea_size }) {
  return data
    .map(({ attributes: { Title, products, localizations } }) => {
      const localizedTitle =
        locale === "en"
          ? Title
          : localizations.data.find(
              ({ attributes }) => attributes.locale.substring(0, 2) === locale
            )?.attributes.Title; // products of some variants might not be available in all locales

      if (localizedTitle) {
        const availableCombinations = JSON.stringify(
          Array.from(
            new Set(
              products.data.map(
                ({ attributes }) =>
                  attributes[type === "variant" ? "size" : "variant"].data
                    .attributes.Title
              )
            )
          )
        );

        return {
          Title,
          localizedTitle,
          availableCombinations,
        };
      }
    })
    .filter(Boolean)
    .sort((a, b) =>
      a.localizedTitle.localeCompare(b.localizedTitle, locale, {
        numeric: true,
      })
    )
    .map(({ Title, localizedTitle, availableCombinations }) => (
      <option
        value={Title}
        data-key={localizedTitle}
        data-available-combinations={availableCombinations}
        selected={(type === "variant" ? tea_variant : tea_size) === Title}
      >
        {localizedTitle}
      </option>
    ));
}

export default function ProductFiltersForm({
  locale,
  productSizes,
  productVariants,
  recurData,
}) {
  const { tea_variant, tea_size } = productFilters();

  function updateProductFilters(event) {
    const filters = Object.fromEntries(new FormData(this));

    localStorage.setItem("preferredFilters", JSON.stringify(filters));

    setProductFilters(filters);

    displayAvailableCombinations(event.target);
  }

  function displayAvailableCombinations(target) {
    const [selectedOption] = target.selectedOptions;

    const availableCombinations = JSON.parse(
      selectedOption.dataset.availableCombinations || "null"
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

        console.log(shouldBeHidden);

        option.hidden = shouldBeHidden;
        option.disabled = shouldBeHidden;
      });
  }

  onMount(() => {
    const filterSelectors = document.querySelectorAll(
      "#product-filters select"
    );

    filterSelectors.forEach((filterSelector) =>
      displayAvailableCombinations(filterSelector)
    );
  });

  return (
    <form
      id="product-filters"
      class="flex flex-wrap items-center gap-6"
      onchange={updateProductFilters}
    >
      <select
        id="tea_variant"
        name="tea_variant"
        class={[
          "focus:ring focus:ring-emerald-800 focus:ring-opacity-20 focus:outline-none",
          "text-lg leading-[150%] text-lightgray2 py-[9px] pl-5 border-r-[20px]",
          "border-primary bg-primary rounded-full cursor-pointer",
        ].join(" ")}
      >
        <option value="" selected>
          {recurData.text_all_tea_variants}
        </option>

        <VariantOptions
          type="variant"
          locale={locale}
          data={productVariants.data}
          tea_variant={tea_variant}
          tea_size={tea_size}
        />
      </select>

      <select
        id="tea_size"
        name="tea_size"
        class={[
          "focus:ring focus:ring-emerald-800 focus:ring-opacity-20 focus:outline-none",
          "text-lg leading-[150%] text-lightgray2 py-[9px] pl-5 border-r-[20px]",
          "border-primary bg-primary rounded-full cursor-pointer",
        ].join(" ")}
      >
        <option value="" selected>
          {recurData.text_all_tea_sizes}
        </option>

        <VariantOptions
          type="size"
          locale={locale}
          data={productSizes.data}
          tea_variant={tea_variant}
          tea_size={tea_size}
        />
      </select>
    </form>
  );
}
