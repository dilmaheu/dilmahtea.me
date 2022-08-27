import CMS from "../store/CMS";

const notifications = await CMS.get("notifications"),
  langNotAvailableNotification = notifications.data.find(
    (notif) => (notif.attributes.Title = "language_not_available")
  );

const localizedNotifications = {};

const {
  locale: defaultLocale,
  Type,
  Closing_Enabled,
  Content: defaultNotification,
  localizations,
} = langNotAvailableNotification.attributes;

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
