import { createEffect, createSignal } from "solid-js";

import { user } from "@signals/user";

import InfoUnit from "@solid/InfoUnit";

export default function UserInfo({
  Title,
  Label_username,
  Label_phone,
  Label_email,
  user_info_update_success_notification,
  display_name_update_success_notification_label,
  email_update_success_notification_label,
  phone_number_update_success_notification_label,
  verificationHref,
  recurringImages,
  userAccountRecurData,
}) {
  const [notification, setNotification] = createSignal(null);

  createEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("updated_user_info") === "true") {
      const info = searchParams.get("info"),
        InfoLabels = {
          display_name: display_name_update_success_notification_label,
          email: email_update_success_notification_label,
          phone: phone_number_update_success_notification_label,
        };

      setNotification({
        type: "success",
        message: user_info_update_success_notification.replace(
          "<info_label>",
          InfoLabels[info],
        ),
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
    <>
      <h2 id="personal-information" class="dashboard-sec-title recoleta">
        {Title.replace("<username>", user().display_name)}
      </h2>

      <div class="dashboard-sec">
        {notification() && (
          <div
            class={[
              "py-[clamp(10px,calc(0.625vw+6px),15px)]",
              "px-[clamp(15px,calc(0.625vw+11px),20px)] rounded-[10px] border",
              notification().type === "success"
                ? "bg-success-light border-success"
                : "bg-error-light border-error",
            ].join(" ")}
          >
            <div class="flex gap-[clamp(8px,calc(0.25vw+6.4px),10px)] justify-center">
              <img
                class="w-[clamp(22px,calc(0.5vw+18.8px),26px)] h-[clamp(22px,calc(0.5vw+18.8px),26px)]"
                {...recurringImages[`${notification().type}_notification`]}
              />

              <div class="text-[clamp(14px,calc(0.25vw+12.4px),16px)] text-black">
                {notification().message}
              </div>
            </div>
          </div>
        )}

        <InfoUnit
          label={Label_username}
          type="text"
          property="display_name"
          verificationHref={verificationHref}
          userAccountRecurData={userAccountRecurData}
          setNotification={setNotification}
        />

        <InfoUnit
          label={Label_phone}
          type="tel"
          property="phone"
          verificationHref={verificationHref}
          userAccountRecurData={userAccountRecurData}
          setNotification={setNotification}
        />

        <InfoUnit
          label={Label_email}
          type="email"
          property="email"
          verificationHref={verificationHref}
          userAccountRecurData={userAccountRecurData}
          setNotification={setNotification}
        />

        {/* <div class="grid gap-[25px]">
          <div class="grid gap-1">
            <div class="information-label">{Label_delivery_address}</div>

            <div class="flex flex-wrap items-center gap-[15px] justify-between">
              <div class="information-text">456B, Oakwoods, Germany</div>
              <div class="information-btn cursor-pointer">
                {Button_edit_text}
              </div>
            </div>
          </div>

          <div class="grid gap-1">
            <div class="information-label">{Label_billing_address}</div>

            <div class="flex flex-wrap items-center gap-[15px] justify-between">
              <div class="information-text">456B, Oakwoods, Germany</div>
              <div class="information-btn cursor-pointer">
                {Button_edit_text}
              </div>
            </div>
          </div>

          <div class="flex w-full">
            <a
              href={userAccountAddress_url}
              class:list={[
                "flex gap-3 py-[15px] px-10 mt-[15px] md:min-w-[250px] font-bold",
                "text-white leading-[150%] bg-primary rounded-full cursor-pointer",
              ]}
            >
              <Icon name="akar-icons:plus" class="w-5 select-none" />
              {Button_add_new_address_text}
            </a>
          </div>

          {address_tag.length > 2 && (
            <div class="mt-[25px] w-full flex justify-center">
              <a
                href={userAccountAddress_url}
                id="toggle-more-address"
                class="font-bold leading-[150%] text-primary cursor-pointer"
              >
                <span id="show-more-address" class="flex items-center">
                  {text_more_address.replaceAll(
                    "<number>",
                    address_tag.length - 2,
                  )}
                </span>
              </a>
            </div>
          )}
        </div> */}
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
