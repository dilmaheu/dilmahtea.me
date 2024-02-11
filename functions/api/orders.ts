import type { Session } from "lucia";

import { initializeLucia } from "functions/utils/auth";

declare interface Env {
  USERS: D1Database;
}

function convertISODate(ISO_date) {
  const date = new Date(ISO_date);

  const day = date.getDate(),
    month = date.toLocaleString("en-US", { month: "short" }),
    year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  const { exact_account_guid } = session.user;

  const shouldLimit = !!new URL(request.url).searchParams.get("limit");

  const { results: orders } = await env.USERS.prepare(
    "SELECT * FROM orders WHERE customer_exact_account_guid = ? ORDER BY order_date DESC" +
      (shouldLimit
        ? " LIMIT 4" // the 4th order is just for enabling the "View all orders" link
        : ""),
  )
    .bind(exact_account_guid)
    .all();

  orders.forEach((order) => {
    order.items = JSON.parse(order.items as string);

    ["estimated_shipment_date", "estimated_delivery_date", "delivery_date"].map(
      (key) => (order[key] &&= convertISODate(order[key])),
    );
  });

  if (!shouldLimit) {
    const ordersByYear = orders.reduce((orders, order) => {
      const orderDate = new Date(order.order_date as string),
        year = "year_" + orderDate.getFullYear(),
        month = orderDate.toLocaleString("en-US", { month: "long" });

      orders[year] ??= {};
      orders[year][month] ??= [];

      orders[year][month].push(order);

      return orders;
    }, {});

    return Response.json(ordersByYear);
  } else {
    return Response.json(orders);
  }
};
