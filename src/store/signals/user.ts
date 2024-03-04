import { createEffect, createSignal } from "solid-js";

import handleEmptyFields from "@utils/shared/handleEmptyFields";

const [user, setUser] = createSignal<Record<string, any>>(
  new Proxy({}, { get: () => "…" }),
);

createEffect(() => {
  if (window.cookies.isAuthenticated === "true") {
    fetch("/api/user")
      .then((response) => response.json())
      .then(handleEmptyFields)
      .then(setUser);
  }
});

export { user };
