export default function DashboardNotification({
  notification,
  recurringImages,
}) {
  return (
    <>
      {notification() &&
        (() => {
          const { type, message } = notification();

          return (
            <div
              class={[
                "py-[clamp(10px,calc(0.625vw+6px),15px)]",
                "px-[clamp(15px,calc(0.625vw+11px),20px)] rounded-[10px] border mb-5",
                type === "success" ? "bg-success-light border-success" : "",
                type === "warning" ? "bg-warning-light border-warning" : "",
                type === "error" ? "bg-error-light border-error" : "",
              ].join(" ")}
            >
              <div class="flex gap-[clamp(8px,calc(0.25vw+6.4px),10px)] justify-center">
                <img
                  class="w-[clamp(22px,calc(0.5vw+18.8px),26px)] h-[clamp(22px,calc(0.5vw+18.8px),26px)]"
                  {...recurringImages[`${type}_notification`]}
                />

                <div class="text-[clamp(14px,calc(0.25vw+12.4px),16px)] text-black">
                  {message}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
