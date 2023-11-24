import { user } from "@signals/user";
import { createSignal } from "solid-js";

export default function InfoUnit({
  label,
  type,
  property,
  userAccountRecurData: {
    Button_edit_text,
    Button_update_text,
    Button_save_text,
    Button_cancel_text,
  },
}) {
  const [isEditing, setIsEditing] = createSignal(false);

  function handleEdit(event: Event) {
    const input = (event.target as HTMLButtonElement)
      .previousElementSibling as HTMLInputElement;

    input.disabled = false;

    setTimeout(() => {
      const { type: inputType } = input;

      input.type = "text";

      input.value === "N/A" && (input.value = "");

      input.selectionStart = input.selectionEnd = input.value.length;

      input.type = inputType;

      input.focus();

      setIsEditing(true);
    }, 0);
  }

  function handleCancel(event: Event) {
    const input = (event.target as HTMLButtonElement)
      .previousElementSibling as HTMLInputElement;

    input.disabled = true;

    input.value = user()[property];

    setIsEditing(false);
  }

  function handleSave(event: Event) {
    const input = (event.target as HTMLButtonElement).previousElementSibling
      .previousElementSibling as HTMLInputElement;
  }

  return (
    <div class="grid gap-1 pb-[25px] mb-[25px] border-b border-lightgray">
      <div class="information-label">{label}</div>

      <div class="flex items-center gap-[15px] justify-between">
        <input
          type={type}
          name={property}
          class="information-text"
          value={user()[property]}
          disabled
          data-no-fill-up
        />

        {isEditing() ? (
          <>
            <button
              class="information-btn !text-error-dark"
              onclick={handleCancel}
            >
              {Button_cancel_text}
            </button>

            <button class="information-btn" onclick={handleSave} type="submit">
              {Button_save_text}
            </button>
          </>
        ) : (
          <button class="information-btn" onclick={handleEdit}>
            {property === "name" ? Button_edit_text : Button_update_text}
          </button>
        )}
      </div>
    </div>
  );
}
