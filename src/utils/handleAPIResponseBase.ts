import type { Accessor, Setter } from "solid-js";

declare interface APIResponse {
  success: boolean;
  message: string;
}

export default function handleAPIResponseBase(
  response: Response,
  notification: Accessor<any>,
  setNotification: Setter<any>,
) {
  response.json<APIResponse>().then((response) => {
    if (notification && setNotification) {
      if (response.success) {
        setNotification({
          type: "success",
          message: response.message,
        });

        setTimeout(() => {
          // skip if an error notification is set within 7 seconds
          if (notification().type === "success") {
            setNotification(null);
          }
        }, 7000);
      } else {
        setNotification({
          type: "error",
          message: response.message,
        });
      }
    }
  });
}
