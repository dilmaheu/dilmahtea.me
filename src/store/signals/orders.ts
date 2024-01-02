import { createSignal } from "solid-js";

const [orders, setOrders] = createSignal(null);
const [ordersRange, setOrdersRange] = createSignal(null);

export { orders, setOrders, ordersRange, setOrdersRange };
