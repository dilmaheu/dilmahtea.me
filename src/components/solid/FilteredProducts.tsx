import { productFilters } from "@signals/productFilters";
import { createEffect, createSignal, For } from "solid-js";

export default function FilteredProducts({
  alertCircleIcon,
  page,
  recurData,
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

  return (
    <div
      role="list"
      aria-label={page.Aria_label_all_teas_text}
      class="wrapper grid grid-cols-2 lg:grid-cols-3 card-gap overflow-hidden"
    >
      <For each={filteredProducts()}>
        {(product, iSignal) => (
          <div
            role="listitem"
            aria-label={page.Aria_label_tea_item_text + (iSignal() + 1)}
            style="clip-path: url(#product-card-curve)"
            class="product-card link-section"
          >
            <div class="product-card-image-container">
              <div innerHTML={product.Intro_blob_HTML} />

              {/* {product.Stock_amount < 1 && (
                <>
                  <div class="stock-out-label-top">
                    {recurData.text_sold_out}
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
              )} */}
            </div>

            <div class="card-content-container">
              <div class="product-card-content">
                <div class="product-title">
                  <a
                    aria-label={
                      /* (product.Stock_amount < 1
                        ? `${recurData.text_sold_out}, `
                        : "") + */ product.Title
                    }
                    class="main-link"
                    href={product.Meta.URL_slug}
                  >
                    {product.Title}
                  </a>
                </div>

                <div class="product-info">
                  {(product.tea_size || product.Weight_tea) &&
                    (product.tea_size?.toLowerCase().includes("bag")
                      ? product.productLocalizedSize
                      : product.Weight_tea + product.Weight_tea_unit)}

                  {product.variant.data?.attributes.Title && (
                    <div>
                      <span class="mr-1">&#x025CF;</span>
                      {product.variant.data?.attributes.Title}
                    </div>
                  )}
                </div>

                {product.availableFormatsCount > 0 && (
                  <div class="product-format">
                    <span class="icon-container">
                      {product.availableFormatThumbnails.map(({ src, alt }) => (
                        <img src={src} alt={alt} class="icon" />
                      ))}

                      {product.availableFormatsCount > 2 && (
                        <span class="number">
                          +{product.availableFormatsCount - 2}
                        </span>
                      )}
                    </span>

                    <span class="desktop-only-text">
                      {
                        /* product.Stock_amount === 0 */ false
                          ? recurData.Product_stock_available_text
                          : recurData.Product_available_text
                      }
                    </span>

                    <span
                      class={[
                        "desktop-only-text format-link-text",
                        // product.Stock_amount === 0 && "text-white",
                      ].join(" ")}
                    >
                      {product.availableFormatsCount === 1
                        ? recurData.Product_other_formats_singular_text
                        : recurData.Product_other_formats_text.replaceAll(
                            "<count>",
                            product.availableFormatsCount,
                          )}
                    </span>

                    <span
                      class={[
                        "mobile-only-text format-link-text",
                        // product.Stock_amount === 0 && "text-white",
                      ].join(" ")}
                    >
                      {product.availableFormatsCount === 1
                        ? recurData.Product_other_formats_singular_text_sm
                        : recurData.Product_other_formats_text_sm.replaceAll(
                            "<count>",
                            product.availableFormatsCount,
                          )}
                    </span>
                  </div>
                )}

                {product.estate_name.data.length > 0 && (
                  <div class="product-estate">
                    <img class="icon" {...white_love} />

                    <div class="hidden sm:inline">
                      {recurData.product_made_love_from}
                    </div>

                    <div class="inline sm:hidden">{recurData.product_from}</div>

                    {product.estate_name?.data.map(
                      (
                        {
                          attributes: {
                            Estate_name,
                            Meta: { URL_slug },
                          },
                        },
                        index,
                      ) => (
                        <a href={URL_slug}>
                          {Estate_name +
                            (index === product.estate_name.data.length - 1
                              ? ""
                              : ",")}
                        </a>
                      ),
                    )}
                  </div>
                )}
              </div>

              <a href={product.Shopify_URL}>
                <button
                  // onClick={() => {
                  //   if (product.Stock_amount > 0) {
                  //     window.addProductToCart(product.SKU);
                  //   }
                  // }}
                  class={[
                    "unlink product-card-btn",
                    /* product.Stock_amount > 0 */ true
                      ? "card-button-cart-default"
                      : "card-button-cart-disabled",
                  ].join(" ")}
                  // disabled={product.Stock_amount === 0}
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class={[
                      "cart-icon",
                      product.Stock_amount > 0 ? "fill-primary" : "fill-white",
                    ].join(" ")}
                  >
                    <path d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235a.997.997 0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18 17H7.016a.993.993 0 0 1-.675-.248a.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1z" />
                  </svg> */}

                  <div class="text-container">
                    {/* {product.Stock_amount > 0
                      ? recurData.text_add
                      : recurData.text_sold_out} */}
                    {recurData.text_buy}
                    <span>&#x025CF;</span>
                    <span>
                      {"€" +
                        product.PriceIncludingTax.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </button>
              </a>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
