import { createEffect, createSignal } from "solid-js";

import { user } from "@signals/user";

import Address from "@solid/Address";
import InfoUnit from "@solid/InfoUnit";
import DashboardNotification from "@solid/DashboardNotification";

export default function UserInfo({
  plusIcon,
  page,
  verificationHref,
  userAccountAddressURL,
  recurringImages,
  userAccountRecurData,
}) {
  const [notification, setNotification] = createSignal(null),
    [editAddress, setEditAddress] = createSignal(false);

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
    Button_add_text,
    Button_edit_text,
    Button_update_text,
    Button_view_more_address_text_singular,
    Button_view_more_address_text,
    Button_add_new_address_text,
    Address_tag,
    text_more_address,
    text_default_delivery_address,
    text_default_billing_address,
  } = userAccountRecurData;

  createEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("updated_user_info") === "true") {
      const info = searchParams.get("info"),
        InfoLabels = {
          display_name: display_name_update_success_notification_label,
          email: email_update_success_notification_label,
          phone: phone_number_update_success_notification_label,
        };

      if (InfoLabels[info]) {
        setNotification({
          type: "success",
          message: user_info_update_success_notification.replace(
            "<info_label>",
            InfoLabels[info],
          ),
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
      <h2 id="personal-information" class="dashboard-sec-title recoleta">
        {Title.replace("<username>", user().display_name)}
      </h2>

      <div class="dashboard-sec">
        <div class="grid division-gap">
          <div class="grid division-in-gap">
            <DashboardNotification
              notification={notification}
              recurringImages={recurringImages}
            />

            <InfoUnit
              label={Label_username}
              type="text"
              property="display_name"
              verificationHref={verificationHref}
              userAccountRecurData={userAccountRecurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-light" />

            <InfoUnit
              label={Label_phone}
              type="tel"
              property="phone"
              verificationHref={verificationHref}
              userAccountRecurData={userAccountRecurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-light" />

            <InfoUnit
              label={Label_email}
              type="email"
              property="email"
              verificationHref={verificationHref}
              userAccountRecurData={userAccountRecurData}
              setNotification={setNotification}
            />

            <div class="h-px bg-primary-light" />

            <div class="grid division-in-element-gap">
              <div class="input-label">{Label_delivery_address}</div>

              {user().default_delivery_address === "…" ||
              user().default_delivery_address === "N/A" ? (
                <div class="input-text-large-static">
                  {user().default_delivery_address}
                </div>
              ) : (
                <Address
                  address={user().default_delivery_address}
                  userAccountRecurData={userAccountRecurData}
                  setEditAddress={setEditAddress}
                  isMyProfile={true}
                />
              )}
            </div>

            <div class="h-px bg-primary-light" />

            <div class="grid division-in-element-gap">
              <div class="input-label">{Label_billing_address}</div>

              {["…", "N/A"].includes(user().default_billing_address) ? (
                <div class="input-text-large-static">
                  {user().default_billing_address}
                </div>
              ) : (
                <Address
                  address={user().default_billing_address}
                  userAccountRecurData={userAccountRecurData}
                  setEditAddress={setEditAddress}
                  isMyProfile={true}
                />
              )}
            </div>
          </div>

          <div class="flex w-full">
            <a href={userAccountAddressURL} class="button-primary">
              {plusIcon}
              {Button_add_new_address_text}
            </a>
          </div>

          {/* {Address_tag.length > 2 && (
            <div class="w-full flex justify-center">
              <a
                href={userAccountAddressURL}
                id="more-address"
                class="button-link-primary"
              >
                {Address_tag.length === 3
                  ? Button_view_more_address_text_singular
                  : Button_view_more_address_text.replace(
                      "<number>",
                      Address_tag.length - 2,
                    )}
              </a>
            </div>
          )} */}
        </div>
      </div>

      {/* {Social_media && (
        <div class="dashboard-sec">
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
