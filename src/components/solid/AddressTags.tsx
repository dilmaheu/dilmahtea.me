import { createEffect, createSignal } from "solid-js";

import { addresses } from "@signals/addresses";

export default function AddressTags({ action, address, userAccountRecurData }) {
  const [usedTags, setUsedTags] = createSignal([]),
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
        ).map((tag) => (
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
