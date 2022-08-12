const langNotAvailableNotificationQuery = `
  {
    notifications(filters: { Title: { eq: "language_not_available" } }) {
      data {
        attributes {
          locale
          Type
          Content
          Closing_Enabled
          localizations {
            data {
              attributes {
                locale
                Content
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

const localizedNotifications = {};

const {
  locale: defaultLocale,
  Type,
  Closing_Enabled,
  Content: defaultNotification,
  localizations,
} = langNotAvailableNotificationData.notifications.data[0].attributes;

localizedNotifications[defaultLocale] = defaultNotification;

localizations.data.forEach(({ attributes }) => {
  const { locale, Content: notification } = attributes;

  localizedNotifications[locale] = notification;
});

export default function getLangNotAvailableNotification() {
  return {
    Type,
    Closing_Enabled,
    localizedNotifications,
  };
}
