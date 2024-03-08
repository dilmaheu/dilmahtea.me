import { orders } from "@signals/orders";

export default function OrderMonths({ green_right_arrow }) {
  return (
    <div
      role="list"
      class="heading-content division-in-gap flex flex-col text-b3 overflow-y-auto"
    >
      {!orders() ? (
        <>Loading...</>
      ) : orders().length === 0 ? (
        <>No orders found</>
      ) : (
        orders().map(([year, ordersByMonths]) => {
          const months = ordersByMonths.map(([month]) => month);

          return months.map((month) => {
            const shouldShowYear = orders().length > 1;

            return (
              <a
                role="listitem"
                href={
                  "#" + month.toLowerCase() + (shouldShowYear ? "-" + year : "")
                }
                class="flex items-center text-black-light"
              >
                <div class="w-[clamp(37px,4.6875vw-18.75px,45px)] mr-[clamp(10px,4.6875vw-43.75px,20px);] lnline-flex">
                  <img {...green_right_arrow} />
                </div>

                {month + (shouldShowYear ? " " + year : "")}
              </a>
            );
          });
        })
      )}
    </div>
  );
}
