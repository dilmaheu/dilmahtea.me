import { user } from "@signals/user";

declare interface Address {
  id: string;
  email: string;
  tag: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
}

declare interface Props {
  address: Address;
  trashCanIcon: string;
  text_default_delivery_address: string;
  text_default_billing_address: string;
  Button_edit_text: string;
}

export default function Address({
  address,
  trashCanIcon,
  text_default_delivery_address,
  text_default_billing_address,
  Button_edit_text,
}: Props) {
  const { id, tag, first_name, last_name, street, city, postal_code, country } =
    address;

  const fullName = first_name + " " + last_name,
    fullAddress = [street, city, postal_code, country].join(", ");

  const isDefaultDeliveryAddress = user().default_delivery_address?.id === id,
    isDefaultBillingAddress = user().default_billing_address?.id === id;

  return (
    <div class="grid division-in-element-gap">
      <div class="quick-info">
        {(isDefaultDeliveryAddress || isDefaultBillingAddress) && (
          <>
            <div class="info-tag-button-primary">
              {isDefaultDeliveryAddress
                ? text_default_delivery_address
                : text_default_billing_address}
            </div>

            <div>&#x2022;</div>
          </>
        )}

        <div>{fullName}</div>
        <div>&#x2022;</div>
        <div class="info-tag-button">{tag}</div>
      </div>

      <div class="flex items-center division-in-element-gap justify-between">
        <div class="input-text-large-static">{fullAddress}</div>

        <div class="flex division-gap">
          <button class="button-link-primary-big">{Button_edit_text}</button>

          <div
            class="button-link-error-dark-big"
            innerHTML={trashCanIcon.innerHTML}
          />
        </div>
      </div>
    </div>
  );
}
