import Address from "@solid/Address";

export default function DefaultAddress({
  label,
  address,
  userAccountRecurData,
  setEditAddress,
  scrollToAddNewAddress,
}) {
  const { Button_add_text } = userAccountRecurData;

  return (
    <div class="grid division-in-element-gap">
      <div class="input-label">{label}</div>

      {["…", "N/A"].includes(address) ? (
        <div class="flex items-center division-in-element-gap justify-between">
          <div class="input-text-large-static">{address}</div>

          <button
            onclick={() => {
              scrollToAddNewAddress();

              setEditAddress({
                action: "add",
                tickCheckboxes: {
                  default_billing_address: true,
                },
              });
            }}
            class="button-link-primary-big"
          >
            {Button_add_text}
          </button>
        </div>
      ) : (
        <Address
          address={address}
          userAccountRecurData={userAccountRecurData}
          setEditAddress={setEditAddress}
          isMyProfile={true}
          scroll={scrollToAddNewAddress}
        />
      )}
    </div>
  );
}
