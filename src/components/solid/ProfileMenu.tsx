import { createEffect, createSignal } from "solid-js";

import { user } from "@signals/user";

import LocalizeLink from "@solid/LocalizedLink";

declare interface LogoutResponse {
  success: boolean;
  returnTo: string;
}

export default function ProfileMenu({
  profileMenu,
  profileIcon,
  loginLink,
  cid,
}) {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  createEffect(() => {
    setIsAuthenticated(window.cookies.isAuthenticated === "true");
  });

  setTimeout(() => {
    if (isAuthenticated()) {
      const id = document.getElementById.bind(document);

      const profileMenu = id("profile-menu"),
        profileMenuContainer = profileMenu.parentElement,
        profileMenuOpenButton = id("profile-menu-open-btn"),
        profileMenuCloseButton = id("profile-menu-close-btn");

      window.profileMenuOpened = false;

      profileMenuContainer.addEventListener("mouseenter", () => {
        if (!window.localizationMenuOpened && window.innerWidth >= 640) {
          profileMenu.classList.remove("hidden");
        }
      });

      profileMenuCloseButton.addEventListener("click", () => {
        profileMenu.classList.add("hidden");

        window.profileMenuOpened = false;

        window.enableScrolling();
      });

      const hideProfileMenu = () => {
        if (!window.profileMenuOpened && window.innerWidth >= 640) {
          profileMenu.classList.add("hidden");
        }
      };

      profileMenuContainer.addEventListener("mouseleave", hideProfileMenu);

      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if (profileMenuOpenButton.contains(target)) {
          window.profileMenuOpened = !window.profileMenuOpened;

          profileMenu.classList[window.profileMenuOpened ? "remove" : "add"](
            "hidden",
          );

          if (window.innerWidth < 640) {
            window.sidebarOpened && window.toggleSidebar();

            window.disableScrolling();
          }
        } else if (profileMenu && !profileMenu.contains(target)) {
          window.profileMenuOpened && window.enableScrolling();

          window.profileMenuOpened = false;

          hideProfileMenu();
        }
      });
    }
  }, 0);

  function handleLogout() {
    fetch("/account/logout")
      .then((res) => res.json<LogoutResponse>())
      .then(({ success }) => success && location.reload());
  }

  return (
    <div class="relative group">
      {!isAuthenticated() ? (
        <a
          href={loginLink}
          class="flex justify-center items-center bg-white rounded-full cursor-pointer"
        >
          {profileIcon}
        </a>
      ) : (
        <>
          <div
            id="profile-menu-open-btn"
            class="flex justify-center items-center bg-white rounded-full cursor-pointer"
          >
            {profileIcon}
          </div>

          <div
            id="profile-menu"
            class={[
              "hidden fixed sm:absolute z-[99] top-0 sm:top-auto",
              "left-0 sm:-translate-x-[80%] px-[min(100px,5vw)] py-[25px] sm:p-0 w-screen",
              "sm:w-[280px] h-screen sm:h-full bg-secondary sm:bg-transparent drop-shadow-lg",
            ].join(" ")}
          >
            <div
              class="profile-dropdown-notch hidden sm:flex justify-end relative pt-1"
              {...{ [cid]: true }}
            >
              <div class="w-5 h-5 bg-white rotate-45 rounded" />
            </div>

            <div
              class={[
                "grid gap-[25px] sm:gap-[15px] sm:p-[25px]",
                "sm:bg-white sm:rounded-[10px] sm:-translate-y-3",
              ].join(" ")}
            >
              <div class="flex sm:hidden justify-end">
                <button
                  type="button"
                  id="profile-menu-close-btn"
                  class="select-none cursor-pointer"
                >
                  <svg
                    viewBox="0 0 19.2 19.2"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-[35px] h-[35px] p-[5px]"
                  >
                    <path
                      d="M.5.5A1.6,1.6,0,0,1,1.6,0,1.6,1.6,0,0,1,2.7.5L9.6,7.4,16.5.5A1,1,0,0,1,17,.1h1.2l.6.4.3.5a1.3,1.3,0,0,1,.1.6,1.3,1.3,0,0,1-.1.6l-.4.6L11.9,9.6l6.8,6.9a1.6,1.6,0,0,1-1.1,2.7,2.1,2.1,0,0,1-1.1-.4L9.6,11.9,2.7,18.8a2.1,2.1,0,0,1-1.1.4,1.6,1.6,0,0,1-1.1-.5,1.5,1.5,0,0,1,0-2.2L7.3,9.6.5,2.8A1.8,1.8,0,0,1,0,1.6,1.6,1.6,0,0,1,.5.5Z"
                      style="fill: #474747; fill-rule: evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div class="recoleta text-xl font-bold text-black sm:mb-2.5">
                {user().display_name}
              </div>

              {profileMenu.Menu.map(
                ({ Visibility, Title, Link, Icon }) =>
                  Visibility && (
                    <div class="flex">
                      <LocalizeLink link={Link}>
                        <div class="flex gap-[15px] items-center">
                          <div class="w-[20px] h-[20px]">
                            <img class="w-full h-full" alt="" src={Icon.src} />
                          </div>

                          <div class="text-lg font-medium text-black-light">
                            {Title}
                          </div>
                        </div>
                      </LocalizeLink>
                    </div>
                  ),
              )}

              <div class="pt-[25px] sm:pt-[15px] border-t border-primary-light">
                <button onclick={handleLogout}>
                  <div class="flex gap-[15px] items-center">
                    <div class="w-[20px] h-[20px]">
                      <img
                        class="w-full h-full"
                        alt=""
                        src={profileMenu.logOutIcon.src}
                      />
                    </div>

                    <div class="text-lg font-medium text-black-light">
                      {profileMenu.text_log_out}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
