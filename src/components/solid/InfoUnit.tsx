import { user } from "@signals/user";
import { createSignal } from "solid-js";

export default function InfoUnit({
  label,
  type,
  property,
  verificationHref,
  userAccountRecurData: {
    Button_edit_text,
    Button_update_text,
    Button_save_text,
    Button_cancel_text,
  },
  setNotification,
}) {
  const [isEditing, setIsEditing] = createSignal(false);

  function handleEdit(event: Event) {
    const input = (event.target as HTMLButtonElement)
      .previousElementSibling as HTMLInputElement;

    input.disabled = false;

    setTimeout(() => {
      const { type: inputType } = input;

      input.type = "text";

      ["…", "N/A"].includes(input.value) && (input.value = "");

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

    if ([user()[property], ""].includes(input.value)) {
      input.classList.add("errored");

      return;
    } else {
      input.classList.remove("errored");
    }

    setNotification(null);

    const referrerURL = new URL(location.href);

    referrerURL.searchParams.set("updated_user_info", "true");
    referrerURL.searchParams.set("info", property);

    const referrer = referrerURL.toString();

    fetch(
      property === "display_name"
        ? "/account/update"
        : "/account/send-magic-link",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrer,
          ...(property === "display_name"
            ? { display_name: input.value }
            : (() => {
                const previousContactId =
                  user()[property] !== "N/A"
                    ? property
                    : property === "email"
                    ? "phone"
                    : "email";

                return {
                  action: "update",
                  [property]: input.value,
                  previous_contact: `${previousContactId}:${
                    user()[previousContactId]
                  }`,
                };
              })()),
        }),
      },
    )
      .then((res) => res.json<any>())
      .then((response) => {
        if (response.success) {
          if (property === "display_name") {
            location.href = response.referrer;
          } else {
            const queryParams = new URLSearchParams({
              [property]: input.value,
              referrer,
            }).toString();

            location.href = verificationHref + "?" + queryParams;
          }
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
  }

  return (
    <div class="grid division-in-element-gap">
      <div class="input-label">{label}</div>

      <div class="flex items-center gap-[15px] justify-between">
        <input
          type={type}
          name={property}
          class="input-text-large"
          value={user()[property]}
          disabled
          data-no-fill-up
        />

        {isEditing() ? (
          <>
            <button class="button-link-error-dark-big" onclick={handleCancel}>
              {Button_cancel_text}
            </button>

            <button
              class="button-link-primary-big"
              onclick={handleSave}
              type="submit"
            >
              {Button_save_text}
            </button>
          </>
        ) : (
          <button class="button-link-primary-big" onclick={handleEdit}>
            {["display_name", "address"].includes(property)
              ? Button_edit_text
              : Button_update_text}
          </button>
        )}
      </div>
    </div>
  );
}
