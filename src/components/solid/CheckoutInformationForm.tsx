import { createEffect, createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";
import { showAddressForm } from "@signals/showAddressForm";

import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";
import SolidNotification from "@solid/SolidNotification";

import handleAPIResponseBase from "@utils/handleAPIResponseBase";

export default function CheckoutInformationForm({
  recurData,
  userAccountRecurData,
  notificationIcons,
  isBilling = false,
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
    if (!isBilling && window.checkoutInfo.address_tag) {
      setSelectedTag(window.checkoutInfo.address_tag);
    }

    const defaultAddress =
      user()[
        isBilling ? "default_billing_address" : "default_delivery_address"
      ];

    if (defaultAddress.constructor === Object) {
      setSelectedTag(defaultAddress.tag);
    }
  });

  createEffect(() => {
    setNotification(null);

    const checkoutInfoForm = document.getElementById(
      "checkout-info-form",
    ) as HTMLFormElement;

    checkoutInfoForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(checkoutInfoForm)),
        { street, city, country } = formData,
        contactInfo = {
          ...formData,
          delivery_address: [street, city, country].join(", "),
        };

      if (selectedTag()) contactInfo.address_tag = selectedTag();

      localStorage.setItem("checkout-info", JSON.stringify(contactInfo));

      const selectedAddress = addresses()?.find(
        ({ tag }) => tag === selectedTag(),
      );

      if (selectedAddress) {
        formData.id = selectedAddress.id;

        if (
          formData.first_name === selectedAddress.first_name &&
          formData.last_name === selectedAddress.last_name &&
          formData.street === selectedAddress.street &&
          formData.city === selectedAddress.city &&
          formData.country === selectedAddress.country &&
          formData.postal_code === selectedAddress.postal_code
        ) {
          location.href = checkoutInfoForm.action;

          return;
        }
      } else if (window.cookies.isAuthenticated !== "true") {
        location.href = checkoutInfoForm.action;
      }

      fetch("/api/addresses", {
        method: selectedAddress ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) =>
        handleAPIResponseBase(response, notification, setNotification, {
          onSuccess: () => {
            location.href = checkoutInfoForm.action;
          },
        }),
      );
    });
  });

  return (
    <>
      {() => {
        const shouldDisplayTags = displayTags(),
          selectedAddress = addresses()?.find(
            ({ tag }) => tag === selectedTag(),
          );

        const shouldShowCustomTagInput = selectedTag() === null;

        return (
          <>
            {(!isBilling || showAddressForm()) && (
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
                    shouldShowCustomTagInput={shouldShowCustomTagInput}
                  />
                )}
              </>
            )}

            <EditAddressForm
              action="checkout"
              address={selectedAddress}
              recurData={recurData}
              isBilling={isBilling}
            />
          </>
        );
      }}
    </>
  );
}
