import { createSignal } from "solid-js";

const [showAddressForm, setShowAddressForm] = createSignal<boolean>(false);

export { showAddressForm, setShowAddressForm };
