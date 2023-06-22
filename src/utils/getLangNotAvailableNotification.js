import CMS from "@store/CMS";

const notifications = await CMS.get("notifications"),
  langNotAvailableNotification = notifications.data.find(
    (notif) => (notif.attributes.Title = "language_not_available")
  );

const {
  locale: defaultLocale,
  Type,
  Closing_Enabled,
  Content: defaultNotification,
  localizations,
} = langNotAvailableNotification.attributes;

const localizedNotifications = {
  [defaultLocale]: defaultNotification,
};

localizations.data.forEach(({ attributes }) => {
  const { locale, Content: notification } = attributes;

  localizedNotifications[locale] = notification;
});

export { Type, Closing_Enabled, localizedNotifications };
