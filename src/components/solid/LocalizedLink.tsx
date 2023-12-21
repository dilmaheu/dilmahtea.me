import { createSignal } from "solid-js";

export default function LocalizeLink({ link, children }) {
  const [localizedLink, setLocalizedLink] = createSignal(link);

  setTimeout(() => {
    setLocalizedLink("/" + window.preferredLocale + "/" + link + "/");
  }, 0);

  return <a href={localizedLink()}>{children}</a>;
}
