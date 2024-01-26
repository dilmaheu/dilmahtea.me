export default function EditAddress({ recurData, userAccountRecurData }) {
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
    Tag_default_text,
    Tag_others_text,
    Tag_others_placeholder_text,
    Tag_suggestions,
    Button_add_text,
    Button_edit_text,
    Button_update_text,
    Button_add_new_address_text,
    Button_make_default_text,
    Button_save_text,
    Button_cancel_text,
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
    <form class="tiled-form division-gap grid">
      <div class="division-in-gap grid">
        <div class="text-b5 font-bold text-black-light">{Label_tag_text}</div>

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
              {Tag_others_text}
            </label>
          </div>
        </div>

        <div id="tag-input">
          <div class="form-grid">
            <label class="relative">
              <input
                type="text"
                placeholder={Tag_others_placeholder_text}
                class="pr-[40px]"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <label>
          <span class="input-label">{text_first_name}</span>

          <input
            type="text"
            name="first_name"
            placeholder={first_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_last_name}</span>

          <input
            type="text"
            name="last_name"
            placeholder={last_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_street}</span>

          <input
            type="text"
            name="street"
            placeholder={street_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_city}</span>

          <input
            type="text"
            name="city"
            placeholder={city_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{text_postal_code}</span>

          <input
            type="text"
            name="postal_code"
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
              <option value={localizations?.data[0]?.attributes?.name || name}>
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
  );
}