import { createEffect } from "solid-js";

import Order from "@solid/Order";
import Loading from "@solid/Loading";

import { orders, setOrders, ordersYear, setOrdersYear } from "@signals/orders";

export default function Orders({
  noOrdersHTML,
  notificationIcons,
  recurData,
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
              {() => {
                const recentOrders = orders().slice(0, 3);

                return recentOrders.map((order, index) => (
                  <>
                    <Order
                      order={order}
                      notificationIcons={notificationIcons}
                      recurData={recurData}
                    />

                    {index + 1 < recentOrders.length && (
                      <div class="border-b border-primary-lightest"></div>
                    )}
                  </>
                ));
              }}

              {orders().length > 3 && (
                <a href="/account/orders" class="button-link-primary mx-auto">
                  {recurData.text_go_to_my_orders}
                </a>
              )}
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
                          recurData={recurData}
                        />

                        {index + 1 < orders.length && (
                          <div class="border-b border-primary-lightest"></div>
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
