export default function Orders({
  noOrdersHTML,
  block3_title,
  Label_order,
  text_estimated_delivery,
  Button_track_package,
  Button_track_package_text,
  Button_buy_again_text,
  Button_sold_out_text,
  text_show_more_products_in_this_order,
  text_estimated_shipment,
  text_delivered,
}) {
  return (
    <>
      <h2
        id={block3_title.toLowerCase().replaceAll(" ", "-")}
        class="dashboard-sec-title recoleta mt-[50px]"
      >
        {block3_title}
      </h2>

      <div id="month-1" class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
        <h3>January 2022</h3>

        <div class="order-item pb-[25px] sm:pb-[30px] border-b border-primary-light">
          <div class="flex flex-wrap items-center gap-[5px] sm:gap-2.5 justify-between">
            <div class="grid gap-[5px] sm:gap-2.5">
              <div class="order-item-label">
                {Label_order} #132131
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 8 16"
                  class="h-4"
                >
                  <path d="M.3,16.3a1.4,1.4,0,0,1,0-1.7L5.4,8.3.3,2.1A1.1,1.1,0,0,1,0,1.3,1.7,1.7,0,0,1,.3.3,1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7.7,7.5a1.1,1.1,0,0,1,.3.8,1.7,1.7,0,0,1-.3,1l-5.9,7a.7.7,0,0,1-.7.4A.9.9,0,0,1,.3,16.3Z"></path>
                </svg>
              </div>

              <div class="order-item-date">
                {text_estimated_delivery} 18-Jan-2023
              </div>
            </div>

            {Button_track_package && (
              <a
                href="#"
                class="py-2.5 px-5 font-bold text-white bg-primary rounded-full"
              >
                {Button_track_package_text}
              </a>
            )}
          </div>

          <div class="flex gap-2.5 sm:gap-[15px]">
            <div class="oder-img">
              <img
                src="https://cms.dilmahtea.me/uploads/rose_with_french_vanilla_with_t_column_be315af184.jpg"
                alt=""
                style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
              />
            </div>

            <div class="grow grid gap-[5px] sm:gap-2.5">
              <div class="grid gap-[5px] sm:gap-2.5">
                <div class="order-item-title recoleta line-height-[110%]">
                  Ceylon cinnamon spice tea
                </div>
                <div class="order-item-info">
                  <span>20 tea bags</span>
                  <span>&#8226;</span>
                  <span>100gm</span>
                  <span>&#8226;</span>
                  <span>True organincs</span>
                  <span>&#8226;</span>
                  <span>Black tea</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                <div class="order-item-quantity">Quantity: 1</div>

                <button data-sku={`SKU`} class="order-item-cart-btn">
                  {Button_buy_again_text}
                  <span class="text-secondary-light">&#8226;</span>
                  <span class="recoleta font-bold">€24</span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-2.5 sm:gap-[15px]">
            <div class="oder-img">
              <img
                src="https://cms.dilmahtea.me/uploads/rose_with_french_vanilla_with_t_column_be315af184.jpg"
                alt=""
                style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
              />
            </div>

            <div class="grow grid gap-[5px] sm:gap-2.5">
              <div class="grid gap-[5px] sm:gap-2.5">
                <div class="order-item-title recoleta line-height-[110%]">
                  Ceylon cinnamon spice tea
                </div>
                <div class="order-item-info">
                  <span>20 tea bags</span>
                  <span>&#8226;</span>
                  <span>100gm</span>
                  <span>&#8226;</span>
                  <span>True organincs</span>
                  <span>&#8226;</span>
                  <span>Black tea</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                <div class="order-item-quantity">Quantity: 1</div>

                <button class="order-item-cart-btn" disabled>
                  {Button_sold_out_text}
                  <span class="text-secondary-light">&#8226;</span>
                  <span class="recoleta font-bold">€24</span>
                </button>
              </div>

              {/* <AdvancedNotification
                Type="Warning"
                Bordered={true}
                Rounded={true}
                Title="Item will be in stock by 23rd Feb 2023"
              /> */}
            </div>
          </div>

          <div class="flex gap-2.5 sm:gap-[15px]">
            <div class="oder-img">
              <img
                src="https://cms.dilmahtea.me/uploads/rose_with_french_vanilla_with_t_column_be315af184.jpg"
                alt=""
                style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
              />
            </div>

            <div class="grow grid gap-[5px] sm:gap-2.5">
              <div class="grid gap-[5px] sm:gap-2.5">
                <div class="order-item-title recoleta line-height-[110%]">
                  Ceylon cinnamon spice tea
                </div>
                <div class="order-item-info">
                  <span>20 tea bags</span>
                  <span>&#8226;</span>
                  <span>100gm</span>
                  <span>&#8226;</span>
                  <span>True organincs</span>
                  <span>&#8226;</span>
                  <span>Black tea</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                <div class="order-item-quantity">Quantity: 1</div>

                <button data-sku={`SKU`} class="order-item-cart-btn">
                  {Button_buy_again_text}
                  <span class="text-secondary-light">&#8226;</span>
                  <span class="recoleta font-bold">€24</span>
                </button>
              </div>
            </div>
          </div>

          {/* Max 3 items per order would be visible, otherwise toggle needed */}
          <div class="flex justify-center w-full">
            <div class="show-more-toggle-btn">
              <span>
                {text_show_more_products_in_this_order.replace(
                  "<number>",
                  "10",
                )}
              </span>

              {/* after toggle show hide text
              <span>{text_hide_more_products_in_this_order.replace("<number>", "10")}</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 8"
                class="w-4 fill-primary"
              >
                <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="order-item pb-[25px] sm:pb-[30px] border-b border-primary-light">
          <div class="flex flex-wrap items-center gap-[5px] sm:gap-2.5 justify-between">
            <div class="grid gap-[5px] sm:gap-2.5">
              <div class="order-item-label">
                {Label_order} #132131
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 8 16"
                  class="h-4"
                >
                  <path d="M.3,16.3a1.4,1.4,0,0,1,0-1.7L5.4,8.3.3,2.1A1.1,1.1,0,0,1,0,1.3,1.7,1.7,0,0,1,.3.3,1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7.7,7.5a1.1,1.1,0,0,1,.3.8,1.7,1.7,0,0,1-.3,1l-5.9,7a.7.7,0,0,1-.7.4A.9.9,0,0,1,.3,16.3Z"></path>
                </svg>
              </div>

              <div class="order-item-date">
                {text_estimated_shipment} 28-Jan-2023
              </div>
            </div>

            {Button_track_package && (
              <a
                href="#"
                class="py-2.5 px-5 font-bold text-white bg-primary rounded-full"
              >
                {Button_track_package_text}
              </a>
            )}
          </div>

          <div class="flex gap-2.5 sm:gap-[15px]">
            <div class="oder-img">
              <img
                src="https://cms.dilmahtea.me/uploads/rose_with_french_vanilla_with_t_column_be315af184.jpg"
                alt=""
                style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
              />
            </div>

            <div class="grow grid gap-[5px] sm:gap-2.5">
              <div class="grid gap-[5px] sm:gap-2.5">
                <div class="order-item-title recoleta line-height-[110%]">
                  Ceylon cinnamon spice tea
                </div>
                <div class="order-item-info">
                  <span>20 tea bags</span>
                  <span>&#8226;</span>
                  <span>100gm</span>
                  <span>&#8226;</span>
                  <span>True organincs</span>
                  <span>&#8226;</span>
                  <span>Black tea</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                <div class="order-item-quantity">Quantity: 1</div>

                <button data-sku={`SKU`} class="order-item-cart-btn">
                  {Button_buy_again_text}
                  <span class="text-secondary-light">&#8226;</span>
                  <span class="recoleta font-bold">€24</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="order-item">
          <div class="flex flex-wrap items-center gap-[5px] sm:gap-2.5 justify-between">
            <div class="grid gap-[5px] sm:gap-2.5">
              <div class="order-item-label">
                {Label_order} #132131
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 8 16"
                  class="h-4"
                >
                  <path d="M.3,16.3a1.4,1.4,0,0,1,0-1.7L5.4,8.3.3,2.1A1.1,1.1,0,0,1,0,1.3,1.7,1.7,0,0,1,.3.3,1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7.7,7.5a1.1,1.1,0,0,1,.3.8,1.7,1.7,0,0,1-.3,1l-5.9,7a.7.7,0,0,1-.7.4A.9.9,0,0,1,.3,16.3Z"></path>
                </svg>
              </div>

              <div class="order-item-date">{text_delivered} 10-Jan-2023</div>
            </div>
          </div>

          <div class="flex gap-2.5 sm:gap-[15px]">
            <div class="oder-img">
              <img
                src="https://cms.dilmahtea.me/uploads/rose_with_french_vanilla_with_t_column_be315af184.jpg"
                alt=""
                style="aspect-ratio: 1 / 1; clip-path: url(#orders-blob-curve);"
              />
            </div>

            <div class="grow grid gap-[5px] sm:gap-2.5">
              <div class="grid gap-[5px] sm:gap-2.5">
                <div class="order-item-title recoleta line-height-[110%]">
                  Ceylon cinnamon spice tea
                </div>
                <div class="order-item-info">
                  <span>20 tea bags</span>
                  <span>&#8226;</span>
                  <span>100gm</span>
                  <span>&#8226;</span>
                  <span>True organincs</span>
                  <span>&#8226;</span>
                  <span>Black tea</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-[5px] sm:gap-2.5 items-center justify-between">
                <div class="order-item-quantity">Quantity: 1</div>

                <button data-sku={`SKU`} class="order-item-cart-btn">
                  {Button_buy_again_text}
                  <span class="text-secondary-light">&#8226;</span>
                  <span class="recoleta font-bold">€24</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
