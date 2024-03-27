import type { Setter } from "solid-js";
import type { Address } from "@solid/Address";
import type { handleAPIResponseType } from "@utils/handleAPIResponseBase";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";

import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";

declare interface Props {
  action: "add" | "update";
  address?: Address;
  recurData: any;
  showForm: Setter<any>;
  handleAPIResponse: handleAPIResponseType;
  setNotification: Setter<any>;
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
  showForm,
  handleAPIResponse,
  setNotification,
  scroll,
  tickCheckboxes,
}: Props) {
  const {
    text_add,
    text_update,
    text_cancel,
    Checkbox_set_default_delivery_address_text,
    Checkbox_set_default_billing_address_text,
  } = recurData;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    setNotification(null);

    const formData = Object.fromEntries(
      // @ts-ignore
      new FormData(event.currentTarget as HTMLFormElement).entries(),
    );

    for (const key in formData) {
      if (formData[key] === "true") {
        formData[key] = true;
      }
    }

    if (action === "update") {
      formData.id = address.id;
    }

    fetch("/api/addresses", {
      method: action === "add" ? "POST" : "PUT",
      body: JSON.stringify(formData),
    }).then((response) =>
      handleAPIResponse(response, {
        onSuccess: () => {
          const redirectURL = new URL(location.href);

          redirectURL.searchParams.set("updated_user_info", "true");
          redirectURL.searchParams.set("info", "address");
          redirectURL.searchParams.set("action", action);

          location.href = redirectURL.toString();
        },
      }),
    );
  }

  return (
    <form class="tiled-form division-gap grid" onsubmit={handleSubmit}>
      <AddressTags action={action} address={address} recurData={recurData} />

      <EditAddressForm
        action={action}
        address={address}
        recurData={recurData}
      />

      {() => {
        const shouldShowCheckboxes =
          addresses()?.length > (action === "add" ? 0 : 1);

        const isDefaultDeliveryAddress =
            address && user().default_delivery_address?.id === address.id,
          isDefaultBillingAddress =
            address && user().default_billing_address?.id === address.id;

        if (shouldShowCheckboxes) {
          return (
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
                        isDefaultDeliveryAddress ||
                        false
                      }
                      disabled={isDefaultDeliveryAddress || false}
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
                        isDefaultBillingAddress ||
                        false
                      }
                      disabled={isDefaultBillingAddress || false}
                    />
                    <span class="checkbox-primary"></span>
                  </span>
                  {Checkbox_set_default_billing_address_text}
                </label>
              </div>
            </div>
          );
        }
      }}

      <div class="form-button-container">
        <div class="flex w-full sm:w-1/2 sm:order-2">
          <button type="submit" class="button-primary w-full">
            {action === "add" ? text_add : text_update}
          </button>
        </div>

        <div class="flex">
          <button
            type="button"
            class="button-link-error-dark"
            onclick={() => {
              setNotification(null);

              if (scroll) scroll();

              showForm(false);
            }}
          >
            {text_cancel}
          </button>
        </div>
      </div>
    </form>
  );
}
