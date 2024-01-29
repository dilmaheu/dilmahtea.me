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
  userAccountRecurData,
  recurringImages,
}) {
  const { Block2 } = page;

  return (
    <>
      <UserInfo
        plusIcon={plusIcon}
        page={page}
        verificationHref={verificationHref}
        userAccountAddressURL={userAccountAddressURL}
        recurringImages={recurringImages}
        userAccountRecurData={userAccountRecurData}
      />

      <DashboardKindnessCauses
        kindnessCausesHTML={kindnessCausesHTML}
        title={Block2.Block2_title}
        successNotificationText={Block2.Notification_cause_update_text}
        recurringImages={recurringImages}
      />

      <h2
        id={page.Block3_title.toLowerCase().replaceAll(" ", "-")}
        class="dashboard-sec-title recoleta mt-[30px]"
      >
        {page.Block3_title}
      </h2>

      <Orders
        noOrdersHTML={noOrdersHTML}
        recurringImages={recurringImages}
        userAccountRecurData={userAccountRecurData}
        isOrdersPage={false}
      />
    </>
  );
}
