import { Match, Switch, createEffect } from "solid-js";

import Order from "@solid/Order";

import { orders, setOrders, ordersYear, setOrdersYear } from "@signals/orders";

export default function Orders({
  noOrdersHTML,
  recurringImages,
  userAccountRecurData,
  isOrdersPage,
}) {
  createEffect(() => {
    fetch("/api/orders" + (isOrdersPage ? "" : "?limit"))
      .then((res) => res.json())
      .then((orders) => {
        if (orders.constructor === Object) {
          const [lastYearWithOrders] = Object.keys(orders);

          lastYearWithOrders && setOrdersYear(lastYearWithOrders);
        }

        setOrders(orders);
      });
  });

  return (
    <>
      {!orders() ? (
        <div class="dashboard-sec">
          <div class="flex items-center justify-center py-[25px]">
            <span class="animate-ping h-[30px] w-[30px] rounded-full bg-primary" />
            <span class="animate-ping h-[30px] w-[30px] rounded-full bg-primary" />
            <span class="animate-ping h-[30px] w-[30px] rounded-full bg-primary" />
          </div>
        </div>
      ) : (isOrdersPage ? Object.keys(orders()) : orders()).length === 0 ? (
        noOrdersHTML
      ) : (
        <div class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
          {Array.isArray(orders()) ? (
            <>
              {orders().length > 3 && (
                <div class="flex justify-center">
                  <a
                    href="/account/orders"
                    class="font-bold leading-[150%] text-primary"
                  >
                    {userAccountRecurData.Button_view_all_orders_text}
                  </a>
                </div>
              )}

              {orders()
                .slice(0, 3)
                .map((order) => (
                  <Order
                    order={order}
                    recurringImages={recurringImages}
                    userAccountRecurData={userAccountRecurData}
                  />
                ))}
            </>
          ) : (
            Object.entries(orders()).map(([year, ordersByMonths]) => {
              if (year === ordersYear()) {
                return Object.entries(ordersByMonths).map(([month, orders]) => (
                  <>
                    <h2 id={month.toLowerCase()}>{month}</h2>

                    {orders.map((order) => (
                      <Order
                        order={order}
                        recurringImages={recurringImages}
                        userAccountRecurData={userAccountRecurData}
                      />
                    ))}
                  </>
                ));
              }
            })
          )}
        </div>
      )}
    </>
  );
}
