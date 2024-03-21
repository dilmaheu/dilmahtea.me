import Address from "@solid/Address";

export default function DefaultAddress({
  label,
  address,
  recurData,
  setEditAddress,
  scrollToAddNewAddress,
  handleAPIResponse,
}) {
  const { text_add } = recurData;

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
            class="button-link-primary-large"
          >
            {text_add}
          </button>
        </div>
      ) : (
        <Address
          address={address}
          recurData={recurData}
          setEditAddress={setEditAddress}
          isMyProfile={true}
          scroll={scrollToAddNewAddress}
          handleAPIResponse={handleAPIResponse}
        />
      )}
    </div>
  );
}
