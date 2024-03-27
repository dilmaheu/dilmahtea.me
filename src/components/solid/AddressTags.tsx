import type { Accessor, Setter } from "solid-js";
import type { Address } from "@solid/Address";

import { createEffect, createSignal } from "solid-js";

import { addresses } from "@signals/addresses";

declare interface Props {
  action: "add" | "update" | "checkout";
  address: Address;
  recurData: any;
  shouldShowCustomTagInput?: boolean;
  selectedTag?: Accessor<string>;
  setSelectedTag?: Setter<string>;
  showMoreAddresses?: Accessor<boolean>;
  setShowMoreAddresses?: Setter<boolean>;
}

export default function AddressTags({
  action,
  address,
  recurData,
  shouldShowCustomTagInput = false,
  selectedTag,
  setSelectedTag,
  showMoreAddresses,
  setShowMoreAddresses,
}: Props) {
  const [usedTags, setUsedTags] = createSignal([]),
    [customAddressTag, setCustomAddressTag] = createSignal(""),
    [showCustomTagInput, setShowCustomTagInput] = createSignal(
      shouldShowCustomTagInput,
    );

  createEffect(() => {
    if (Array.isArray(addresses())) {
      setUsedTags(addresses().map(({ tag }) => tag));
    }
  });

  const {
    Label_tag_text,
    label_auto_tag,
    Tag_add_text,
    Tag_add_placeholder,
    Tag_suggestions,
    text_more_address,
    text_hide_more_address,
    text_select_or_create_tag,
  } = recurData;

  function hideCustomTagInput() {
    setCustomAddressTag("");

    setShowCustomTagInput(false);
  }

  return (
    <div class="division-in-gap grid">
      <div class="text-b5 font-bold text-black-light">
        {action === "checkout" && addresses()?.length > 0
          ? text_select_or_create_tag
          : Label_tag_text}
      </div>

      <div class="division-in-gap flex flex-wrap">
        {(action === "checkout" && addresses()?.length > 0
          ? usedTags()
          : [
              ...new Set(
                [
                  ...Tag_suggestions.split("\n")
                    .filter(Boolean)
                    .filter(
                      (tag) =>
                        !usedTags().includes(tag) || tag === address?.tag,
                    ),
                  // add the current tag to the list of suggestions (for Address #N tags)
                  address?.tag,
                ].filter(Boolean),
              ),
            ]
        )
          .slice(0, !showMoreAddresses || showMoreAddresses() ? Infinity : 3)
          .map((tag) => (
            <div>
              <input
                type="radio"
                name="tag"
                id={`address-tag-${tag}`}
                class="peer hidden"
                value={tag}
                onchange={hideCustomTagInput}
                checked={(selectedTag ? selectedTag() : address?.tag) === tag}
                required={action === "update"}
                onChange={() => action === "checkout" && setSelectedTag(tag)}
              />

              <label for={`address-tag-${tag}`} class="radio-button-default">
                {!tag.startsWith("Address #")
                  ? tag
                  : label_auto_tag + tag.split(" ")[1]}
              </label>
            </div>
          ))}

        <div>
          <input
            type="radio"
            name="tag"
            id="add-new-address-tag"
            class="peer hidden"
            value={customAddressTag()}
            checked={!!showCustomTagInput()}
            onchange={() => {
              setShowCustomTagInput(true);

              if (action === "checkout") setSelectedTag(null);
            }}
            required={action === "update"}
          />

          <label for="add-new-address-tag" class="radio-button-extended">
            {Tag_add_text}
          </label>
        </div>

        {action === "checkout" && addresses()?.length > 3 && (
          <button
            type="button"
            class="vertical-toggle-button-primary"
            onClick={() => {
              setShowMoreAddresses(!showMoreAddresses());
            }}
          >
            <span>
              {(!showMoreAddresses()
                ? text_more_address
                : text_hide_more_address
              ).replace("<number>", addresses()?.length - 3)}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 8"
              class={
                "toggle-button-arrow fill-primary" +
                (showMoreAddresses() ? " rotate-180" : "")
              }
            >
              <path d="M.3,13.7a1.1,1.1,0,0,1-.3-.8,1.1,1.1,0,0,1,.3-.7L5.5,7,.3,1.8A1.1,1.1,0,0,1,0,1,1.1,1.1,0,0,1,.3.3,1.1,1.1,0,0,1,1,0a1.1,1.1,0,0,1,.8.3L7.7,6.2A1.1,1.1,0,0,1,8,7a.9.9,0,0,1-.3.7l-5.9,6A1.1,1.1,0,0,1,1,14a1.1,1.1,0,0,1-.7-.3Z"></path>
            </svg>
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
                placeholder={Tag_add_placeholder}
                oninput={(event) =>
                  setCustomAddressTag(event.currentTarget.value)
                }
                required
              />

              <span
                tabIndex="0"
                onclick={hideCustomTagInput}
                class="tag-input-close-button text-b3"
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
