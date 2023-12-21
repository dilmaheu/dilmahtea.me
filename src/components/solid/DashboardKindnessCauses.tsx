import { user } from "@signals/user";
import { createEffect, createSignal } from "solid-js";

let effectHasRunOnce = false;

export default function DashboardKindnessCauses({
  title,
  successNotificationText,
  recurringImages,
  kindnessCausesHTML,
}) {
  const [notification, setNotification] = createSignal(null);

  createEffect(() => {
    const kindnessCauseContainer = document.getElementById(
        "kindness-cause-grid",
      ),
      mySelectedCauseInput = document.querySelector<HTMLInputElement>(
        "#cause-form input:not([name='kindness_cause'])",
      ),
      kindnessCauseInputs = document.querySelectorAll<HTMLInputElement>(
        "input[name='kindness_cause']",
      );

    if (!effectHasRunOnce) {
      const searchParams = Object.fromEntries(
        new URLSearchParams(location.search),
      );

      if (
        searchParams.updated_user_info === "true" &&
        searchParams.info === "kindness_cause"
      ) {
        setNotification({
          type: "success",
          message: successNotificationText,
        });

        setTimeout(() => {
          // skip if an error notification is set within 7 seconds
          if (notification().type === "success") {
            setNotification(null);
          }
        }, 7000);
      }

      kindnessCauseInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
          const target = event.target as HTMLInputElement;

          if (target.checked) {
            mySelectedCauseInput.checked =
              kindnessCauseContainer.contains(target);
          }

          setNotification(null);

          const referrerURL = new URL(location.href);

          referrerURL.searchParams.set("updated_user_info", "true");
          referrerURL.searchParams.set("info", "kindness_cause");

          const referrer = referrerURL.toString();

          fetch("/account/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              referrer,
              kindness_cause: target.value,
            }),
          })
            .then((res) => res.json<any>())
            .then((response) => {
              if (response.success) {
                location.href = response.referrer;
              } else {
                throw new Error(response.message);
              }
            })
            .catch((error) => {
              setNotification({
                type: "error",
                message: error.message,
              });
            });
        });
      });

      effectHasRunOnce = true;
    }

    if (user().kindness_cause !== "…") {
      for (const input of Array.from(kindnessCauseInputs)) {
        const { value } = input;

        if (value === String(user().kindness_cause)) {
          input.checked = true;

          if (value !== "null") mySelectedCauseInput.checked = true;

          break;
        }
      }
    }
  });

  return (
    <>
      <h2
        id={title.toLowerCase().replaceAll(" ", "-")}
        class="dashboard-sec-title recoleta mt-[50px]"
      >
        {title}
      </h2>

      <div class="dashboard-sec">
        {notification() && (
          <div
            class={[
              "flex justify-center p-2.5 mb-[25px] gap-[7px]",
              notification().type === "success"
                ? "bg-success-light"
                : "bg-error-light",
            ].join(" ")}
          >
            <img
              class="w-[26px] h-[26px]"
              {...recurringImages[`${notification().type}_notification`]}
            />

            <p class="text-black-bg font-medium">{notification().message}</p>
          </div>
        )}

        {kindnessCausesHTML}
      </div>
    </>
  );
}
