import type { handleAPIResponseType } from "@utils/handleAPIResponseBase";

import { For, createEffect, createSignal } from "solid-js";

import Loading from "@solid/Loading";
import Address from "@solid/Address";
import EditAddress from "@solid/EditAddress";

import { addresses } from "@signals/addresses";

import handleAPIResponseBase from "@utils/handleAPIResponseBase";

export default function SavedAddresses({
  plusIcon,
  trashCanIcon,
  recurData,
  notificationIcons,
}) {
  const [isLoading, setIsLoading] = createSignal(true),
    [notification, setNotification] = createSignal(null),
    [showMoreAddresses, setShowMoreAddresses] = createSignal(false),
    [displayNewAddressForm, setShowNewAddressForm] = createSignal(false);

  const handleAPIResponse: handleAPIResponseType = (response, callbacks) =>
    handleAPIResponseBase(response, notification, setNotification, callbacks);

  createEffect(() => {
    if (Array.isArray(addresses())) {
      setIsLoading(false);
    }
  });

  const {
    Label_tag_text,
    Tag_default_text: tag_default,
    Tag_add_text: tag_others,
    Tag_add_placeholder: tag_placeholder_others,
    Tag_suggestions,
    text_add,
    text_add_new_address,
    text_set_default,
    text_save,
    text_cancel,
    Tag_default_text,
    text_saved_Addresses,
    text_more_address,
    text_hide_more_address,
    text_first_name,
    first_name_placeholder,
    text_last_name,
    last_name_placeholder,
    text_country,
    country_placeholder,
    text_city,
    city_placeholder,
    text_street,
    street_placeholder,
    text_postal_code,
    postal_code_placeholder,
    Checkbox_set_default_delivery_address_text,
    Checkbox_set_default_billing_address_text,
    text_content,
    text_default_delivery_address,
    text_default_billing_address,
    Notification_added_address,
    Notification_updated_address,
    Notification_deleted_address,
  } = recurData;

  createEffect(() => {
    const { updated_user_info, info, action } = Object.fromEntries(
      new URLSearchParams(location.search),
    );

    if (
      updated_user_info === "true" &&
      info === "address" &&
      ["add", "update", "delete"].includes(action)
    ) {
      const notificationMessage =
        action === "add"
          ? Notification_added_address
          : action === "update"
            ? Notification_updated_address
            : Notification_deleted_address;

      setNotification({
        type: "success",
        message: notificationMessage,
      });

      setTimeout(() => {
        // skip if an error notification is set within 7 seconds
        if (notification().type === "success") {
          setNotification(null);
        }
      }, 7000);
    }
  });

  return (
    <div class="tiled-div">
      <div class="grid division-gap">
        <div class="flex flex-wrap items-center justify-between w-full">
          <div class="text-h5 font-bold text-black">{text_saved_Addresses}</div>

          <button
            class="button-primary"
            onclick={() => setShowNewAddressForm(true)}
          >
            {plusIcon}
            {text_add_new_address}
          </button>
        </div>

        {displayNewAddressForm() && (
          <EditAddress
            action="add"
            recurData={recurData}
            notificationIcons={notificationIcons}
            showForm={setShowNewAddressForm}
          />
        )}

        <div class="h-px bg-primary-lightest"></div>

        {isLoading() && <Loading />}

        {addresses()?.length > 0 && (
          <>
            <div class="grid division-in-gap">
              <For
                each={addresses().slice(0, showMoreAddresses() ? Infinity : 3)}
              >
                {(address, i) => {
                  const [editAddress, setEditAddress] = createSignal(false);

                  return (
                    <>
                      {editAddress() ? (
                        <EditAddress
                          action="update"
                          address={address}
                          recurData={recurData}
                          notificationIcons={notificationIcons}
                          showForm={setEditAddress}
                        />
                      ) : (
                        <Address
                          address={address}
                          recurData={recurData}
                          setEditAddress={setEditAddress}
                          trashCanIcon={trashCanIcon}
                          handleAPIResponse={handleAPIResponse}
                        />
                      )}

                      {i() <
                        (showMoreAddresses() ? addresses().length : 3) - 1 && (
                        <div class="h-px bg-primary-lightest"></div>
                      )}
                    </>
                  );
                }}
              </For>
            </div>

            {addresses().length > 3 && (
              <button
                class="horizontal-toggle-button-primary mx-auto"
                onClick={() => {
                  setShowMoreAddresses(!showMoreAddresses());
                }}
              >
                <span>
                  {(!showMoreAddresses()
                    ? text_more_address
                    : text_hide_more_address
                  ).replaceAll("<number>", addresses().length - 3)}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 8"
                  class={
                    "toggle-button-arrow fill-primary" +
                    (showMoreAddresses() ? " rotate-180" : "")
                  }
                >
                  <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
