import { createEffect, createSignal } from "solid-js";

import { addresses } from "@signals/addresses";

export default function AddressTags({ action, address, userAccountRecurData }) {
  const [usedTags, setUsedTags] = createSignal([]),
    [showMoreAddresses, setShowMoreAddresses] = createSignal(
      action === "checkout" ? false : true,
    ),
    [customAddressTag, setCustomAddressTag] = createSignal(""),
    [showCustomTagInput, setShowCustomTagInput] = createSignal(false);

  createEffect(() => {
    if (Array.isArray(addresses())) {
      setUsedTags(addresses().map(({ tag }) => tag));
    }
  });

  const {
    Label_tag_text,
    Tag_others_text,
    Tag_others_placeholder_text,
    Tag_suggestions,
    text_more_address,
    text_hide_more_address,
  } = userAccountRecurData;

  function hideCustomTagInput() {
    setCustomAddressTag("");

    setShowCustomTagInput(false);
  }

  return (
    <div class="division-in-gap grid">
      <div class="text-b5 font-bold text-black-light">{Label_tag_text}</div>

      <div class="flex flex-wrap gap-2.5 sm:gap-[15px]">
        {(action === "checkout" && addresses()?.length > 0
          ? usedTags()
          : Tag_suggestions.split("\n")
              .filter(Boolean)
              .filter(
                (tag) => !usedTags().includes(tag) || tag === address?.tag,
              )
        )
          .slice(0, showMoreAddresses() ? Infinity : 3)
          .map((tag) => (
            <div>
              <input
                type="radio"
                name="address_tag"
                id={`address-tag-${tag}`}
                class="peer w-px opacity-0"
                value={tag}
                onchange={hideCustomTagInput}
                checked={address?.tag === tag}
                required={action === "update"}
              />

              <label
                for={`address-tag-${tag}`}
                class={[
                  "radio-button-default text-primary",
                  "bg-secondary-light border-secondary-light font-medium",
                  "peer-checked:font-bold peer-checked:bg-primary peer-checked:text-secondary-light",
                ].join(" ")}
              >
                {tag}
              </label>
            </div>
          ))}

        <div>
          <input
            type="radio"
            name="address_tag"
            id="add-new-address-tag"
            class="peer w-px opacity-0"
            value={customAddressTag()}
            checked={!!showCustomTagInput()}
            onchange={() => setShowCustomTagInput(true)}
            required={action === "update"}
          />

          <label
            for="add-new-address-tag"
            class={[
              "radio-button-extended border-white",
              "peer-checked:border-primary",
            ].join(" ")}
          >
            {Tag_others_text}
          </label>
        </div>

        {action === "checkout" && addresses()?.length > 0 && (
          <button
            type="button"
            class="flex items-center gap-1 text-primary font-bold cursor-pointer"
            onclick={() => setShowMoreAddresses(!showMoreAddresses())}
          >
            {showMoreAddresses() && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="w-3 h-3 fill-primary"
              >
                <path d="M7.7,13.7a1.1,1.1,0,0,0,.3-.8,1.1,1.1,0,0,0-.3-.7L2.5,7,7.7,1.8A1.1,1.1,0,0,0,8,1,1.1,1.1,0,0,0,7.7.3,1.1,1.1,0,0,0,7,0a1.1,1.1,0,0,0-.8.3L.3,6.2A1.1,1.1,0,0,0,0,7a.9.9,0,0,0,.3.7l5.9,6A1.1,1.1,0,0,0,7,14a1.1,1.1,0,0,0,.7-.3Z"></path>
              </svg>
            )}

            <span>
              {(!showMoreAddresses()
                ? text_more_address
                : text_hide_more_address
              ).replace("<number>", addresses()?.length - 3)}
            </span>

            {!showMoreAddresses() && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 14"
                class="w-3 h-3 fill-primary"
              >
                <path d="M.3,13.7a1.1,1.1,0,0,1-.3-.8,1.1,1.1,0,0,1,.3-.7L5.5,7,.3,1.8A1.1,1.1,0,0,1,0,1,1.1,1.1,0,0,1,.3.3,1.1,1.1,0,0,1,1,0a1.1,1.1,0,0,1,.8.3L7.7,6.2A1.1,1.1,0,0,1,8,7a.9.9,0,0,1-.3.7l-5.9,6A1.1,1.1,0,0,1,1,14a1.1,1.1,0,0,1-.7-.3Z"></path>
              </svg>
            )}
          </button>
        )}
      </div>

      {showCustomTagInput() && (
        <div id="tag-input">
          <div class="form-grid">
            <label class="relative">
              <input
                type="text"
                class="pr-[40px]"
                placeholder={Tag_others_placeholder_text}
                oninput={(event) =>
                  setCustomAddressTag(event.currentTarget.value)
                }
                required
              />

              <span
                tabIndex="0"
                onclick={hideCustomTagInput}
                class="tag-input-close-button text-2xl"
              >
                <b>&#10005;</b>
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
