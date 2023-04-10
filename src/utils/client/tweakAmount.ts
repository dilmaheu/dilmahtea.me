const tweak = ({ target, action }) => {
  const counter = target[
      action === "decrement" ? "nextElementSibling" : "previousElementSibling"
    ] as HTMLInputElement,
    quantity = Number(counter.value);

  counter.dispatchEvent(new Event("beforeinput"));

  counter.value = String(action === "decrement" ? quantity - 1 : quantity + 1);

  counter.dispatchEvent(new Event("input"));
};

export default function (amountTweakBtns, amountInputs, tweakAmountCallback) {
  amountTweakBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const action = button.getAttribute("data-action");

      tweak({ target: button, action });
    });
  });

  amountInputs.forEach((input: HTMLInputElement) => {
    let latestValidValue;

    input.addEventListener("beforeinput", () => {
      input.validity.valid && (latestValidValue = input.value);
    });

    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        input.value = latestValidValue;
      }

      const decrementBtn = input.previousElementSibling as HTMLButtonElement;

      decrementBtn.disabled = input.value === "1" ? true : false;

      tweakAmountCallback(input);
    });
  });
}
