import { user } from "@signals/user";
import { createEffect } from "solid-js";

export default function CheckoutKindnessScript() {
  createEffect(() => {
    const kindnessCausesCardsContainer =
        document.querySelector(".kindness-causes"),
      kindnessCausesCards =
        document.querySelectorAll<HTMLElement>(".kindness-cause"),
      submitCauseBtn = document.getElementById(
        "submit-cause-btn",
      ) as HTMLButtonElement;

    function selectCard(card: HTMLElement) {
      const activeCauseCard = kindnessCausesCardsContainer.querySelector(
        ".active-kindness-cause",
      );

      activeCauseCard?.classList?.remove("active-kindness-cause");

      card.classList.add("active-kindness-cause");

      submitCauseBtn.disabled = false;
    }

    kindnessCausesCards.forEach((card) => {
      if (user().kindness_cause === card.dataset.cause) {
        selectCard(card);
      }

      card.addEventListener("focus", () => selectCard(card));
    });

    submitCauseBtn?.addEventListener("click", async () => {
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

      location.href = window.checkoutSuccessLink;
    });
  });

  return <></>;
}
