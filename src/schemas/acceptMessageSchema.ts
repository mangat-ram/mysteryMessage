import { z } from "zod";

export const acceptMessagesSchemaVal = z.object({
  acceptMessages: z.boolean()
})