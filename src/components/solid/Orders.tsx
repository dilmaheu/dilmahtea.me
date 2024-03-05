import { createEffect } from "solid-js";

import Order from "@solid/Order";
import Loading from "@solid/Loading";

import { orders, setOrders, ordersYear, setOrdersYear } from "@signals/orders";

export default function Orders({
  noOrdersHTML,
  notificationIcons,
  userAccountRecurData,
  isOrdersPage,
}) {
  createEffect(() => {
    fetch("/api/orders" + (isOrdersPage ? "" : "?limit=true"))
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
        <Loading />
      ) : (isOrdersPage ? Object.keys(orders()) : orders()).length === 0 ? (
        noOrdersHTML
      ) : (
        <div class="tiled-div grid gap-[25px] sm:gap-[30px]">
          {Array.isArray(orders()) ? (
            <>
              {orders().length > 3 && (
                <a
                  href="/account/orders"
                  class="mx-auto font-bold leading-[150%] text-primary"
                >
                  {userAccountRecurData.Button_go_to_my_orders_text}
                </a>
              )}

              {orders()
                .slice(0, 3)
                .map((order) => (
                  <Order
                    order={order}
                    notificationIcons={notificationIcons}
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
                        notificationIcons={notificationIcons}
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
