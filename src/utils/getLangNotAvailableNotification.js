const langNotAvailableNotificationQuery = `
  {
    notification {
      data {
        attributes {
          locale
          language_not_available
          localizations {
            data {
              attributes {
                locale
                language_not_available
              }
            }
          }
        }
      }
    }
  }
`;

const { data: langNotAvailableNotificationData } = await fetch(
  import.meta.env.DB_URL,
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: langNotAvailableNotificationQuery,
    }),
  }
).then((res) => res.json());

const langNotAvailableNotification = {};

const {
  locale: defaultLocale,
  language_not_available: defaultNotification,
  localizations,
} = langNotAvailableNotificationData.notification.data.attributes;

langNotAvailableNotification[defaultLocale] = defaultNotification;

localizations.data.forEach(({ attributes }) => {
  const { locale, language_not_available: notification } = attributes;

  langNotAvailableNotification[locale] = notification;
});

export default function getLangNotAvailableNotification() {
  return langNotAvailableNotification;
}
