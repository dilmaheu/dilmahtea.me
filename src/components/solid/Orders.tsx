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
            if (!(order instanceof Array)) {
              return (
                <Order
                  order={order}
                  recurringImages={recurringImages}
                  userAccountRecurData={userAccountRecurData}
                />
              );
            } else {
              const [month, ...orders] = order;

              return (
                <>
                  <h2>{month}</h2>

                  {orders.map((order) => (
                    <Order
                      order={order}
                      recurringImages={recurringImages}
                      userAccountRecurData={userAccountRecurData}
                    />
                  ))}
                </>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
