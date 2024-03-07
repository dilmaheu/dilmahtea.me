import { Match, Switch, createSignal } from "solid-js";

import SolidNotification from "@solid/SolidNotification";

import handleEmptyFields from "@utils/shared/handleEmptyFields";
import getPriceIncludingTax from "@utils/shared/getPriceIncludingTax";

export default function Order({
  order,
  notificationIcons,
  userAccountRecurData,
}) {
  order = handleEmptyFields(order);

  const [showMoreProducts, setShowMoreProducts] = createSignal(false);

  const {
    Button_track_package,
    Button_track_package_text,
    Button_buy_again_text,
    Button_sold_out_text,
    Label_order,
    text_quantity,
    text_estimated_delivery,
    text_estimated_shipment,
    text_delivered,
    text_in_stock_date,
    text_show_more_product_in_this_order_singular,
    text_hide_more_product_in_this_order_singular,
    text_show_more_products_in_this_order,
    text_hide_more_products_in_this_order,
  } = userAccountRecurData;

  return (
    <div class="division-gap grid text-black-light">
      <div class="division-in-element-gap flex flex-wrap items-center justify-between">
        <div class="division-in-element-gap grid">
          <div class="text-b5 font-bold">
            {Label_order} #{order.id}
          </div>

          <div class="text-b6">
            <Switch>
              <Match when={order.status === "processing"}>
                <>
                  {text_estimated_shipment} {order.estimated_shipment_date}
                </>
              </Match>
              <Match when={order.status === "shipped"}>
                <>
                  {text_estimated_delivery} {order.estimated_delivery_date}
                </>
              </Match>
              <Match when={order.status === "delivered"}>
                <>
                  {text_delivered} {order.delivery_date}
                </>
              </Match>
            </Switch>
          </div>
        </div>

        {Button_track_package &&
          order.status === "shipped" &&
          order.tracking_url !== "N/A" && (
            <a href={order.tracking_url} class="button-primary">
              {Button_track_package_text}
            </a>
          )}
      </div>

      {order.items.slice(0, showMoreProducts() ? undefined : 3).map((item) => {
        const { sku, quantity } = item,
          {
            titles,
            image,
            Price,
            VatPercentage,
            tea_weight,
            tea_size,
            tea_variant,
            stock_amount,
          } = window.products[sku];

        let { in_stock_date } = window.products[sku];

        const title = JSON.parse(titles)[window.preferredLocale],
          [_, productPriceIncludingTax] = getPriceIncludingTax({
            Price,
            VatPercentage,
            quantity,
          });

        const soldOut = stock_amount === 0;

        in_stock_date &&= new Date(in_stock_date).toLocaleString("en-GB", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        });

        return (
          <div class="division-in-gap flex">
            <div class="order-img">
              <img alt="" src={image} style="aspect-ratio: 1 / 1;" />
            </div>

            <div class="division-in-element-gap grid grow">
              <div class="division-in-element-gap grid">
                <div class="text-h5 text-black">{title}</div>

                <div class="text-b6">
                  {[tea_size || tea_weight, tea_variant]
                    .filter(Boolean)
                    .join(" • ")}
                </div>
              </div>

              <div class="division-in-element-gap flex flex-wrap items-center justify-between">
                <div class="text-b6 font-medium">
                  {text_quantity}: {quantity}
                </div>

                <button
                  class={
                    !soldOut ? "button-cart-primary" : "button-cart-disabled"
                  }
                  disabled={soldOut}
                  onclick={
                    !soldOut && (() => window.addProductToCart(sku, quantity))
                  }
                >
                  <span class="text-container">
                    {!soldOut ? Button_buy_again_text : Button_sold_out_text}
                    <span>&#8226;</span>
                    <span>
                      €{productPriceIncludingTax.toFixed(2).replace(".", ",")}
                    </span>
                  </span>
                </button>
              </div>

              {in_stock_date && (
                <SolidNotification
                  notification={() => ({
                    type: "warning",
                    message: text_in_stock_date.replace(
                      "<in_stock_date>",
                      in_stock_date,
                    ),
                  })}
                  notificationIcons={notificationIcons}
                  bottomMargin={true}
                  bordered={true}
                />
              )}
            </div>
          </div>
        );
      })}

      {order.items.length > 3 && (
        <div class="flex justify-center w-full">
          <button
            class="horizontal-toggle-button-primary"
            onClick={() => {
              setShowMoreProducts(!showMoreProducts());

              document
                .querySelector(".toggle-button-arrow")
                .classList.toggle("rotate-180");
            }}
          >
            {!showMoreProducts() ? (
              <span>
                {order.items.length === 4
                  ? text_show_more_product_in_this_order_singular
                  : text_show_more_products_in_this_order.replace(
                      "<number>",
                      order.items.length - 3,
                    )}
              </span>
            ) : (
              <span>
                {order.items.length === 4
                  ? text_hide_more_product_in_this_order_singular
                  : text_hide_more_products_in_this_order.replace(
                      "<number>",
                      order.items.length - 3,
                    )}
              </span>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 8"
              class="toggle-button-arrow fill-primary"
            >
              <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
