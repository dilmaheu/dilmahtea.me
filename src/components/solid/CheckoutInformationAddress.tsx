import type { Address } from "@solid/Address";

import { createEffect, createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";
import { addresses } from "@store/signals/addresses";

export default function CheckoutInformationAddress({
  page,
  recurData,
  userAccountRecurData,
}) {
  const [displayTags, setDisplayTags] = createSignal(false),
    [selectedTag, setSelectedTag] = createSignal<string>();

  onMount(() => {
    if (window.cookies.isAuthenticated === "true") {
      setDisplayTags(true);
    }
  });

  createEffect(() => {
    const { default_delivery_address } = user();

    if (default_delivery_address.constructor === Object) {
      setSelectedTag(default_delivery_address.tag);
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
          selectedAddress = addresses()?.find(
            ({ tag }) => tag === selectedTag(),
          );

        return (
          <>
            {shouldDisplayTags && (
              <AddressTags
                action="checkout"
                address={selectedAddress}
                userAccountRecurData={userAccountRecurData}
                setSelectedTag={setSelectedTag}
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
