import { z } from "zod";

export const signInSchemaVal = z.object({
  identifier: z.string(),
  password: z.string()
})