import type { Session } from "lucia";

import { initializeLucia } from "functions/utils/auth";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  const { email, phone } = session.user;

  const shouldLimit = !!new URL(request.url).searchParams.get("limit");

  const { results: orders } = await env.USERS.prepare(
    "SELECT * FROM orders WHERE customer_email = COALESCE(?, customer_email) OR customer_email = COALESCE(?, customer_email) ORDER BY order_date DESC" +
      shouldLimit
      ? " LIMIT 4" // the 4th order is just for enabling the "View all orders" link
      : "",
  )
    .bind(email, phone)
    .all();

  if (!shouldLimit) {
    const ordersByYear = orders.reduce((orders, order) => {
      const orderDate = new Date(order.order_date as string),
        year = orderDate.getFullYear(),
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
