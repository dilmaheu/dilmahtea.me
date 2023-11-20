import { user } from "@store/signals/user";

export default function UserInfo({
  Label_username,
  Label_phone,
  Label_email,
  Button_edit_text,
  Button_update_text,
}) {
  return (
    <>
      <div class="grid gap-1 pb-[25px] mb-[25px] border-b border-lightgray">
        <div class="information-label">{Label_username}</div>

        <div class="flex flex-wrap items-center gap-2.5 justify-between">
          <div class="information-text">{user().name}</div>

          {/* <div class="information-btn">
            <a href="#">{Button_edit_text}</a>
          </div> */}
        </div>
      </div>

      <div class="grid gap-1 pb-[25px] mb-[25px] border-b border-lightgray">
        <div class="information-label">{Label_phone}</div>

        <div class="flex flex-wrap items-center gap-2.5 justify-between">
          <div class="information-text">{user().phone}</div>

          {/* <div class="information-btn">
            <a href="#">{Button_update_text}</a>
          </div> */}
        </div>
      </div>

      <div class="grid gap-1 pb-[25px] mb-[25px] border-b border-lightgray">
        <div class="information-label">{Label_email}</div>

        <div class="flex flex-wrap items-center gap-2.5 justify-between">
          <div class="information-text">{user().email}</div>

          {/* <div class="information-btn">
            <a href="#">{Button_update_text}</a>
          </div> */}
        </div>
      </div>
    </>
  );
}
