import { createEffect, createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";

import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";
import SolidNotification from "@solid/SolidNotification";

export default function CheckoutInformationForm({
  recurData,
  userAccountRecurData,
  text_select_or_create_tag,
  notificationIcons,
}) {
  const [notification, setNotification] = createSignal(null),
    [displayTags, setDisplayTags] = createSignal(false),
    [selectedTag, setSelectedTag] = createSignal<string>(),
    [showMoreAddresses, setShowMoreAddresses] = createSignal(false);

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
    <>
      {() => {
        const shouldDisplayTags = displayTags(),
          selectedAddress = addresses()?.find(
            ({ tag }) => tag === selectedTag(),
          );

        return (
          <>
            <SolidNotification
              notification={notification}
              notificationIcons={notificationIcons}
              bordered={false}
            />

            {shouldDisplayTags && (
              <AddressTags
                action="checkout"
                address={selectedAddress}
                userAccountRecurData={userAccountRecurData}
                setSelectedTag={setSelectedTag}
                showMoreAddresses={showMoreAddresses}
                setShowMoreAddresses={setShowMoreAddresses}
                text_select_or_create_tag={text_select_or_create_tag}
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
    </>
  );
}
