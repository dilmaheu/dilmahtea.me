const query = document.querySelector.bind(document);

export default function fillUpForm(entries) {
  entries.forEach(([name, value]) => {
    if (value) {
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
}
