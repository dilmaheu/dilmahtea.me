import { productFilters } from "@signals/productFilters";
import { createEffect, createSignal, For } from "solid-js";

export default function FilteredProducts({
  alertCircleIcon,
  page,
  recurData,
  checkoutRecurData,
  white_love,
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
      localStorage.getItem("preferredProductsVariants") || "{}",
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
                  [preferredTeaVariant, preferredTeaSize].join(" | ") === key,
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
            (category &&
              (category === attributes.categoryTeaRange ||
                (category === attributes.category &&
                  !attributes.subCategory))) ||
            (subCategory && subCategory === attributes.subCategory),
        )
        .sort((productA, productB) =>
          productA.rank === null
            ? 1
            : productB.rank === null
              ? -1
              : productA.rank - productB.rank,
        ),
    );
  });

  const addProductToCart = (product) => {
    const { SKU } = product;

    const inCartProduct = window.cart[SKU];

    const quantity = 1 + (inCartProduct?.quantity || 0);

    window.cart[SKU] = { quantity };

    window.openCart();
  };

  return (
    <div
      role="list"
      aria-label={page.Aria_label_all_teas_text}
      class="wrapper grid grid-cols-2 lg:grid-cols-3 gap-[clamp(15px,calc(5vw-25px),50px)] overflow-hidden"
    >
      <For each={filteredProducts()}>
        {(product, iSignal) => (
          <div
            role="listitem"
            aria-label={page.Aria_label_tea_item_text + (iSignal() + 1)}
            style="clip-path: url(#product-card-curve)"
            class="product-card link-section flex flex-wrap w-full mx-auto bg-primary"
          >
            <div class="relative block w-full">
              <div innerHTML={product.Intro_blob_HTML} />

              {product.Stock_amount < 1 && (
                <>
                  <div
                    class={[
                      "absolute top-[12%] right-[12%] flex items-center px-5 sm:px-[37px] py-[5px] sm:py-[7px]",
                      "bg-warning/80 text-black sm:text-xl font-semibold border-2 border-warning rounded-full",
                    ].join(" ")}
                  >
                    {recurData.Product_sold_out_text}
                  </div>

                  {
                    // hide label if in-stock date is in the past or undefined
                    new Date(product.In_stock_date).getTime() >
                      new Date().getTime() && (
                      <div
                        class={[
                          "w-full bg-warning-light text-sm sm:text-base font-medium text-black",
                          "absolute bottom-0 flex items-center gap-2.5 px-[34px] py-2.5 select-none",
                        ].join(" ")}
                      >
                        {alertCircleIcon}
                        {recurData.Item_stock_text.replace(
                          "<in_stock_date>",
                          product.In_stock_date,
                        )}
                      </div>
                    )
                  }
                </>
              )}
            </div>

            <div class="w-full pt-2.5 lg:pt-5 pb-[15px] lg:pb-[25px] px-[clamp(15px,calc(4vw-9px),36px)] grid gap-[5px] text-white">
              <div
                class="product-card-title recoleta font-semibold leading-[120%] md:leading-[110%]"
                style={{
                  "font-size": "clamp(0.875rem, 1.5vw + 0.15rem, 1.5rem)",
                }}
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
              </div>

              <div
                class="text-white"
                style={{ "font-size": "clamp(0.75rem, 1.5vw + 0.1rem, 1rem)" }}
              >
                {(product.tea_size || product.Weight_tea) &&
                  (product.tea_size?.toLowerCase().includes("bag")
                    ? product.productLocalizedSize
                    : product.Weight_tea + product.Weight_tea_unit)}

                {product.variant.data?.attributes.Title && (
                  <>
                    <span class="inline-block w-1 h-1 mx-[5px] mb-0.5 rounded-full bg-secondary" />
                    {product.variant.data?.attributes.Title}
                  </>
                )}
              </div>

              {product.estate_name?.data.length > 0 && (
                <div class="flex flex-wrap items-center">
                  <div class="flex flex-wrap items-center text-base leading-[150%]">
                    <span>
                      <img
                        class="p-[3px] mr-1 icon"
                        style={{
                          width: "clamp(1.125rem, 2vw + 0.15rem, 2rem)",
                          height: "clamp(1.125rem, 2vw + 0.15rem, 2rem)",
                        }}
                        {...white_love}
                      />

                      {recurData.product_made_love_from + `\xa0`}
                    </span>

                    <div class="flex flex-wrap gap-x-1.5">
                      {product.estate_name.data.map(
                        (
                          {
                            attributes: {
                              Estate_name,
                              Meta: { URL_slug },
                            },
                          },
                          index,
                        ) => (
                          <a
                            href={URL_slug}
                            class="flex flex-wrap font-bold underline decoration-1 underline-offset-[2px]"
                          >
                            {Estate_name +
                              (index === product.estate_name.data.length - 1
                                ? ""
                                : ",")}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}

              {product.availableFormatsCount > 0 && (
                <div class="inline-flex items-center gap-[3px] md:gap-x-2">
                  <span class="flex">
                    {product.availableFormatThumbnails.map(({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        class={[
                          "rounded-full border-2 border-primary",
                          "w-[clamp(14px,calc(1.5vw+2.5px),24px)] aspect-square",
                          "-ml-[clamp(7px,calc(1.19vw-2.14px),15px)] first:ml-0",
                        ].join(" ")}
                      />
                    ))}

                    {product.availableFormatsCount > 2 && (
                      <span
                        class={[
                          "flex items-center justify-center rounded-full bg-secondary-light",
                          "text-[clamp(6px,calc(0.6vw+1.4px),10px)] md:font-semibold text-primary",
                          "leading-[110%] -ml-[clamp(7px,calc(1.19vw-2.14px),15px)] border-2 border-primary",
                          "h-[clamp(14px,calc(1.5vw+2.5px),24px)] min-w-[clamp(14px,calc(1.5vw+2.5px),24px)]",
                        ].join(" ")}
                      >
                        +{product.availableFormatsCount - 2}
                      </span>
                    )}
                  </span>

                  <div class="text-xs md:text-sm text-white">
                    <em>
                      <span class="hidden sm:block">
                        {product.Stock_amount === 0
                          ? recurData.Product_stock_available_text
                          : recurData.Product_available_text}

                        <span class="font-bold underline underline-offset-2 pl-1">
                          {product.availableFormatsCount === 1
                            ? recurData.Product_other_formats_singular_text
                            : recurData.Product_other_formats_text.replaceAll(
                                "<count>",
                                product.availableFormatsCount,
                              )}
                        </span>
                      </span>

                      <span class="block sm:hidden font-bold underline underline-offset-2">
                        {product.availableFormatsCount === 1
                          ? recurData.Product_other_formats_singular_text_sm
                          : recurData.Product_other_formats_text_sm.replaceAll(
                              "<count>",
                              product.availableFormatsCount,
                            )}
                      </span>
                    </em>
                  </div>
                </div>
              )}

              {product.Stock_amount > 0 ? (
                <button
                  onClick={() => addProductToCart(product)}
                  class="unlink product-card-btn text-primary bg-secondary-light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="hidden sm:inline-flex w-5 h-5"
                  >
                    <path
                      d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235a.997.997 0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18 17H7.016a.993.993 0 0 1-.675-.248a.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1z"
                      style="fill:#547b7d"
                    />
                  </svg>
                  {checkoutRecurData.text_add}
                  <span class="w-1 h-1 bg-primary rounded-full" />
                  <span class="recoleta">
                    {`€` +
                      product.PriceIncludingTax.toFixed(2).replace(".", ",")}
                  </span>
                </button>
              ) : (
                <div class="unlink product-card-btn cursor-not-allowed text-white bg-slate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="hidden sm:inline-flex w-5 h-5"
                  >
                    <path
                      d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235a.997.997 0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18 17H7.016a.993.993 0 0 1-.675-.248a.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1z"
                      style="fill:#fff"
                    />
                  </svg>

                  {recurData.Product_sold_out_text}
                  <span class="w-1 h-1 bg-white rounded-full" />
                  <span class="recoleta">
                    {`€` +
                      product.PriceIncludingTax.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
