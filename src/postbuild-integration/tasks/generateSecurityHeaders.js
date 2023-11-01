// @ts-check

import fs from "fs/promises";
import PermissionsPolicy from "../../store/PermissionsPolicy.js";

export default async function generateSecurityHeaders(CSPRecord) {
  const ContentSecurityPolicy = Object.keys(CSPRecord)
    .map((directive) => {
      const sources = CSPRecord[directive];

      const policy = `${directive} ${sources.join(" ")}`;

      return policy;
    })
    .join("; ");

  const _headersFileContent = `/*
  Permissions-Policy: ${PermissionsPolicy}
  
  Content-Security-Policy: ${ContentSecurityPolicy}
`;

  // write generated headers to _headers file
  await fs.writeFile("./dist/_headers", _headersFileContent);
}
