import Order from "@solid/Order";
import { user } from "@signals/user";

export default function Orders({
  noOrdersHTML,
  recurringImages,
  userAccountRecurData,
}) {
  return (
    <>
      {!Array.isArray(user().orders) ? (
        <div class="dashboard-sec">Loading...</div>
      ) : user().orders.length === 0 ? (
        noOrdersHTML
      ) : (
        <div class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
          {user().orders.map((order) => {
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

              return ordersByMonths.map(([month, orders]) => {
                return (
                  <>
                    <h2>
                      {month + (user().orders.length > 1 ? " " + year : "")}
                    </h2>

                    {orders.map((order) => (
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
