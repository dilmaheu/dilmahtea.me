import { For, createEffect, createSignal } from "solid-js";

import Loading from "@solid/Loading";
import Address from "@solid/Address";
import DashboardNotification from "@solid/DashboardNotification";

export default function SavedAddresses({
  plusIcon,
  trashCanIcon,
  countries,
  recurringImages,
  userAccountRecurData,
}) {
  const [addresses, setAddresses] = createSignal([]),
    [isLoading, setIsLoading] = createSignal(true),
    [showingMoreAddresses, setShowingMoreAddresses] = createSignal(false);

  createEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json<any[]>())
      .then((addresses) => {
        setIsLoading(false);
        setAddresses(addresses);
      });
  });

  const {
    Label_tag_text,
    Tag_default_text: tag_default,
    Tag_others_text: tag_others,
    Tag_others_placeholder_text: tag_placeholder_others,
    Tag_suggestions,
    Button_add_text,
    Button_edit_text,
    Button_update_text,
    Button_add_new_address_text,
    Button_make_default_text,
    Button_save_text,
    Button_cancel_text,
    Tag_default_text,
    text_saved_Addresses,
    text_more_address,
    text_hide_more_address,
    Input_label_first_name,
    Input_placeholder_first_name,
    Input_label_last_name,
    Input_placeholder_last_name,
    Input_label_country,
    Input_placeholder_country,
    Input_label_city,
    Input_placeholder_city,
    Input_label_street,
    Input_placeholder_street,
    Input_label_postal_code,
    Input_placeholder_postal_code,
    Checkbox_set_default_delivery_address_text,
    Checkbox_set_default_billing_address_text,
    Checkbox_add_delivery_address_text,
    Checkbox_add_billing_address_text,
    text_content,
    text_default_delivery_address,
    text_default_billing_address,
  } = userAccountRecurData;

  return (
    <div class="dashboard-sec">
      <div class="grid division-gap">
        <DashboardNotification recurringImages={recurringImages} />

        <div class="flex flex-wrap items-center justify-between w-full">
          <div class="recoleta text-h5 font-bold text-black">
            {text_saved_Addresses}
          </div>

          <a href={`#`} class="button-primary">
            {plusIcon}
            {Button_add_new_address_text}
          </a>
        </div>

        <form
          class="tiled-form division-gap grid"
          aria-label={`page.text_shipping_address`}
        >
          <div class="division-in-gap grid">
            <div class="text-b5 font-bold text-black-light">
              Tag to recognize
            </div>

            <div class="flex flex-wrap gap-2.5 sm:gap-[15px]">
              {Tag_suggestions.split("\n")
                .filter(Boolean)
                .map((tag) => (
                  <div>
                    <input
                      type="radio"
                      name="address_tag"
                      id={`address-tag-${tag.toLowerCase()}`}
                      value={tag.toLowerCase()}
                      class="peer hidden"
                    />

                    <label
                      for={`address-tag-${tag.toLowerCase()}`}
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
                  value=""
                  class="peer hidden"
                />

                <label
                  for="add-new-address-tag"
                  class={[
                    "radio-button-extended border-white",
                    "peer-checked:border-primary",
                  ].join(" ")}
                >
                  Add +
                </label>
              </div>
            </div>

            <div id="tag-input">
              <div class="form-grid">
                <label class="relative">
                  <input
                    type="text"
                    placeholder={`Enter your tag`}
                    class="pr-[40px]"
                  />
                </label>
              </div>
            </div>
          </div>

          <div class="form-grid">
            <label>
              <span class="input-label">{`page.text_first_name`}</span>

              <input
                type="text"
                name="first_name"
                placeholder={`page.first_name_placeholder`}
                required
              />
            </label>

            <label>
              <span class="input-label">{`page.text_last_name`}</span>

              <input
                type="text"
                name="last_name"
                placeholder={`page.last_name_placeholder`}
                required
              />
            </label>

            <label>
              <span class="input-label">{`page.text_street`}</span>

              <input
                type="text"
                name="street"
                placeholder={`page.street_placeholder`}
                required
              />
            </label>

            <label>
              <span class="input-label">{`page.text_city`}</span>

              <input
                type="text"
                name="city"
                placeholder={`page.city_placeholder`}
                required
              />
            </label>

            <label>
              <span class="input-label">{`page.text_postal_code`}</span>

              <input
                type="text"
                name="postal_code"
                placeholder={`page.postal_code_placeholder`}
                required
              />
            </label>

            <label>
              <span class="input-label">{`page.text_country`}</span>

              <select name="country" required>
                <option value="" selected disabled hidden>
                  {`page.country_placeholder`}
                </option>

                {countries.data.map(
                  ({ attributes: { name, localizations } }) => (
                    <option
                      value={localizations?.data[0]?.attributes?.name || name}
                    >
                      {name}
                    </option>
                  ),
                )}
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
                {Button_save_text}
              </button>
            </div>

            <div class="flex">
              <button type="button" class="button-link-error-dark">
                {Button_cancel_text}
              </button>
            </div>
          </div>
        </form>

        {isLoading() ? (
          <Loading />
        ) : (
          <>
            <div class="grid division-in-gap">
              <For
                each={addresses().slice(
                  0,
                  showingMoreAddresses() ? addresses().length : 3,
                )}
              >
                {(address, i) => (
                  <>
                    <Address
                      address={address}
                      trashCanIcon={trashCanIcon}
                      text_default_delivery_address={
                        text_default_delivery_address
                      }
                      text_default_billing_address={
                        text_default_billing_address
                      }
                      Button_edit_text={Button_edit_text}
                    />

                    {i() <
                      (showingMoreAddresses() ? addresses().length : 3) - 1 && (
                      <div class="h-px bg-primary-light"></div>
                    )}
                  </>
                )}
              </For>
            </div>

            {addresses().length > 3 && (
              <button
                onclick={() => setShowingMoreAddresses(!showingMoreAddresses())}
                class="horizontal-toggle-button-primary w-full flex justify-center"
              >
                <span>
                  {(!showingMoreAddresses()
                    ? text_more_address
                    : text_hide_more_address
                  ).replaceAll("<number>", addresses().length - 3)}
                </span>

                {!showingMoreAddresses() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 8"
                    class="toggle-button-arrow fill-primary"
                  >
                    <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 8"
                    class="toggle-button-arrow fill-primary"
                  >
                    <path d="M13.7,7.7a1.1,1.1,0,0,1-.8.3.9.9,0,0,1-.7-.3L7,2.5,1.8,7.7A1.1,1.1,0,0,1,1,8a.9.9,0,0,1-.7-.3A.9.9,0,0,1,0,7a1.1,1.1,0,0,1,.3-.8L6.2.3A1.1,1.1,0,0,1,7,0a.9.9,0,0,1,.7.3l6,5.9A1.1,1.1,0,0,1,14,7,.9.9,0,0,1,13.7,7.7Z" />
                  </svg>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
