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
        <div class="tiled-div division-gap grid">
          {Array.isArray(orders()) ? (
            <>
              {orders().length > 3 && (
                <a href="/account/orders" class="button-link-primary mx-auto">
                  {userAccountRecurData.Button_go_to_my_orders_text}
                </a>
              )}

              {orders()
                .slice(0, 3)
                .map((order) => (
                  <>
                    <Order
                      order={order}
                      notificationIcons={notificationIcons}
                      userAccountRecurData={userAccountRecurData}
                    />

                    {index + 1 < orders.slice(0, 3).length && (
                      <div class="border-b border-primary-lightest w-full"></div>
                    )}
                  </>
                ))}
            </>
          ) : (
            Object.entries(orders()).map(([year, ordersByMonths]) => {
              if (year === ordersYear()) {
                return Object.entries(ordersByMonths).map(([month, orders]) => (
                  <>
                    <h2
                      class="text-b3 font-bold text-primary"
                      id={month.toLowerCase()}
                    >
                      {month}
                    </h2>

                    {orders.map((order, index) => (
                      <>
                        <Order
                          order={order}
                          notificationIcons={notificationIcons}
                          userAccountRecurData={userAccountRecurData}
                        />

                        {index + 1 < orders.length && (
                          <div class="border-b border-primary-lightest w-full"></div>
                        )}
                      </>
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
