import CMS from "@store/CMS.js";
import Products from "@store/Products";
import tryUntilResolve from "@utils/tryUntilResolve";

const { STRAPI_URL } = import.meta.env,
  contentTypes = [
    "blogs",
    "howTos",
    "recipes",
    "estates",
    "homepage",
    "products",
    "homeEstate",
    "homeProduct",
    "homeElephantPath",
    "productCategories",
  ];

const searchIndex = {},
  pages = contentTypes.flatMap(
    (type) => (CMS.get(type) || Products.get("all")).data,
  );

pages.forEach(({ attributes }) => {
  [
    attributes,
    ...attributes.localizations.data.map(({ attributes }) => attributes),
  ].forEach((attributes) => {
    const locale = attributes.locale.substring(0, 2),
      Title =
        [
          attributes.Title,
          attributes.category_tea_range?.data?.attributes?.Title,
          attributes.category?.data?.attributes?.Title,
          attributes.size?.data?.attributes?.Title,
        ]
          .filter(Boolean)
          .join(" &#x025CF; ") || attributes.Estate_name,
      Intro_text = attributes?.Intro_text?.slice(0, 60).replace(
        /(<([^>]+)>)/gi,
        "",
      ),
      Intro_blob = {
        url:
          STRAPI_URL +
          (attributes.Intro_blob.data.attributes.formats?.thumbnail.url ||
            attributes.Intro_blob.data.attributes.url),
        alt: attributes.Intro_blob.data.attributes.alternativeText,
      },
      URL_slug = attributes.Meta.URL_slug;

    searchIndex[locale] ||= [];

    searchIndex[locale].push({
      Title,
      Intro_text,
      Intro_blob,
      URL_slug,
    });
  });
});

// sort the search index alphabetically by Title
for (const locale in searchIndex) {
  searchIndex[locale].sort((a, b) => a.Title.localeCompare(b.Title));
}

// localize search results intro blobs
await Promise.all(
  Object.values(searchIndex)
    .flat()
    // @ts-ignore
    .map(async ({ Intro_blob }) => {
      Intro_blob.url = await tryUntilResolve(
        () => importImage(Intro_blob.url),
        (message) => message + " " + Intro_blob.url,
      );
    }),
);

export function getStaticPaths() {
  const staticPaths = Object.keys(searchIndex).map((key) => {
    return { params: { locale: key } };
  });

  return staticPaths;
}

export function GET({ params: { locale } }) {
  const localizedIndex = searchIndex[locale];

  return new Response(JSON.stringify(localizedIndex));
}
