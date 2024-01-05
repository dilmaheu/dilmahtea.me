import { user } from "@signals/user";
import { createEffect, createMemo, onCleanup } from "solid-js";

let memoizedElements: {
  kindnessCausesCardsContainer: HTMLElement;
  kindnessCausesCards: NodeListOf<HTMLElement>;
  submitCauseBtn: HTMLButtonElement;
};

export default function CheckoutKindnessScript({ checkoutSuccessLink }) {
  createEffect(() => {
    if (!memoizedElements) {
      const kindnessCausesCardsContainer =
          document.querySelector<HTMLElement>(".kindness-causes"),
        kindnessCausesCards =
          document.querySelectorAll<HTMLElement>(".kindness-cause"),
        submitCauseBtn = document.getElementById(
          "submit-cause-btn",
        ) as HTMLButtonElement;

      memoizedElements = {
        kindnessCausesCardsContainer,
        kindnessCausesCards,
        submitCauseBtn,
      };
    }

    const {
      kindnessCausesCardsContainer,
      kindnessCausesCards,
      submitCauseBtn,
    } = memoizedElements;

    function selectCard(card: HTMLElement) {
      const activeCauseCard = kindnessCausesCardsContainer.querySelector(
        ".active-kindness-cause",
      );

      activeCauseCard?.classList?.remove("active-kindness-cause");

      card.classList.add("active-kindness-cause");

      submitCauseBtn.disabled = false;
    }

    function handleCardFocus(event: FocusEvent) {
      selectCard(event.target as HTMLElement);
    }

    async function handleSubmitCause() {
      const kindness_cause =
        kindnessCausesCardsContainer.querySelector<HTMLElement>(
          ".active-kindness-cause",
        ).dataset.cause;

      await Promise.all([
        fetch(
          `https://${
            window.shouldDisplayExperimentals ? "dev." : ""
          }baserow.scripts.dilmahtea.me/order/cup-of-kindness`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin: location.origin,
              paymentID: window.paymentID,
              "Cup of Kindness": kindness_cause,
            }),
          },
        ),
        user().kindness_cause !== "…" &&
          kindness_cause !== user().kindness_cause &&
          fetch("/account/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              kindness_cause,
            }),
          }),
      ]);

      location.href = checkoutSuccessLink;
    }

    kindnessCausesCards.forEach((card) => {
      if (user().kindness_cause === card.dataset.cause) {
        selectCard(card);
      }

      card.addEventListener("focus", handleCardFocus);
    });

    submitCauseBtn.addEventListener("click", handleSubmitCause);

    onCleanup(() => {
      kindnessCausesCards.forEach((card) => {
        card.removeEventListener("focus", handleCardFocus);
      });

      submitCauseBtn.removeEventListener("click", handleSubmitCause);
    });
  });

  return <></>;
}
