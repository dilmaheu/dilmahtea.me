import { user } from "@signals/user";

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

      <h2
        id={page.Block3_title.toLowerCase().replaceAll(" ", "-")}
        class="dashboard-sec-title recoleta mt-[50px]"
      >
        {page.Block3_title}
      </h2>

      <Orders
        noOrdersHTML={noOrdersHTML}
        recurringImages={recurringImages}
        userAccountRecurData={userAccountRecurData}
      />
    </div>
  );
}
