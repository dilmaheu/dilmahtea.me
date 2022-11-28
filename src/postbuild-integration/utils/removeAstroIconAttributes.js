import fs from "fs/promises";

export default async function removeAstroIconAttributes(path, document) {
  const astroIcons = document.querySelectorAll("[astro-icon]");

  [...astroIcons].forEach((icon) => {
    icon.removeAttribute("astro-icon");
  });

  await fs.writeFile(path, document.toString());
}
