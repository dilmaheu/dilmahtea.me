import type { Address as AddressType } from "@solid/Address";

import { createEffect, createSignal } from "solid-js";

import { user } from "@signals/user";
import { addresses } from "@signals/addresses";

import InfoUnit from "@solid/InfoUnit";
import EditAddress from "@solid/EditAddress";
import DefaultAddress from "@solid/DefaultAddress";
import SolidNotification from "@solid/SolidNotification";

export default function UserInfo({
  plusIcon,
  page,
  verificationHref,
  userAccountAddressURL,
  notificationIcons,
  recurData,
}) {
  const [notification, setNotification] = createSignal(null),
    [editAddress, setEditAddress] = createSignal<{
      action: "add" | "update";
      address?: AddressType;
      tickCheckboxes?: {
        default_delivery_address?: boolean;
        default_billing_address?: boolean;
      };
    }>();

  const {
    Title,
    Personal_information: {
      Label_username,
      Label_phone,
      Label_email,
      Label_delivery_address,
      Label_billing_address,
      user_info_update_success_notification,
      display_name_update_success_notification_label,
      email_update_success_notification_label,
      phone_number_update_success_notification_label,
    },
  } = page;

  const {
    text_save,
    text_view_more_address_singular,
    text_view_all_addresses,
    text_add_new_address,
    text_more_address,
    text_default_delivery_address,
    text_default_billing_address,
    Notification_added_address,
    Notification_updated_address,
    Notification_deleted_address,
  } = recurData;

  function scrollToAddNewAddress(after: boolean = true) {
    const header = document.querySelector("header"),
      addNewAddressBtn = document.querySelector("#add-new-address-btn");

    const headerRect = header.getBoundingClientRect(),
      addNewAddressBtnRect = addNewAddressBtn.getBoundingClientRect();

    window.scrollTo({
      top:
        window.scrollY +
        addNewAddressBtnRect.top +
        (after ? addNewAddressBtnRect.height : -20) -
        headerRect.height,
    });
  }

  createEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("updated_user_info") === "true") {
      const info = searchParams.get("info"),
        action = searchParams.get("action"),
        InfoLabels = {
          display_name: display_name_update_success_notification_label,
          email: email_update_success_notification_label,
          phone: phone_number_update_success_notification_label,
        };

      const notificationMessage =
        info === "address"
          ? action === "add"
            ? Notification_added_address
            : action === "update"
              ? Notification_updated_address
              : action === "delete"
                ? Notification_deleted_address
                : null
          : InfoLabels[info]
            ? user_info_update_success_notification.replace(
                "<info_label>",
                InfoLabels[info],
              )
            : null;

      if (notificationMessage) {
        setNotification({
          type: "success",
          message: notificationMessage,
        });
      }

      setTimeout(() => {
        // skip if an error notification is set within 7 seconds
        if (notification().type === "success") {
          setNotification(null);
        }
      }, 7000);
    }
  });

  return (
    <>
      <h2 id="personal-information" class="tiled-title text-h2">
        {Title.replace("<username>", user().display_name)}
      </h2>

      <div class="tiled-div">
        <div class="grid division-gap">
          <div class="grid division-in-gap">
            <SolidNotification
              notification={notification}
              notificationIcons={notificationIcons}
              bottomMargin={true}
            />

            <InfoUnit
              label={Label_username}
              type="text"
              property="display_name"
              verificationHref={verificationHref}
              recurData={recurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-lightest" />

            <InfoUnit
              label={Label_phone}
              type="tel"
              property="phone"
              verificationHref={verificationHref}
              recurData={recurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-lightest" />

            <InfoUnit
              label={Label_email}
              type="email"
              property="email"
              verificationHref={verificationHref}
              recurData={recurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-lightest" />

            {() => {
              const default_delivery_address = user().default_delivery_address,
                default_billing_address = user().default_billing_address;

              return (
                <>
                  <DefaultAddress
                    label={Label_delivery_address}
                    address={default_delivery_address}
                    recurData={recurData}
                    setEditAddress={setEditAddress}
                    scrollToAddNewAddress={scrollToAddNewAddress}
                  />

                  <div class="h-px bg-primary-lightest" />

                  <DefaultAddress
                    label={Label_billing_address}
                    address={default_billing_address}
                    recurData={recurData}
                    setEditAddress={setEditAddress}
                    scrollToAddNewAddress={scrollToAddNewAddress}
                  />
                </>
              );
            }}

            <div class="h-px bg-primary-lightest" />

            <div class="flex w-full">
              <button
                id="add-new-address-btn"
                class="button-primary"
                onclick={() => {
                  scrollToAddNewAddress();

                  setEditAddress({ action: "add" });
                }}
              >
                {plusIcon}
                {text_add_new_address}
              </button>
            </div>
          </div>

          {() => {
            const editAddressInfo = editAddress();

            return (
              editAddressInfo && (
                <EditAddress
                  action={editAddress().action}
                  address={editAddress().address}
                  recurData={recurData}
                  notificationIcons={notificationIcons}
                  showForm={setEditAddress}
                  scroll={() => scrollToAddNewAddress(false)}
                  tickCheckboxes={editAddress().tickCheckboxes}
                />
              )
            );
          }}

          {() => {
            const { default_delivery_address, default_billing_address } =
              user();

            const shouldDisplayLink =
              default_delivery_address?.id &&
              addresses()?.length -
                (default_delivery_address.id === default_billing_address.id
                  ? 1
                  : 2) >
                0;

            if (shouldDisplayLink) {
              return (
                <div class="w-full flex justify-center">
                  <a
                    href={userAccountAddressURL}
                    id="more-address"
                    class="button-link-primary"
                  >
                    {text_view_all_addresses.replace(
                      "<number>",
                      addresses().length,
                    )}
                  </a>
                </div>
              );
            }
          }}
        </div>
      </div>

      {/* {Social_media && (
        <div class="tiled-div">
          <div>
            <div class="recoleta text-2xl leading-[110%] text-black">
              {Social_media_title}
            </div>

            <div class="grid sm:grid-cols-[repeat(auto-fit,minmax(0,180px))] gap-[25px] mt-[15px]">
              <div
                class:list={[
                  "grid py-4 px-[18px] justify-items-center justify-center",
                  " items-center border-2 border-lightgreen2 rounded-[30px]",
                ]}
              >
                <div class="grid gap-1 justify-items-center">
                  <div class="w-[60px] h-[60px] p-[5px]">
                    <img
                      class="w-full h-full"
                      src={await localizeCMSImage(fb_icon.data.attributes.url)}
                      alt={fb_icon.data.attributes.alternativeText}
                    />
                  </div>

                  <div class="text-lg">Marverick_John</div>

                  <div class="flex items-center gap-[5px] text-sm text-[#3C994E] font-bold">
                    {text_connected}
                    <span class="w-4 h-4 my-auto">
                      <img class="w-full h-full" {...success_notification} />
                    </span>
                  </div>
                </div>

                <div
                  class:list={[
                    "flex py-1 px-5 mt-3 text-primary leading-[150%]",
                    "border border-primary rounded-[40px] cursor-pointer",
                  ]}
                >
                  {Button_remove_text}
                </div>
              </div>

              <div
                class:list={[
                  "grid py-4 px-[18px] justify-items-center justify-center",
                  " items-center border-2 border-lightgray rounded-[30px] cursor-pointer",
                ]}
              >
                <div class="grid gap-1 justify-items-center">
                  <div class="w-[60px] h-[60px] p-[5px]">
                    <img
                      class="w-full h-full"
                      src={await localizeCMSImage(g_icon.data.attributes.url)}
                      alt={g_icon.data.attributes.alternativeText}
                    />
                  </div>

                  <div class="text-sm">{text_not_connected}</div>
                </div>
              </div>

              <div
                class:list={[
                  "grid py-4 px-[18px] justify-items-center justify-center",
                  " items-center border-2 border-lightgray rounded-[30px] cursor-pointer",
                ]}
              >
                <div class="grid gap-1 justify-items-center">
                  <div class="w-[60px] h-[60px] p-[5px]">
                    <img
                      class="w-full h-full"
                      src={await localizeCMSImage(
                        twitter_icon.data.attributes.url,
                      )}
                      alt={twitter_icon.data.attributes.alternativeText}
                    />
                  </div>

                  <div class="text-sm">{text_not_connected}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
