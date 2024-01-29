import type { Address } from "@solid/Address";

import { createEffect, createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";

export default function CheckoutInformationAddress({
  page,
  recurData,
  userAccountRecurData,
}) {
  const [displayTags, setDisplayTags] = createSignal(false),
    [address, setAddress] = createSignal<Address>();

  onMount(() => {
    if (window.cookies.isAuthenticated !== "true") {
      setDisplayTags(true);
    }
  });

  createEffect(() => {
    const { default_delivery_address } = user();

    if (default_delivery_address.constructor === Object) {
      setAddress(default_delivery_address);
    }
  });

  return (
    <div
      role="form"
      aria-label={page.text_shipping_address}
      id="shipping-address"
      class="division-gap grid"
    >
      <h2 class="recoleta text-h2 text-primary">
        {page.text_shipping_address}
      </h2>

      {() => {
        const shouldDisplayTags = displayTags(),
          selectedAddress = address();

        return (
          <>
            {shouldDisplayTags && (
              <AddressTags
                action="checkout"
                address={selectedAddress}
                userAccountRecurData={userAccountRecurData}
              />
            )}

            <EditAddressForm
              action="checkout"
              address={selectedAddress}
              recurData={recurData}
            />
          </>
        );
      }}
    </div>
  );
}
