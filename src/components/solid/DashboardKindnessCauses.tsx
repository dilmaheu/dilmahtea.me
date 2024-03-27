import { user } from "@signals/user";
import { createEffect, createSignal, onMount } from "solid-js";

import SolidNotification from "@solid/SolidNotification";

let memoizedElements: {
  kindnessCauseContainer: HTMLElement;
  mySelectedCauseInput: HTMLInputElement;
  kindnessCauseInputs: NodeListOf<HTMLInputElement>;
};

export default function DashboardKindnessCauses({
  title,
  successNotificationText,
  notificationIcons,
  kindnessCausesHTML,
}) {
  const [notification, setNotification] = createSignal(null);

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

  let kindnessCausesTitle: HTMLHeadingElement;

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

      const header = document.querySelector("header");

      const headerRect = header.getBoundingClientRect(),
        kindnessCausesTitleRect = kindnessCausesTitle.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + kindnessCausesTitleRect.top - headerRect.height,
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

          if (value !== "choice_of_dilmah") mySelectedCauseInput.checked = true;

          break;
        }
      }
    }
  });

  return (
    <>
      <h2
        ref={kindnessCausesTitle}
        id={title.toLowerCase().replaceAll(" ", "-")}
        class="tiled-title text-h2"
      >
        {title}
      </h2>

      <div class="tiled-div">
        <SolidNotification
          notification={notification}
          notificationIcons={notificationIcons}
          bottomMargin={true}
          bordered={true}
        />

        {kindnessCausesHTML}
      </div>
    </>
  );
}
