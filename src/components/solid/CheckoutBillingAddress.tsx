import { createEffect } from "solid-js";

import { user } from "@signals/user";
import { showAddressForm, setShowAddressForm } from "@signals/showAddressForm";

import CheckoutInformationForm from "@solid/CheckoutInformationForm";

export default function CheckoutBillingAddress({
  page,
  recurData,
  notificationIcons,
}) {
  function handleShowAddressForm() {
    setShowAddressForm(!showAddressForm());
  }

  createEffect(() => {
    if (
      user().default_delivery_address.id !== user().default_billing_address.id
    ) {
      setShowAddressForm(true);
    }
  });

  return (
    <section class="division-gap grid">
      <h2 class="recoleta text-h2 text-primary">{page.Block_title}</h2>

      <div role="list" class="division-in-element-gap flex flex-col">
        <div class="flex">
          <label role="listitem" class="division-in-element-gap radio-input">
            <input
              type="radio"
              name="billing_address"
              value=""
              id="same-as-shipping"
              checked={!showAddressForm()}
              onchange={handleShowAddressForm}
            />

            <span class="radio-input-text">
              {page.Radio_button_text_same_as_shipping_address}
            </span>
          </label>
        </div>

        <div class="flex">
          <label role="listitem" class="division-in-element-gap radio-input">
            <input
              type="radio"
              name="billing_address"
              value=""
              id="different-than-shipping"
              checked={showAddressForm()}
              onchange={handleShowAddressForm}
            />

            <span class="radio-input-text">
              {page.Radio_button_text_use_different_billing_address}
            </span>
          </label>
        </div>
      </div>

      <CheckoutInformationForm
        recurData={recurData}
        notificationIcons={notificationIcons}
        isBilling={true}
      />
    </section>
  );
}
