import type { Accessor, Setter } from "solid-js";

declare interface APIResponse {
  success: boolean;
  message: string;
}

export default function handleAPIResponseBase(
  response: Response,
  notification: Accessor<any>,
  setNotification: Setter<any>,
  callbacks?: {
    onParse?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
  },
) {
  response.json<APIResponse>().then((response) => {
    if (callbacks.onParse) callbacks.onParse();

    if (notification && setNotification) {
      if (response.success) {
        if (callbacks.onSuccess) callbacks.onSuccess();

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
        if (callbacks.onError) callbacks.onError();

        setNotification({
          type: "error",
          message: response.message,
        });
      }
    }
  });
}
