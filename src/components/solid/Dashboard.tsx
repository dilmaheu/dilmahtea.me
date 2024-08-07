import Orders from "@solid/Orders";
import UserInfo from "@solid/UserInfo";
import DashboardKindnessCauses from "@solid/DashboardKindnessCauses";

export default function Dashboard({
  plusIcon,
  kindnessCausesHTML,
  noOrdersHTML,
  page,
  verificationHref,
  userAccountAddressURL,
  recurData,
  notificationIcons,
}) {
  const { Block2 } = page;

  return (
    <>
      <UserInfo
        plusIcon={plusIcon}
        page={page}
        verificationHref={verificationHref}
        userAccountAddressURL={userAccountAddressURL}
        notificationIcons={notificationIcons}
        recurData={recurData}
      />

      <DashboardKindnessCauses
        kindnessCausesHTML={kindnessCausesHTML}
        title={Block2.Block2_title}
        successNotificationText={Block2.Notification_cause_update_text}
        notificationIcons={notificationIcons}
      />

      <h2
        id={encodeURIComponent(
          page.Block3_title.toLowerCase().replaceAll(" ", "-"),
        )}
        class="tiled-title text-h2"
      >
        {page.Block3_title}
      </h2>

      <Orders
        noOrdersHTML={noOrdersHTML}
        notificationIcons={notificationIcons}
        recurData={recurData}
        isOrdersPage={false}
      />
    </>
  );
}
