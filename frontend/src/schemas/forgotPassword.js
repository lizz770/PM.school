import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "*Required" })
    .email({ message: "Email is invalid" }),
});

export default forgotPasswordSchema;
