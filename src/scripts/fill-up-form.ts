const query = document.querySelector.bind(document);

const contactInfo =
  Object.keys(window.checkoutInfo).length > 0
    ? window.checkoutInfo
    : window.userRegion
      ? { country: window.regions[window.userRegion] }
      : {};

const queryParams = Object.fromEntries(new URLSearchParams(location.search));

const availableData = {
  ...queryParams,
  ...contactInfo,
};

Object.entries<string>(availableData).forEach(([name, value]) => {
  if (value && value !== "true") {
    const option: HTMLOptionElement = query(
      `select[name="${name}"] option[value="${value}"]`,
    );

    if (option) {
      option.selected = true;
    } else {
      const input: HTMLInputElement = query(
        `input[name="${name}"]:not([data-no-fill-up])`,
      );

      if (input) {
        if (input.type === "radio") {
          const selectedOptionInput: HTMLInputElement = query(
            `input[name="${name}"][value="${value}"]`,
          );

          if (selectedOptionInput) selectedOptionInput.checked = true;
        } else {
          input.value = value || "";

          input.dispatchEvent(new Event("input"));
        }
      }
    }
  }
});
