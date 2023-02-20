export async function onRequestGet(context) {
  const { PRODUCTS } = context.env;

  const productsKey = new URL(context.request.url).searchParams.get(
      "productsKey"
    ),
    products = await PRODUCTS.get(productsKey);

  if (!products) {
    return new Response(
      JSON.stringify({
        error: "Bad request",
      }),
      { status: 400 }
    );
  }

  return new Response(products, { status: 200 });
}
