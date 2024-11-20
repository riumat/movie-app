import { z } from "zod";

export const getAuthSchema = async () => {
  return z.object({
    name: z.string(),
    email: z.string().email({
      message: "Email not valid.",
    }),
    password: z.string()
      .min(4, {
        message: "Password must be at least 4 characters long."
      })
      ,
    repeatPassword: z.string(),
  })
}