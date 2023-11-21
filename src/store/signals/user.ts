import { createEffect, createSignal } from "solid-js";

const [user, setUser] = createSignal(new Proxy({}, { get: () => "N/A" }));

createEffect(() => {
  if (window.cookies.isAuthenticated === "true") {
    fetch("/account/user")
      .then((response) => response.json())
      .then((user: any) => {
        user.name = user.first_name + " " + user.last_name;

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
