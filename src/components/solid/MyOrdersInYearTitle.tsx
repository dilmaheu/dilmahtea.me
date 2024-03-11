import { ordersYear } from "@signals/orders";

export default function MyOrdersInYearTitle({ Title, text_in }) {
  return (
    <h1 class="tiled-div-title recoleta">
      {Title}
      {ordersYear() && ` ${text_in} ${ordersYear().slice(5)}`}
    </h1>
  );
}
