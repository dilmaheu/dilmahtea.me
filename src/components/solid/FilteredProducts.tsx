import { createSignal, For, onMount } from "solid-js";

export default function FilteredProducts({
  formBody,
  blockText,
  alertCircleIcon,
  page,
  recurData,
  ASSETS_URL,
  white_right_arrow,
  productsAPIEndpoint,
}) {
  const [products, setProducts] = createSignal([]);

  function updateProducts() {
    const productFiltersForm: HTMLFormElement =
      document.querySelector("#product-filters");

    const locale = document.documentElement.lang,
      tea_variant = productFiltersForm.tea_variant.value,
      tea_size = productFiltersForm.tea_size.value,
      preferredProductsFilters = JSON.parse(
        window?.localStorage.getItem("preferredProductsFilters") || "{}"
      );

    localStorage.setItem(
      "preferredFilters",
      JSON.stringify({
        tea_variant,
        tea_size,
      })
    );

    fetch(productsAPIEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale,
        tea_variant,
        tea_size,
        preferredProductsFilters,
      }),
    })
      .then((res) => res.json())
      .then((products) => {
        if (products.error) {
          console.error(products.error);
        } else {
          setProducts(products);
        }
      });
  }

  function loadPreferredFilters() {
    const preferredFilters = JSON.parse(
      localStorage.getItem("preferredFilters") || "{}"
    );

    Object.keys(preferredFilters).forEach((filter) => {
      const selectedOptionElement: HTMLOptionElement = document.querySelector(
        `#product-filters [name="${filter}"] option[value="${preferredFilters[filter]}"]`
      );

      if (selectedOptionElement) {
        selectedOptionElement.selected = true;
      }
    });
  }

  if (!import.meta.env.SSR && typeof window !== "undefined") {
    loadPreferredFilters();
    updateProducts();
  }

  onMount(loadPreferredFilters);

  function filterProducts(event) {
    const target = event.target as HTMLSelectElement,
      [selectedOption] = target.selectedOptions;

    if (selectedOption.value === "") {
      this.querySelectorAll("select option").forEach((option) => {
        option.hidden = false;
        option.disabled = false;
      });
    } else {
      const availableCombinations = JSON.parse(
        selectedOption.dataset.availableCombinations
      );

      (target.name === "tea_format"
        ? target.nextElementSibling
        : target.previousElementSibling
      )
        .querySelectorAll("option:not([value=''])")
        .forEach((option: HTMLOptionElement) => {
          const shouldBeHidden = !availableCombinations.includes(option.value);

          option.hidden = shouldBeHidden;
          option.disabled = shouldBeHidden;
        });
    }

    updateProducts();
  }

  return (
    <section role="main">
      <div class="wrapper grid gap-5 mb-[30px]">
        <form
          onchange={filterProducts}
          id="product-filters"
          class="flex flex-wrap items-center gap-6"
        >
          {formBody}
        </form>

        {blockText}
      </div>

      <div
        id="products"
        role="list"
        aria-label={page.Aria_label_all_teas_text}
        class="wrapper grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] overflow-hidden"
      >
        <For each={products()}>
          {(product, iSignal) => {
            return (
              <div
                role="listitem"
                aria-label={page.Aria_label_tea_item_text + (iSignal() + 1)}
                style="clip-path: url(#product-card-curve)"
                class="product-card link-section flex flex-wrap bg-primary"
              >
                <div class="relative block w-full">
                  <img
                    class="w-full"
                    style="aspect-ratio: 6 / 5;"
                    alt={product.Intro_blob.data.attributes.alternativeText}
                    src={ASSETS_URL + product.Intro_blob.data.attributes.url}
                  />

                  {product.Stock_amount < 1 && (
                    <>
                      <div class="absolute top-[12%] right-[12%] flex items-center px-5 sm:px-[37px] py-[5px] sm:py-[7px] sm:text-xl font-semibold text-dark2 border-2 border-[#fabf21] bg-[#fabf21]/80 rounded-full">
                        {recurData.Product_sold_out_text}
                      </div>

                      <div class="absolute bottom-0 flex items-center gap-2.5 px-[34px] py-2.5 select-none w-full text-sm sm:text-base font-medium text-dark2 bg-[#faf8e5]/80">
                        {alertCircleIcon}
                        {recurData.Item_stock_text}{" "}
                        {new Date(product.In_stock_date).toLocaleString(
                          "en-GB",
                          {
                            year: "2-digit",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div class="py-[30px] lg:py-[40px] px-[36px] lg:px-[48px]">
                  <div class="product-card-title alice leading-[120%] md:leading-[110%]">
                    <a
                      aria-label={
                        (product.Stock_amount < 1
                          ? `${recurData.Product_sold_out_text}, `
                          : "") + product.Title
                      }
                      class="main-link"
                      href={
                        document.documentElement.lang +
                        "/" +
                        product.Meta.URL_slug
                      }
                    >
                      {product.Title}{" "}
                    </a>

                    <span class="icon product-card-title-icon">
                      <img class="w-full h-full" {...white_right_arrow} />
                    </span>
                  </div>

                  <div
                    innerHTML={product.Intro_text_HTML}
                    class="text-base md:text-lg leading-[150%] line-clamp-3 mt-[5px] md:mt-[7px] lg:mt-[15px]"
                  />
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </section>
  );
}
