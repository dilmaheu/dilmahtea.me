export function onRequestGet(context) {
  const { PRODUCTS } = context.env;

  PRODUCTS.put("Category", "Categ");

  return new Response(
    JSON.stringify({
      message: "Hello World!",
      products: `${PRODUCTS.get("Category")}}`,
    }),
    { status: 200 }
  );
}
