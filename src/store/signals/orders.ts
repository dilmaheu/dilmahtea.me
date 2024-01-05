import { createSignal } from "solid-js";

const [orders, setOrders] = createSignal(null);
const [ordersYear, setOrdersYear] = createSignal(null);

export { orders, setOrders, ordersYear, setOrdersYear };
