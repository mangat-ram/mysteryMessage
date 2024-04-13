import { z } from "zod";

export const usernameVal = z
  .string()
  .min(2,"username must be atleast two characters.")
  .max(20,"must less then 20 chracters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special chracters")

export const signUpSchema = z.object({
  username: usernameVal,
  email: z.string().email({message:"Invalid Email Address"}),
  password: z.string().min(6,{message:"password must be of six chracters"})
})