import Order from "@solid/Order";
import { user } from "@signals/user";

export default function Orders({ recurringImages, userAccountRecurData }) {
  const {
    Button_track_package,
    Button_track_package_text,
    Button_buy_again_text,
    Button_sold_out_text,
    Label_order,
    text_estimated_delivery,
    text_estimated_shipment,
    text_delivered,
    text_show_more_products_in_this_order,
    text_hide_more_products_in_this_order,
  } = userAccountRecurData;

  const { orders } = user();

  return (
    <div class="dashboard-sec grid gap-[25px] sm:gap-[30px]">
      {orders.map((order) => {
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
  );
}
