import { For, createEffect, createSignal } from "solid-js";

import Address from "@solid/Address";
import DashboardNotification from "@solid/DashboardNotification";

export default function SavedAddresses({
  plusIcon,
  trashCanIcon,
  countries,
  recurringImages,
  userAccountRecurData,
}) {
  const [addresses, setAddresses] = createSignal([]);

  createEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json<any[]>())
      .then((addresses) => {
        setAddresses(addresses);
      });
  });

  const {
    Label_tag_text,
    Tag_default_text: tag_default,
    Tag_others_text: tag_others,
    Tag_others_placeholder_text: tag_placeholder_others,
    Address_tag: address_tag,
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

  const address_primary = address_tag.slice(0, 3),
    address_all = address_tag.slice(3);

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

        <div class="tiled-form">
          <div
            role="form"
            aria-label={`page.text_shipping_address`}
            class="division-gap grid"
          >
            <div class="division-in-gap grid">
              <div class="text-b5 font-bold text-black-light">
                Tag to recognize
              </div>

              <div class="flex flex-wrap gap-2.5 sm:gap-[15px]">
                <div>
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address1`}
                    value={`value`}
                    checked
                    class="peer hidden"
                  />

                  <label
                    for={`address1`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Home
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address2`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address2`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Parents
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address3`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address3`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Family
                  </label>
                </div>

                <div class="more-address hidden">
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address4`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address4`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Address Line 1
                  </label>
                </div>

                <div class="more-address hidden">
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address5`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address5`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Address Line 2
                  </label>
                </div>

                <div class="more-address hidden">
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address6`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address6`}
                    class={[
                      "radio-button-default text-primary",
                      "bg-secondary-light border-secondary-light font-medium",
                      "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                    ].join(" ")}
                  >
                    Address Line 3
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="shipping_address"
                    id={`address-tag`}
                    value={`value`}
                    class="peer hidden"
                  />

                  <label
                    for={`address-tag`}
                    class={[
                      "radio-button-extended border-white",
                      "peer-checked:border-primary",
                    ].join(" ")}
                  >
                    Add +
                  </label>
                </div>
              </div>

              <div id="tag-input" class="hidden">
                <div class="form-grid">
                  <label class="relative">
                    <input
                      type="text"
                      name="new_tag"
                      placeholder={`Enter your tag`}
                      class="pr-[40px]"
                    />

                    <span class="tag-input-close-button"> &#10005;</span>
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
                    <input type="checkbox" />
                    <span class="checkbox-primary"></span>
                  </span>
                  {Checkbox_set_default_delivery_address_text}
                </label>
              </div>

              <div class="flex">
                <label class="checkbox-primary">
                  <span class="checkbox-input-container">
                    <input type="checkbox" />
                    <span class="checkbox-primary"></span>
                  </span>
                  {Checkbox_add_billing_address_text}
                </label>
              </div>

              <div class="flex">
                <label class="checkbox-primary">
                  <span class="checkbox-input-container">
                    <input type="checkbox" />
                    <span class="checkbox-primary"></span>
                  </span>
                  {Checkbox_set_default_billing_address_text}
                </label>
              </div>
            </div>

            <div class="form-button-container">
              <div class="flex w-full sm:w-1/2 sm:order-2">
                <div class="button-primary w-full">{Button_save_text}</div>
              </div>

              <div class="flex">
                <div class="button-link-error-dark">{Button_cancel_text}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid division-in-gap">
          <For each={addresses()}>
            {(address, i) => (
              <>
                <Address
                  address={address}
                  trashCanIcon={trashCanIcon}
                  text_default_delivery_address={text_default_delivery_address}
                  text_default_billing_address={text_default_billing_address}
                  Button_edit_text={Button_edit_text}
                />

                {i() < addresses().length - 1 && (
                  <div class="h-px bg-primary-light"></div>
                )}
              </>
            )}
          </For>
        </div>

        {address_tag.length > 3 && (
          <div class="w-full flex justify-center">
            <div id="toggle-more-address">
              <div
                id="show-more-address"
                class="horizontal-toggle-button-primary"
              >
                <span>
                  {text_more_address.replaceAll(
                    "<number>",
                    address_tag.length - 3,
                  )}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 8"
                  class="toggle-button-arrow fill-primary"
                >
                  <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z" />
                </svg>
              </div>

              <div
                id="hide-more-address"
                class="horizontal-toggle-button-primary hidden"
              >
                <span>
                  {text_hide_more_address.replaceAll(
                    "<number>",
                    address_tag.length - 3,
                  )}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 8"
                  class="toggle-button-arrow fill-primary"
                >
                  <path d="M13.7,7.7a1.1,1.1,0,0,1-.8.3.9.9,0,0,1-.7-.3L7,2.5,1.8,7.7A1.1,1.1,0,0,1,1,8a.9.9,0,0,1-.7-.3A.9.9,0,0,1,0,7a1.1,1.1,0,0,1,.3-.8L6.2.3A1.1,1.1,0,0,1,7,0a.9.9,0,0,1,.7.3l6,5.9A1.1,1.1,0,0,1,14,7,.9.9,0,0,1,13.7,7.7Z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
