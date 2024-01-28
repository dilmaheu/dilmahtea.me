import type { Setter } from "solid-js";
import type { Address } from "@solid/Address";

import { createEffect, createSignal } from "solid-js";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";

declare interface Props {
  action: "add" | "update";
  address?: Address;
  recurData: any;
  userAccountRecurData: any;
  showForm: Setter<any>;
  handleAPIResponse: (response: Response) => void;
  scroll?: () => void;
  tickCheckboxes?: {
    default_billing_address?: boolean;
    default_delivery_address?: boolean;
  };
}

export default function EditAddress({
  action,
  address,
  recurData,
  userAccountRecurData,
  showForm,
  handleAPIResponse,
  scroll,
  tickCheckboxes,
}: Props) {
  const [customAddressTag, setCustomAddressTag] = createSignal(""),
    [showCustomTagInput, setShowCustomTagInput] = createSignal(false),
    [usedTags, setUsedTags] = createSignal([]);

  createEffect(() => {
    if (Array.isArray(addresses())) {
      setUsedTags(
        addresses()
          .map(({ tag }) => tag)
          .filter((tag) => tag !== address?.tag),
      );
    }
  });

  const {
    text_first_name,
    first_name_placeholder,
    text_last_name,
    last_name_placeholder,
    text_country,
    country_placeholder,
    text_city,
    city_placeholder,
    text_street,
    street_placeholder,
    text_postal_code,
    postal_code_placeholder,
    countries,
  } = recurData;

  const {
    Label_tag_text,
    Tag_others_text,
    Tag_others_placeholder_text,
    Tag_suggestions,
    Button_add_text,
    Button_update_text,
    Button_cancel_text,
    Checkbox_set_default_delivery_address_text,
    Checkbox_set_default_billing_address_text,
  } = userAccountRecurData;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = Object.fromEntries(
      // @ts-ignore
      new FormData(event.currentTarget as HTMLFormElement).entries(),
    );

    if (action === "update") {
      formData.id = address.id;
    }

    fetch("/api/addresses", {
      method: action === "add" ? "POST" : "PUT",
      body: JSON.stringify(formData),
    }).then(handleAPIResponse);
  }

  function hideCustomTagInput() {
    setCustomAddressTag("");

    setShowCustomTagInput(false);
  }

  return (
    <form class="tiled-form division-gap grid" onsubmit={handleSubmit}>
      <div class="division-in-gap grid">
        <div class="text-b5 font-bold text-black-light">{Label_tag_text}</div>

        <div class="flex flex-wrap gap-2.5 sm:gap-[15px]">
          {Tag_suggestions.split("\n")
            .filter(Boolean)
            .filter((tag) => !usedTags().includes(tag))
            .map((tag) => (
              <div>
                <input
                  type="radio"
                  name="address_tag"
                  id={`address-tag-${tag}`}
                  class="peer w-px opacity-0"
                  value={tag}
                  onchange={hideCustomTagInput}
                  checked={address?.tag === tag}
                  required={action === "update"}
                />

                <label
                  for={`address-tag-${tag}`}
                  class={[
                    "radio-button-default text-primary",
                    "bg-secondary-light border-secondary-light font-medium",
                    "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                  ].join(" ")}
                >
                  {tag}
                </label>
              </div>
            ))}

          <div>
            <input
              type="radio"
              name="address_tag"
              id="add-new-address-tag"
              class="peer w-px opacity-0"
              value={customAddressTag()}
              checked={!!showCustomTagInput()}
              onchange={() => setShowCustomTagInput(true)}
              required={action === "update"}
            />

            <label
              for="add-new-address-tag"
              class={[
                "radio-button-extended border-white",
                "peer-checked:border-primary",
              ].join(" ")}
            >
              {Tag_others_text}
            </label>
          </div>
        </div>

        {showCustomTagInput() && (
          <div id="tag-input">
            <div class="form-grid">
              <label class="relative">
                <input
                  type="text"
                  class="pr-[40px]"
                  placeholder={Tag_others_placeholder_text}
                  oninput={(event) =>
                    setCustomAddressTag(event.currentTarget.value)
                  }
                  required={action === "update"}
                />

                <span
                  tabIndex="0"
                  onclick={hideCustomTagInput}
                  class="tag-input-close-button text-2xl"
                >
                  <b>&#10005;</b>
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div class="form-grid">
        <label>
          <span class="input-label">{text_first_name}</span>

          <input
            type="text"
            name="first_name"
            value={
              action === "add"
                ? ["…", "N/A"].includes(user().first_name)
                  ? null
                  : user().first_name
                : address?.first_name || null
            }
            placeholder={first_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_last_name}</span>

          <input
            type="text"
            name="last_name"
            value={
              action === "add"
                ? ["…", "N/A"].includes(user().last_name)
                  ? null
                  : user().last_name
                : address?.last_name || null
            }
            placeholder={last_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_street}</span>

          <input
            type="text"
            name="street"
            value={address?.street || null}
            placeholder={street_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_city}</span>

          <input
            type="text"
            name="city"
            value={address?.city || null}
            placeholder={city_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_postal_code}</span>

          <input
            type="text"
            name="postal_code"
            value={address?.postal_code || null}
            placeholder={postal_code_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_country}</span>

          <select name="country" required>
            <option value="" selected disabled hidden>
              {country_placeholder}
            </option>

            {countries.data.map(({ attributes: { name, localizations } }) => (
              <option
                value={localizations?.data[0]?.attributes?.name || name}
                selected={
                  address &&
                  address.country ===
                    (localizations?.data[0]?.attributes?.name || name)
                }
              >
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div class="division-in-element-gap grid">
        <div class="flex">
          <label class="checkbox-primary">
            <span class="checkbox-input-container">
              <input
                type="checkbox"
                name="set_as_default_delivery_address"
                value="true"
                checked={
                  tickCheckboxes?.default_delivery_address ||
                  (address &&
                    address.id === user().default_delivery_address?.id) ||
                  false
                }
              />
              <span class="checkbox-primary"></span>
            </span>
            {Checkbox_set_default_delivery_address_text}
          </label>
        </div>

        <div class="flex">
          <label class="checkbox-primary">
            <span class="checkbox-input-container">
              <input
                type="checkbox"
                name="set_as_default_billing_address"
                value="true"
                checked={
                  tickCheckboxes?.default_billing_address ||
                  (address &&
                    address.id === user().default_billing_address?.id) ||
                  false
                }
              />
              <span class="checkbox-primary"></span>
            </span>
            {Checkbox_set_default_billing_address_text}
          </label>
        </div>
      </div>

      <div class="form-button-container">
        <div class="flex w-full sm:w-1/2 sm:order-2">
          <button type="submit" class="button-primary w-full">
            {action === "add" ? Button_add_text : Button_update_text}
          </button>
        </div>

        <div class="flex">
          <button
            type="button"
            class="button-link-error-dark"
            onclick={() => {
              if (scroll) scroll();

              showForm(false);
            }}
          >
            {Button_cancel_text}
          </button>
        </div>
      </div>
    </form>
  );
}
