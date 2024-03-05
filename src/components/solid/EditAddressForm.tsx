import { createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import { showAddressForm } from "@signals/showAddressForm";

export default function EditAddressForm({
  action,
  address: selectedAddress,
  recurData,
  isBilling = false,
}) {
  const [address, setAddress] = createSignal(selectedAddress);

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

  onMount(() => {
    if (window.cookies.isAuthenticated !== "true") {
      setAddress(window.checkoutInfo /* no need to subset */);
    }
  });

  function getUserAttribute(attribute) {
    return ["…", "N/A"].includes(user()[attribute]) ? null : user()[attribute];
  }

  return (
    <div
      class={
        "form-grid" + (isBilling ? (showAddressForm() ? "" : " !hidden") : "")
      }
    >
      <label>
        <span class="input-label">{text_first_name}</span>

        <input
          type="text"
          name={(isBilling ? "billing_" : "") + "first_name"}
          value={
            action === "add"
              ? getUserAttribute("first_name")
              : address()?.first_name ||
                (action === "checkout" && getUserAttribute("first_name")) ||
                null
          }
          placeholder={first_name_placeholder}
          required
        />
      </label>

      <label>
        <span class="input-label">{text_last_name}</span>

        <input
          type="text"
          name={(isBilling ? "billing_" : "") + "last_name"}
          value={
            action === "add"
              ? getUserAttribute("last_name")
              : address()?.last_name ||
                (action === "checkout" && getUserAttribute("last_name")) ||
                null
          }
          placeholder={last_name_placeholder}
          required
        />
      </label>

      <label>
        <span class="input-label">{text_street}</span>

        <input
          type="text"
          name={(isBilling ? "billing_" : "") + "street"}
          value={address()?.street || null}
          placeholder={street_placeholder}
          required
        />
      </label>

      <label>
        <span class="input-label">{text_city}</span>

        <input
          type="text"
          name={(isBilling ? "billing_" : "") + "city"}
          value={address()?.city || null}
          placeholder={city_placeholder}
          required
        />
      </label>

      <label>
        <span class="input-label">{text_postal_code}</span>

        <input
          type="text"
          name={(isBilling ? "billing_" : "") + "postal_code"}
          value={address()?.postal_code || null}
          placeholder={postal_code_placeholder}
          required
        />
      </label>

      <label>
        <span class="input-label">{text_country}</span>

        <select
          name={(isBilling ? "billing_" : "") + "country"}
          required
          onchange={(event) => {
            if (isBilling) {
              window.hideAllPaymentInfo();
              window.togglePaymentCardVisibility(
                event.currentTarget.value.toLowerCase(),
              );
            }
          }}
        >
          <option value="" selected disabled hidden>
            {country_placeholder}
          </option>

          {countries.data.map(({ attributes: { name, localizations } }) => (
            <option
              value={localizations?.data[0]?.attributes?.name || name}
              selected={
                address() &&
                address().country ===
                  (localizations?.data[0]?.attributes?.name || name)
              }
            >
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
