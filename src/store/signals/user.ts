import { createEffect, createSignal } from "solid-js";

const [user, setUser] = createSignal(new Proxy({}, { get: () => "…" }));

createEffect(() => {
  if (window.cookies.isAuthenticated === "true") {
    fetch("/account/user")
      .then((response) => response.json())
      .then((user: any) => {
        Object.keys(user).forEach((key) => {
          if (!user[key]) {
            user[key] = "N/A";
          }
        });

        setUser(user);
      });
  }
});

export { user };
