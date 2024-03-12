import { orders, ordersYear, setOrdersYear } from "@signals/orders";

import Loading from "@solid/Loading";
import { createEffect, createSignal } from "solid-js";

export default function OrdersTimeline() {
  const [years, setYears] = createSignal([]);

  createEffect(() => {
    setYears(orders() ? Object.keys(orders()).reverse() : []);
  });

  function changeYear({ move }) {
    const currentYearIndex = years().indexOf(ordersYear());

    setOrdersYear(years()[currentYearIndex + move]);
  }

  return (
    <>
      {!orders() ? (
        <Loading />
      ) : (
        <>
          <div class="flex items-center justify-between gap-2.5">
            <button
              onclick={() => changeYear({ move: -1 })}
              class={
                (years().length === 0 || years().indexOf(ordersYear()) === 0) &&
                "invisible"
              }
            >
              <svg
                id="year-selector-arrow-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="w-[18px] h-[18px] fill-primary cursor-pointer"
              >
                <path d="M7.7,13.7a1.1,1.1,0,0,0,.3-.8,1.1,1.1,0,0,0-.3-.7L2.5,7,7.7,1.8A1.1,1.1,0,0,0,8,1,1.1,1.1,0,0,0,7.7.3,1.1,1.1,0,0,0,7,0a1.1,1.1,0,0,0-.8.3L.3,6.2A1.1,1.1,0,0,0,0,7a.9.9,0,0,0,.3.7l5.9,6A1.1,1.1,0,0,0,7,14a1.1,1.1,0,0,0,.7-.3Z"></path>
              </svg>
            </button>

            <select
              id="year-selector"
              class={[
                "grow text-b3 font-bold text-primary",
                "text-center bg-transparent appearance-none",
              ].join(" ")}
              onChange={(event) => setOrdersYear(event.target.value)}
            >
              {years().length ? (
                years().map((year) => (
                  <option
                    value={year}
                    class="select-none"
                    selected={year === ordersYear()}
                  >
                    {year.slice(5)}
                  </option>
                ))
              ) : (
                <option class="select-none">{new Date().getFullYear()}</option>
              )}
            </select>

            <button
              onclick={() => changeYear({ move: 1 })}
              class={
                (years().length === 0 ||
                  !(years().indexOf(ordersYear()) < years().length - 1)) &&
                "invisible"
              }
            >
              <svg
                id="year-selector-arrow-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="w-[18px] h-[18px] fill-primary cursor-pointer"
              >
                <path d="M.3,13.7a1.1,1.1,0,0,1-.3-.8,1.1,1.1,0,0,1,.3-.7L5.5,7,.3,1.8A1.1,1.1,0,0,1,0,1,1.1,1.1,0,0,1,.3.3,1.1,1.1,0,0,1,1,0a1.1,1.1,0,0,1,.8.3L7.7,6.2A1.1,1.1,0,0,1,8,7a.9.9,0,0,1-.3.7l-5.9,6A1.1,1.1,0,0,1,1,14a1.1,1.1,0,0,1-.7-.3Z"></path>
              </svg>
            </button>
          </div>

          <div class="division-in-gap flex flex-wrap">
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <a
                href={`#${month.toLowerCase()}`}
                class={
                  years().length && !!orders()[ordersYear()][month]
                    ? "button-state-selected"
                    : "button-state-not-selected"
                }
                style="min-width: 85px;"
              >
                {month.slice(0, 3)}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
