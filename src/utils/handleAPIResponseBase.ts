import { type Accessor, type Setter } from "solid-js";

declare interface APIResponse {
  success: boolean;
  message: string;
}

declare interface Callbacks {
  onParse?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export type handleAPIResponseType = (
  response: Response,
  callbacks?: Callbacks,
) => ReturnType<typeof handleAPIResponseBase>;

export default function handleAPIResponseBase(
  response: Response,
  notification: Accessor<any>,
  setNotification: Setter<any>,
  callbacks?: Callbacks,
) {
  response.json<APIResponse>().then((response) => {
    if (callbacks.onParse) callbacks.onParse();

    if (notification && setNotification) {
      if (response.success) {
        if (callbacks.onSuccess) callbacks.onSuccess();
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
