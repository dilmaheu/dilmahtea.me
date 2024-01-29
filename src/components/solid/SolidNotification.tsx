import type { Accessor } from "solid-js";

declare interface Props {
  notification: Accessor<any>;
  notificationIcons: any;
  bordered?: boolean;
  bottomMargin?: boolean;
}

export default function SolidNotification({
  notification,
  notificationIcons,
  bordered,
  bottomMargin,
}: Props) {
  return (
    <>
      {notification() &&
        (() => {
          const { type, message } = notification();

          return (
            <div
              classList={{
                "py-[clamp(10px,calc(0.625vw+6px),15px)] px-[clamp(15px,calc(0.625vw+11px),20px)] rounded-[10px] border":
                  true,
                "bg-success-light border-success": type === "success",
                "bg-warning-light border-warning": type === "warning",
                "bg-error-light border-error": type === "error",
                "bg-info-light border-info": type === "info",
                "border-0": !bordered,
                "mb-5": bottomMargin,
              }}
            >
              <div class="flex gap-[clamp(8px,calc(0.25vw+6.4px),10px)] justify-center">
                <img
                  class="w-[clamp(22px,calc(0.5vw+18.8px),26px)] h-[clamp(22px,calc(0.5vw+18.8px),26px)]"
                  {...notificationIcons[`${type}_notification`]}
                />

                <div
                  innerHTML={message}
                  class="text-[clamp(14px,calc(0.25vw+12.4px),16px)] text-black"
                />
              </div>
            </div>
          );
        })}
    </>
  );
}
