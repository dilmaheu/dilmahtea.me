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

availableData.email_or_phone = availableData.email || availableData.phone;

Object.entries<string>(availableData).forEach(([name, value]) => {
  if (value && value !== "true") {
    const option: HTMLOptionElement = query(
      `select[name="${name}"] option[value="${value}"]`,
    );

    if (option) {
      option.selected = true;
    } else {
      const input: HTMLInputElement = query(`input[name="${name}"]`);

      if (input) {
        if (input.type === "radio") {
          const selectedOptionInput: HTMLInputElement = query(
            `input[name="${name}"][value="${value}"]`,
          );

          selectedOptionInput.checked = true;
        } else {
          input.value = value || "";
        }
      }
    }
  }
});
