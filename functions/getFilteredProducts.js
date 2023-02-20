export async function onRequestGet(context) {
  const { PRODUCTS } = context.env;

  const productsKey = new URL(context.request.url).searchParams.get(
    "productsKey"
  );

  return new Response(await PRODUCTS.get(productsKey), { status: 200 });
}
