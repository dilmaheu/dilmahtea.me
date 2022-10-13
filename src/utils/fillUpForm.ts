export default function fillUpForm(entries) {
  entries.forEach(([name, value]) => {
    if (value) {
      const option: HTMLOptionElement = document.querySelector(
        `select[name="${name}"] option[value="${value}"]`
      );

      if (option) {
        option.selected = true;
      } else {
        const input: HTMLInputElement = document.querySelector(
          `input[name="${name}"]`
        );

        if (input) input.value = value || "";
      }
    }
  });
}
