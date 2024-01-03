import { Match, Switch, createSignal } from "solid-js";
import DashboardNotification from "@solid/DashboardNotification";
import getPriceIncludingTax from "@utils/shared/getPriceIncludingTax";

export default function Order({
  order,
  recurringImages,
  userAccountRecurData,
}) {
  const [showingMoreProducts, setShowingMoreProducts] = createSignal(false);

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
    <div class="order-item pb-[25px] sm:pb-[30px]">
      <div class="flex flex-wrap items-center gap-[5px] sm:gap-2.5 justify-between">
        <div class="grid gap-[5px] sm:gap-2.5">
          <div class="order-item-label">
            {Label_order} #{order.id}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 16"
              class="h-4"
            >
              <path d="M.3,16.3a1.4,1.4,0,0,1,0-1.7L5.4,8.3.3,2.1A1.1,1.1,0,0,1,0,1.3,1.7,1.7,0,0,1,.3.3,1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7.7,7.5a1.1,1.1,0,0,1,.3.8,1.7,1.7,0,0,1-.3,1l-5.9,7a.7.7,0,0,1-.7.4A.9.9,0,0,1,.3,16.3Z"></path>
            </svg>
          </div>

          <div class="order-item-date">
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

        {Button_track_package && order.status === "shipped" && (
          <a
            href={order.tracking_url}
            class="py-2.5 px-5 font-bold text-white bg-primary rounded-full"
          >
            {Button_track_package_text}
          </a>
        )}
      </div>

      {order.items
        .slice(0, showingMoreProducts() ? undefined : 3)
        .map((item) => {
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
            <div class="flex gap-2.5 sm:gap-[15px]">
              <div class="order-img">
                <img
                  alt=""
                  src={image}
                  style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
                />
              </div>

              <div class="grow grid gap-[5px] sm:gap-2.5">
                <div class="grid gap-[5px] sm:gap-2.5">
                  <div class="order-item-title recoleta line-height-[110%]">
                    {title}
                  </div>

                  <div class="order-item-info">
                    {[tea_size || tea_weight, tea_variant]
                      .filter(Boolean)
                      .join(" • ")}
                  </div>
                </div>

                <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                  <div class="order-item-quantity">
                    {text_quantity}: {quantity}
                  </div>

                  <button
                    class="order-item-cart-btn"
                    disabled={soldOut}
                    onclick={
                      !soldOut && (() => window.addProductToCart(sku, quantity))
                    }
                  >
                    {!soldOut ? Button_buy_again_text : Button_sold_out_text}
                    <span class="text-secondary-light">&#8226;</span>
                    <span class="recoleta font-bold">
                      €{productPriceIncludingTax.toFixed(2).replace(".", ",")}
                    </span>
                  </button>
                </div>

                {in_stock_date && (
                  <DashboardNotification
                    recurringImages={recurringImages}
                    staticNotification={{
                      type: "warning",
                      message: text_in_stock_date.replace(
                        "<in_stock_date>",
                        in_stock_date,
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}

      {order.items.length > 3 && (
        <div class="flex justify-center w-full">
          <button
            class="show-more-toggle-btn"
            onClick={() => {
              setShowingMoreProducts(!showingMoreProducts());
            }}
          >
            {!showingMoreProducts() ? (
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
              class="w-4 fill-primary"
            >
              <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
