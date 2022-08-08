const i18nQuery = `
  {
    i18Ns {
      data {
        attributes {
          code
          locale
          language
          localizations {
            data {
              attributes {
                code
                locale
                language
              }
            }
          }
        }
      }
    }
  }
`;

const { data: i18nData } = await fetch(import.meta.env.DB_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: i18nQuery,
  }),
}).then((res) => res.json());

const allI18NEntries = [];

i18nData.i18Ns.data.forEach(({ attributes }) => {
  allI18NEntries.push(attributes);

  attributes.localizations.data.forEach(({ attributes }) => {
    allI18NEntries.push(attributes);
  });
});

const locales = [],
  languages = [];

allI18NEntries
  .filter(({ locale }) => locale === "en")
  .forEach(({ code, language }) => {
    locales.push(code.toLowerCase());
    languages.push(language);
  });

const localeNamesData = {};

languages.forEach((language, i) => {
  const localLocaleNames = {};

  const locale = locales[i];

  allI18NEntries
    .filter((entry) => entry.locale.substring(0, 2) === locale)
    .forEach(({ code, language: translation }) => {
      const language = languages[locales.indexOf(code.toLowerCase())];

      localLocaleNames[language] = translation;
    });

  localeNamesData[language] = localLocaleNames;
});

export default function getLocalesData() {
  return {
    locales,
    languages,
    localeNamesData,
  };
}
