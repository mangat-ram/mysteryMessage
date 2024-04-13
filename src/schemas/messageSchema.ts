import { z } from "zod";

export const messageSchemaVal = z.object({
  content: z
    .string()
    .min(10,{message:"message must be of atleast ten chracters."})
    .max(300,{message:"message must be of lessthen 300 chracters."})
})