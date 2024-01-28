export default function CheckoutInformationAddress({
  page,
  recurData,
  userAccountRecurData,
}) {
  return (
    <div
      role="form"
      aria-label={page.text_shipping_address}
      class="division-gap grid"
    >
      <h2 class="recoleta text-h2 text-primary">
        {page.text_shipping_address}
      </h2>

      <div>
        <div class="division-in-gap grid">
          <div class="text-b5 font-bold text-black-light">Tag to recognize</div>

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

            <div
              id="address-toggle-button"
              class="flex items-center gap-1 text-primary font-bold cursor-pointer"
            >
              <svg
                id="address-arrow-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="hidden w-3 h-3 fill-primary"
              >
                <path d="M7.7,13.7a1.1,1.1,0,0,0,.3-.8,1.1,1.1,0,0,0-.3-.7L2.5,7,7.7,1.8A1.1,1.1,0,0,0,8,1,1.1,1.1,0,0,0,7.7.3,1.1,1.1,0,0,0,7,0a1.1,1.1,0,0,0-.8.3L.3,6.2A1.1,1.1,0,0,0,0,7a.9.9,0,0,0,.3.7l5.9,6A1.1,1.1,0,0,0,7,14a1.1,1.1,0,0,0,.7-.3Z"></path>
              </svg>

              <div>
                <div id="hide-address-text" class="hidden">
                  {userAccountRecurData.text_hide_more_address.replace(
                    "<number>",
                    "3",
                  )}
                </div>
                <div id="show-address-text">
                  {userAccountRecurData.text_more_address.replace(
                    "<number>",
                    "3",
                  )}
                </div>
              </div>

              <svg
                id="address-arrow-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="w-3 h-3 fill-primary"
              >
                <path d="M.3,13.7a1.1,1.1,0,0,1-.3-.8,1.1,1.1,0,0,1,.3-.7L5.5,7,.3,1.8A1.1,1.1,0,0,1,0,1,1.1,1.1,0,0,1,.3.3,1.1,1.1,0,0,1,1,0a1.1,1.1,0,0,1,.8.3L7.7,6.2A1.1,1.1,0,0,1,8,7a.9.9,0,0,1-.3.7l-5.9,6A1.1,1.1,0,0,1,1,14a1.1,1.1,0,0,1-.7-.3Z"></path>
              </svg>
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
      </div>

      <div class="form-grid">
        <label>
          <span class="input-label">{recurData.text_first_name}</span>

          <input
            type="text"
            name="first_name"
            placeholder={recurData.first_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{recurData.text_last_name}</span>

          <input
            type="text"
            name="last_name"
            placeholder={recurData.last_name_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{recurData.text_street}</span>

          <input
            type="text"
            name="street"
            placeholder={recurData.street_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{recurData.text_city}</span>

          <input
            type="text"
            name="city"
            placeholder={recurData.city_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{recurData.text_postal_code}</span>

          <input
            type="text"
            name="postal_code"
            placeholder={recurData.postal_code_placeholder}
            required
          />
        </label>

        <label>
          <span class="input-label">{recurData.text_country}</span>

          <select name="country" required>
            <option value="" selected disabled hidden>
              {recurData.country_placeholder}
            </option>

            {recurData.countries.data.map(
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
    </div>
  );
}
