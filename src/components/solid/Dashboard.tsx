import Orders from "@solid/Orders";
import UserInfo from "@solid/UserInfo";
import DashboardKindnessCauses from "@solid/DashboardKindnessCauses";

export default function Dashboard({
  kindnessCausesHTML,
  noOrdersHTML,
  page,
  verificationHref,
  userAccountRecurData,
  recurringImages,
}) {
  const { Block2 } = page;

  return (
    <div class="md:w-2/3">
      <UserInfo
        page={page}
        verificationHref={verificationHref}
        recurringImages={recurringImages}
        userAccountRecurData={userAccountRecurData}
      />

      <DashboardKindnessCauses
        kindnessCausesHTML={kindnessCausesHTML}
        title={Block2.Block2_title}
        successNotificationText={Block2.Notification_cause_update_text}
        recurringImages={recurringImages}
      />

      <Orders
        page={page}
        recurringImages={recurringImages}
        userAccountRecurData={userAccountRecurData}
      />
    </div>
  );
}
