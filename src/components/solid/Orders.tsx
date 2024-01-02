import { createEffect } from "solid-js";

import Order from "@solid/Order";

import { orders, setOrders, ordersYear, setOrdersYear } from "@signals/orders";

export default function Orders({
  noOrdersHTML,
  recurringImages,
  userAccountRecurData,
  year,
}) {
  setOrdersYear(year);

  createEffect(() => {
    const searchParams = new URLSearchParams({ year: ordersYear() || year });

    fetch("/api/orders?" + searchParams.toString())
      .then((res) => res.json())
      .then((data) => setOrders(data));
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
      ) : orders().length === 0 ? (
        noOrdersHTML
      ) : (
        <div class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
          {!ordersYear() && orders().length > 3 && (
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
            .slice(0, !ordersYear() ? 3 : undefined)
            .map((order, i) => {
              if (!ordersYear()) {
                return (
                  i < 3 && (
                    <Order
                      order={order}
                      recurringImages={recurringImages}
                      userAccountRecurData={userAccountRecurData}
                    />
                  )
                );
              } else {
                const [year, ordersByMonths] = order;

                return ordersByMonths.map(([month, ordersByMonths]) => {
                  const shouldShowYear = orders().length > 1;

                  return (
                    <>
                      <h2
                        id={
                          month.toLowerCase() +
                          (shouldShowYear ? "-" + year : "")
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
