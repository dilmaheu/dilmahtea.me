import { productFilters } from "@signals/productFilters";
import { createEffect, createSignal, For } from "solid-js";

export default function FilteredProducts({
  alertCircleIcon,
  page,
  recurData,
  white_right_arrow,
  category,
  subCategory,
}) {
  const [products, setProducts] = createSignal([]),
    [filteredProducts, setFilteredProducts] = createSignal([]);

  createEffect(() => {
    const locale = document.documentElement.lang,
      { tea_variant, tea_size } = productFilters();

    const productKey = [locale, tea_variant, tea_size]
      .filter(Boolean)
      .join("/");

    fetch("/db/products/" + productKey + ".json")
      .then((res) => res.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error(error));
  });

  createEffect(() => {
    const preferredProductsVariants = JSON.parse(
      localStorage.getItem("preferredProductsVariants") || "{}"
    );

    setFilteredProducts(
      products()
        .map((product) => {
          if (Array.isArray(product)) {
            const [baseProductTitle, variants] = product,
              { tea_size: preferredTeaSize, tea_variant: preferredTeaVariant } =
                preferredProductsVariants[baseProductTitle] || {};

            const [, variant] =
              variants.find(
                ([key]) =>
                  [preferredTeaVariant, preferredTeaSize].join(" | ") === key
              ) ||
              variants.find(([key]) => key.includes(preferredTeaVariant)) ||
              variants.find(([key]) => key.includes(preferredTeaSize)) ||
              variants[0];

            return variant;
          }

          return product;
        })
        .filter(
          (attributes) =>
            (!category && !subCategory) ||
            category === attributes.category ||
            subCategory === attributes.subCategory
        )
    );
  });

  return (
    <div
      role="list"
      aria-label={page.Aria_label_all_teas_text}
      class="wrapper grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] overflow-hidden"
    >
      <For each={filteredProducts()}>
        {(product, iSignal) => {
          return (
            <div
              role="listitem"
              aria-label={page.Aria_label_tea_item_text + (iSignal() + 1)}
              style="clip-path: url(#product-card-curve)"
              class="product-card link-section flex flex-wrap w-full mx-auto max-w-[380px] sm:max-w-none bg-primary"
            >
              <div
                class="relative block w-full"
                innerHTML={product.Intro_blob_HTML}
              >
                {product.Stock_amount < 1 && (
                  <>
                    <div
                      class={[
                        "absolute top-[12%] right-[12%] flex items-center px-5 sm:px-[37px] py-[5px] sm:py-[7px]",
                        "sm:text-xl font-semibold text-dark2 border-2 border-[#fabf21] bg-[#fabf21]/80 rounded-full",
                      ].join(" ")}
                    >
                      {recurData.Product_sold_out_text}
                    </div>

                    <div
                      class={[
                        "absolute bottom-0 flex items-center gap-2.5 px-[34px] py-2.5 select-none w-full",
                        "text-sm sm:text-base font-medium text-dark2 bg-[#faf8e5]/80",
                      ].join(" ")}
                    >
                      {alertCircleIcon}
                      {recurData.Item_stock_text}{" "}
                      {new Date(product.In_stock_date).toLocaleString("en-GB", {
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </>
                )}
              </div>

              <div class="py-[30px] lg:py-[40px] px-[36px] lg:px-[48px]">
                <div
                  class="product-card-title alice leading-[120%] md:leading-[110%]"
                  style={{ "font-size": "clamp(1.75rem, 2vw + 0.3rem, 2rem)" }}
                >
                  <a
                    aria-label={
                      (product.Stock_amount < 1
                        ? `${recurData.Product_sold_out_text}, `
                        : "") + product.Title
                    }
                    class="main-link"
                    href={product.Meta.URL_slug}
                  >
                    {product.Title}
                  </a>

                  <span
                    class="icon product-card-title-icon"
                    style={{
                      height: "clamp(0.625rem, 1.5vw + 0.1rem, 1rem)",
                    }}
                  >
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
  );
}
