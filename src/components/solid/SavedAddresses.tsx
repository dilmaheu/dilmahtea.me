import { For, createEffect, createSignal } from "solid-js";

import Loading from "@solid/Loading";
import Address from "@solid/Address";
import EditAddress from "@solid/EditAddress";
import DashboardNotification from "@solid/DashboardNotification";

import handleAPIResponseBase from "@utils/handleAPIResponseBase";

export default function SavedAddresses({
  plusIcon,
  trashCanIcon,
  recurData,
  recurringImages,
  userAccountRecurData,
}) {
  const [addresses, setAddresses] = createSignal([]),
    [isLoading, setIsLoading] = createSignal(true),
    [notification, setNotification] = createSignal(null),
    [showMoreAddresses, setShowMoreAddresses] = createSignal(false),
    [displayNewAddressForm, setShowNewAddressForm] = createSignal(false);

  createEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json<any[]>())
      .then((addresses) => {
        setIsLoading(false);
        setAddresses(addresses);
      });
  });

  const handleAPIResponse = (response: Response, callback?: () => void) =>
    handleAPIResponseBase(response, notification, setNotification, callback);

  const {
    Label_tag_text,
    Tag_default_text: tag_default,
    Tag_others_text: tag_others,
    Tag_others_placeholder_text: tag_placeholder_others,
    Tag_suggestions,
    Button_add_text,
    Button_edit_text,
    Button_update_text,
    Button_add_new_address_text,
    Button_make_default_text,
    Button_save_text,
    Button_cancel_text,
    Tag_default_text,
    text_saved_Addresses,
    text_more_address,
    text_hide_more_address,
    Input_label_first_name,
    Input_placeholder_first_name,
    Input_label_last_name,
    Input_placeholder_last_name,
    Input_label_country,
    Input_placeholder_country,
    Input_label_city,
    Input_placeholder_city,
    Input_label_street,
    Input_placeholder_street,
    Input_label_postal_code,
    Input_placeholder_postal_code,
    Checkbox_set_default_delivery_address_text,
    Checkbox_set_default_billing_address_text,
    Checkbox_add_delivery_address_text,
    Checkbox_add_billing_address_text,
    text_content,
    text_default_delivery_address,
    text_default_billing_address,
  } = userAccountRecurData;

  return (
    <div class="dashboard-sec">
      <div class="grid division-gap">
        <DashboardNotification
          notification={notification}
          recurringImages={recurringImages}
        />

        <div class="flex flex-wrap items-center justify-between w-full">
          <div class="recoleta text-h5 font-bold text-black">
            {text_saved_Addresses}
          </div>

          <button
            class="button-primary"
            onclick={() => setShowNewAddressForm(true)}
          >
            {plusIcon}
            {Button_add_new_address_text}
          </button>
        </div>

        {displayNewAddressForm() && (
          <EditAddress
            action="add"
            recurData={recurData}
            userAccountRecurData={userAccountRecurData}
            showForm={setShowNewAddressForm}
            handleAPIResponse={handleAPIResponse}
          />
        )}

        {isLoading() && <Loading />}

        {addresses().length > 0 && (
          <>
            <div class="grid division-in-gap">
              <For
                each={addresses().slice(
                  0,
                  showMoreAddresses() ? addresses().length : 3,
                )}
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
                          userAccountRecurData={userAccountRecurData}
                          showForm={setEditAddress}
                          handleAPIResponse={handleAPIResponse}
                        />
                      ) : (
                        <Address
                          address={address}
                          trashCanIcon={trashCanIcon}
                          text_default_delivery_address={
                            text_default_delivery_address
                          }
                          text_default_billing_address={
                            text_default_billing_address
                          }
                          Button_edit_text={Button_edit_text}
                          setEditAddress={setEditAddress}
                          handleAPIResponse={handleAPIResponse}
                        />
                      )}

                      {i() <
                        (showMoreAddresses() ? addresses().length : 3) - 1 && (
                        <div class="h-px bg-primary-light"></div>
                      )}
                    </>
                  );
                }}
              </For>
            </div>

            {addresses().length > 3 && (
              <button
                onclick={() => setShowMoreAddresses(!showMoreAddresses())}
                class="horizontal-toggle-button-primary w-full flex justify-center"
              >
                <span>
                  {(!showMoreAddresses()
                    ? text_more_address
                    : text_hide_more_address
                  ).replaceAll("<number>", addresses().length - 3)}
                </span>

                {!showMoreAddresses() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 8"
                    class="toggle-button-arrow fill-primary"
                  >
                    <path d="M.3.3A1.1,1.1,0,0,1,1.1,0a.9.9,0,0,1,.7.3L7,5.5,12.2.3A1.1,1.1,0,0,1,13,0a.9.9,0,0,1,.7.3A.9.9,0,0,1,14,1a1.1,1.1,0,0,1-.3.8L7.8,7.7A1.1,1.1,0,0,1,7,8a.9.9,0,0,1-.7-.3L.3,1.8A1.1,1.1,0,0,1,0,1,.9.9,0,0,1,.3.3Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 8"
                    class="toggle-button-arrow fill-primary"
                  >
                    <path d="M13.7,7.7a1.1,1.1,0,0,1-.8.3.9.9,0,0,1-.7-.3L7,2.5,1.8,7.7A1.1,1.1,0,0,1,1,8a.9.9,0,0,1-.7-.3A.9.9,0,0,1,0,7a1.1,1.1,0,0,1,.3-.8L6.2.3A1.1,1.1,0,0,1,7,0a.9.9,0,0,1,.7.3l6,5.9A1.1,1.1,0,0,1,14,7,.9.9,0,0,1,13.7,7.7Z" />
                  </svg>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
