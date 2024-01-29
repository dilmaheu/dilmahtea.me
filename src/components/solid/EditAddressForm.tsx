import { user } from "@signals/user";

export default function EditAddressForm({ action, address, recurData }) {
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

  return (
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
  );
}
