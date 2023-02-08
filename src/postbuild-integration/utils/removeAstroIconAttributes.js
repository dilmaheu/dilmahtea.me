export default function removeAstroIconAttributes(document) {
  const astroIcons = document.querySelectorAll("[astro-icon]");

  [...astroIcons].forEach((icon) => {
    icon.removeAttribute("astro-icon");
  });
}
