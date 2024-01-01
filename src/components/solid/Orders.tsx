import { createEffect } from "solid-js";

import Order from "@solid/Order";

import {
  orders,
  setOrders,
  ordersRange,
  setOrdersRange,
} from "@signals/orders";

export default function Orders({
  noOrdersHTML,
  recurringImages,
  userAccountRecurData,
  range,
}) {
  setOrdersRange(range);

  createEffect(() => {
    const searchParams = new URLSearchParams({ range: ordersRange() || range });

    fetch("/api/orders?" + searchParams.toString())
      .then((res) => res.json())
      .then((data) => setOrders(data));
  });

  return (
    <>
      {!orders() ? (
        <div class="dashboard-sec">Loading...</div>
      ) : orders().length === 0 ? (
        noOrdersHTML
      ) : (
        <div class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
          {orders().map((order) => {
            if (!Array.isArray(order)) {
              return (
                <Order
                  order={order}
                  recurringImages={recurringImages}
                  userAccountRecurData={userAccountRecurData}
                />
              );
            } else {
              const [year, ordersByMonths] = order;

              return ordersByMonths.map(([month, ordersByMonths]) => {
                const shouldShowYear = orders().length > 1;

                return (
                  <>
                    <h2
                      id={
                        month.toLowerCase() + (shouldShowYear ? "-" + year : "")
                      }
                    >
                      {month + (shouldShowYear ? " " + year : "")}
                    </h2>

                    {ordersByMonths.map((order) => (
                      <Order
                        order={order}
                        recurringImages={recurringImages}
                        userAccountRecurData={userAccountRecurData}
                      />
                    ))}
                  </>
                );
              });
            }
          })}
        </div>
      )}
    </>
  );
}
