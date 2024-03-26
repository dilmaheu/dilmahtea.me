import type { z } from "zod";

import { fromZodError } from "zod-validation-error";

export default function stringifyZodError(
  error: z.ZodError,
  recurData: Record<string, any>,
): string {
  const errorMessage = fromZodError(error)
    .toString()
    .replace(/^Validation error: | at "[\w]+"$/g, "");

  // handle error messages if referenced
  return recurData[errorMessage] || errorMessage;
}
