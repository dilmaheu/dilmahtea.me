import type { z } from "zod";

import { fromZodError } from "zod-validation-error";

export default function stringifyZodError(error: z.ZodError) {
  return fromZodError(error)
    .toString()
    .replace(/^Validation error: | at "[\w]+"$/g, "");
}
