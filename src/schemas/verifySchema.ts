import { z } from "zod";

export const verifySchemaVal = z.object({
  code: z.string().length(6,{message:"verification code must be of atleast six digits."})
})