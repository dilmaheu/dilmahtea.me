import { user } from "@signals/user";
import { createEffect, createMemo, onMount } from "solid-js";

import DashboardNotification, {
  notification,
  setNotification,
} from "@solid/DashboardNotification";

let memoizedElements: {
  kindnessCauseContainer: HTMLElement;
  mySelectedCauseInput: HTMLInputElement;
  kindnessCauseInputs: NodeListOf<HTMLInputElement>;
};

export default function DashboardKindnessCauses({
  title,
  successNotificationText,
  recurringImages,
  kindnessCausesHTML,
}) {
  const queryElements = () => {
    if (!memoizedElements) {
      const kindnessCauseContainer = document.getElementById(
          "kindness-cause-grid",
        ),
        mySelectedCauseInput = document.querySelector<HTMLInputElement>(
          "#cause-form input:not([name='kindness_cause'])",
        ),
        kindnessCauseInputs = document.querySelectorAll<HTMLInputElement>(
          "input[name='kindness_cause']",
        );

      memoizedElements = {
        kindnessCauseContainer,
        mySelectedCauseInput,
        kindnessCauseInputs,
      };
    }

    return memoizedElements;
  };

  onMount(() => {
    const {
      kindnessCauseContainer,
      mySelectedCauseInput,
      kindnessCauseInputs,
    } = queryElements();

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
  });

  createEffect(() => {
    if (user().kindness_cause !== "…") {
      const { mySelectedCauseInput, kindnessCauseInputs } = queryElements();

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
        class="dashboard-sec-title recoleta mt-[30px]"
      >
        {title}
      </h2>

      <div class="dashboard-sec">
        <DashboardNotification recurringImages={recurringImages} />

        {kindnessCausesHTML}
      </div>
    </>
  );
}
