import { createEffect, createSignal, onMount } from "solid-js";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";
import { showAddressForm } from "@signals/showAddressForm";

import AddressTags from "@solid/AddressTags";
import EditAddressForm from "@solid/EditAddressForm";
import SolidNotification from "@solid/SolidNotification";

import addressDetailsKeys from "@utils/shared/addressDetailsKeys";
import handleAPIResponseBase from "@utils/handleAPIResponseBase";

export default function CheckoutInformationForm({
  recurData,
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
    } else {
      const defaultAddress =
        user()[
          isBilling ? "default_billing_address" : "default_delivery_address"
        ];

      if (defaultAddress.constructor === Object) {
        setSelectedTag(defaultAddress.tag);
      }
    }
  });

  createEffect(() => {
    setNotification(null);

    const checkoutInfoForm = document.getElementById(
        "checkout-info-form",
      ) as HTMLFormElement,
      paymentInfoForm = document.getElementById(
        "payment-info-form",
      ) as HTMLFormElement;

    const form = isBilling ? paymentInfoForm : checkoutInfoForm;

    form?.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(event.currentTarget));

      if (!isBilling) {
        const { street, city, country } = formData,
          contactInfo = {
            ...formData,
            delivery_address: [street, city, country].join(", "),
          };

        if (selectedTag()) contactInfo.address_tag = selectedTag();

        localStorage.setItem("checkout-info", JSON.stringify(contactInfo));
      }

      const selectedAddress = addresses()?.find(
        ({ tag }) => tag === selectedTag(),
      );

      const addressData = {} as Record<string, string>;

      addressDetailsKeys.forEach((key) => {
        addressData[key] = formData[isBilling ? `billing_${key}` : key];
      });

      addressData.tag = formData.tag;

      if (selectedAddress) {
        addressData.id = selectedAddress.id;

        if (
          addressData.first_name === selectedAddress.first_name &&
          addressData.last_name === selectedAddress.last_name &&
          addressData.street === selectedAddress.street &&
          addressData.city === selectedAddress.city &&
          addressData.country === selectedAddress.country &&
          addressData.postal_code === selectedAddress.postal_code
        ) {
          !isBilling && form.submit();

          return;
        }
      } else if (window.cookies.isAuthenticated !== "true") {
        !isBilling && form.submit();

        return;
      }

      fetch("/api/addresses", {
        method: selectedAddress ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }).then((response) =>
        handleAPIResponseBase(response, notification, setNotification, {
          onSuccess: () => {
            !isBilling && form.submit();
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
                    recurData={recurData}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    showMoreAddresses={showMoreAddresses}
                    setShowMoreAddresses={setShowMoreAddresses}
                    shouldShowCustomTagInput={shouldShowCustomTagInput}
                  />
                )}
              </>
            )}

            {addresses()?.length > 0 && (
              <EditAddressForm
                action="checkout"
                address={selectedAddress}
                recurData={recurData}
                isBilling={isBilling}
              />
            )}
          </>
        );
      }}

      {!(addresses()?.length > 0) && (
        <EditAddressForm
          action="checkout"
          address={undefined}
          recurData={recurData}
          isBilling={isBilling}
        />
      )}
    </>
  );
}
