import { z } from "zod";

export const signInSchemaVal = z.object({
  username: z.string(),
  password: z.string()
})