import { createEffect, createSignal } from "solid-js";

function handleEmptyFields(obj) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      obj[key] = "N/A";
    } else if (obj[key].constructor === Object) {
      handleEmptyFields(obj[key]);
    }
  });

  return obj;
}

const [user, setUser] = createSignal<Record<string, any>>(
  new Proxy({}, { get: () => "…" }),
);

createEffect(() => {
  if (window.cookies.isAuthenticated === "true") {
    fetch("/account/user")
      .then((response) => response.text())
      .then(handleEmptyFields)
      .then(setUser);
  }
});

export { user };
