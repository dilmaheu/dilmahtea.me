import type { Setter } from "solid-js";
import type { handleAPIResponseType } from "@utils/handleAPIResponseBase";

import { createSignal } from "solid-js";

import { user } from "@signals/user";
import Loading from "@solid/Loading";
import EditIcon from "@solid/EditIcon";

export interface Address {
  id: string;
  exact_account_guid: string;
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
  recurData: Record<string, any>;
  setEditAddress: Setter<any>;
  scroll?: () => void;
  isMyProfile?: boolean;
  trashCanIcon?: HTMLElement;
  handleAPIResponse: handleAPIResponseType;
}

export default function Address({
  address,
  recurData,
  setEditAddress,
  scroll,
  isMyProfile,
  trashCanIcon,
  handleAPIResponse,
}: Props) {
  const [isDeleting, setIsDeleting] = createSignal(false);

  const { id, tag, first_name, last_name, street, city, postal_code, country } =
    address;

  const {
    label_auto_tag,
    text_default_delivery_address,
    text_default_billing_address,
    Tag_default_text,
  } = recurData;

  const fullName = first_name + " " + last_name,
    fullAddress = [street, city, postal_code, country].join(", ");

  function deleteAddress() {
    setIsDeleting(true);

    fetch("/api/addresses/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((response) =>
      handleAPIResponse(response, {
        onError: () => setIsDeleting(false),
        onSuccess: () => {
          const redirectURL = new URL(location.href);

          redirectURL.searchParams.set("updated_user_info", "true");
          redirectURL.searchParams.set("info", "address");
          redirectURL.searchParams.set("action", "delete");

          location.href = redirectURL.toString();
        },
      }),
    );
  }

  return (
    <div class="grid division-in-element-gap">
      {isDeleting() ? (
        <Loading />
      ) : (
        <>
          <div class="quick-info-black-light">
            <div class="quick-info-item">
              {() => {
                const defaultDeliveryAddressId =
                    user().default_delivery_address?.id,
                  defaultBillingAddressId = user().default_billing_address?.id,
                  isDefaultDeliveryAddress = defaultDeliveryAddressId === id,
                  isDefaultBillingAddress = defaultBillingAddressId === id;

                return (
                  !isMyProfile &&
                  (isDefaultDeliveryAddress || isDefaultBillingAddress) && (
                    <>
                      <div class="info-tag-button-primary">
                        {defaultDeliveryAddressId === defaultBillingAddressId
                          ? Tag_default_text
                          : isDefaultDeliveryAddress
                            ? text_default_delivery_address
                            : text_default_billing_address}
                      </div>

                      <div>&#x2022;</div>
                    </>
                  )
                );
              }}

              <div>{fullName}</div>
              <div>&#x2022;</div>
              <div class="info-tag-button-default">
                {!tag.startsWith("Address #")
                  ? tag
                  : label_auto_tag + tag.split(" "[1])}
              </div>
            </div>
          </div>

          <div class="flex items-center division-in-element-gap justify-between">
            <div class="input-text-large-static">{fullAddress}</div>

            <div class="flex division-gap">
              <button
                class="button-link-primary-large"
                onclick={() => {
                  if (!isMyProfile) {
                    setEditAddress(true);
                  } else {
                    scroll();

                    setEditAddress({
                      action: "update",
                      address,
                    });
                  }
                }}
              >
                <EditIcon />
              </button>

              {() => {
                const isDefaultDeliveryAddress =
                  user().default_delivery_address?.id === id;

                return (
                  !isMyProfile &&
                  !isDefaultDeliveryAddress && (
                    <button
                      class="button-link-error-dark-large"
                      innerHTML={trashCanIcon.innerHTML}
                      onclick={deleteAddress}
                    />
                  )
                );
              }}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
