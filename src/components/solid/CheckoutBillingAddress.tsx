import CheckoutInformationForm from "@solid/CheckoutInformationForm";

import { showAddressForm, setShowAddressForm } from "@signals/showAddressForm";

export default function CheckoutBillingAddress({
  page,
  recurData,
  userAccountRecurData,
  notificationIcons,
}) {
  function handleShowAddressForm() {
    setShowAddressForm(!showAddressForm());
  }

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
              checked
              onchange={handleShowAddressForm}
            />

            <div class="radio-input-text">
              {page.Radio_button_text_same_as_shipping_address}
            </div>
          </label>
        </div>

        <div class="flex">
          <label role="listitem" class="division-in-element-gap radio-input">
            <input
              type="radio"
              name="billing_address"
              value=""
              id="different-than-shipping"
              onchange={handleShowAddressForm}
            />

            <div class="text-b5 text-black-light flex">
              {page.Radio_button_text_use_different_billing_address}
            </div>
          </label>
        </div>
      </div>

      <CheckoutInformationForm
        recurData={recurData}
        userAccountRecurData={userAccountRecurData}
        notificationIcons={notificationIcons}
        isBilling={true}
      />
    </section>
  );
}
