import type { Address } from "@solid/Address";

import { createEffect, createSignal } from "solid-js";

const [addresses, setAddresses] = createSignal<Address[]>();

createEffect(() => {
  fetch("/api/addresses")
    .then((res) => res.json<any[]>())
    .then((addresses) => {
      setAddresses(addresses);
    });
});

export { addresses };
