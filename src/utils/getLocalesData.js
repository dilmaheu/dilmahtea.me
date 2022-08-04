const i18nLocalesQuery = `
  {
    i18NLocales {
      data {
        attributes {
          code
          name
        }
      }
    }
  }
`;

const i18nLocalesData = await fetch(import.meta.env.DB_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: i18nLocalesQuery,
  }),
}).then((res) => res.json());

const i18nLocales = i18nLocalesData.data.i18NLocales.data.map((localeData) => {
  const locale = localeData.attributes.code,
    language = localeData.attributes.name.split(" ")[0];

  return {
    locale,
    language,
  };
});

const locales = i18nLocales.map(({ locale }) => locale.substring(0, 2)),
  languages = i18nLocales.map(({ language }) => language);

const localeNamesQuery = `{
${i18nLocales.map(
  ({ locale, language }) => `
    ${language}: localeName (locale: "${locale}") {
      data {
        attributes {
          Dutch
          English
          German
          Spanish
        }
      }
    }
`
)}
}`;

const { data: localeNamesData } = await fetch(import.meta.env.DB_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: localeNamesQuery,
  }),
}).then((res) => res.json());

languages.map((lang) => {
  localeNamesData[lang] = localeNamesData[lang].data.attributes;
});

export default function getLocalesData() {
  return {
    locales,
    languages,
    localeNamesData,
  };
}
