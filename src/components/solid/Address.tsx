import type { Setter } from "solid-js";

import { createSignal } from "solid-js";

import Loading from "@solid/Loading";
import { user } from "@signals/user";

export interface Address {
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
  trashCanIcon: HTMLElement;
  text_default_delivery_address: string;
  text_default_billing_address: string;
  Button_edit_text: string;
  setEditAddress: Setter<boolean>;
  handleAPIResponse: (response: Response, callback?: () => void) => void;
}

export default function Address({
  address,
  trashCanIcon,
  text_default_delivery_address,
  text_default_billing_address,
  Button_edit_text,
  setEditAddress,
  handleAPIResponse,
}: Props) {
  const [isDeleting, setIsDeleting] = createSignal(false);

  const { id, tag, first_name, last_name, street, city, postal_code, country } =
    address;

  const fullName = first_name + " " + last_name,
    fullAddress = [street, city, postal_code, country].join(", ");

  const isDefaultDeliveryAddress = user().default_delivery_address?.id === id,
    isDefaultBillingAddress = user().default_billing_address?.id === id;

  function deleteAddress() {
    setIsDeleting(true);

    fetch("/api/addresses/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((response) =>
      handleAPIResponse(response, () => setIsDeleting(false)),
    );
  }

  return (
    <div class="grid division-in-element-gap">
      {isDeleting() ? (
        <Loading />
      ) : (
        <>
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
              <button
                class="button-link-primary-big"
                onclick={() => setEditAddress(true)}
              >
                {Button_edit_text}
              </button>

              <button
                class="button-link-error-dark-big"
                innerHTML={trashCanIcon.innerHTML}
                onclick={deleteAddress}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
