import type { ENV } from "./types";

import getPreferredLocale from "./getPreferredLocale";

type StrapiCollections = Record<string, any>;

let strapiCollections: StrapiCollections;

async function storeStrapiCollections(env: ENV): Promise<void> {
  const { results } = await (env.USERS as D1Database)
    .prepare("SELECT * FROM strapi")
    .all();

  strapiCollections = Object.fromEntries(
    results.map(({ model, data }: any) => [model, JSON.parse(data)]),
  );
}

async function D1Strapi(env: ENV): Promise<StrapiCollections> {
  await storeStrapiCollections(env);

  return strapiCollections;
}

D1Strapi.getSingle = async function (
  model: string,
  context: EventContext<ENV, any, Record<string, any>>,
): Promise<any> {
  const { env, request } = context;

  await storeStrapiCollections(env);

  const single = strapiCollections[model].data.attributes;

  const preferredLocale = getPreferredLocale(request);

  return [
    single,
    ...single.localizations.data.map(({ attributes }) => attributes),
  ].find(({ locale }) => locale.substring(0, 2) === preferredLocale);
};

export default D1Strapi;
