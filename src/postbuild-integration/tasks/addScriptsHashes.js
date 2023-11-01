// @ts-check

import crypto from "crypto";

export default function addScriptsHashes(document, CSPRecord) {
  const scripts = document.querySelectorAll("script");

  [...scripts].forEach(({ textContent }) => {
    const hash = crypto
      .createHash("sha256")
      .update(textContent)
      .digest("base64");

    const source = `'sha256-${hash}'`;

    if (!CSPRecord["script-src"].includes(source)) {
      CSPRecord["script-src"].push(source);
    }
  });
}
