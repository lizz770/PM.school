import * as z from "zod";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "*Required" })
      .min(5, { message: "Password must be at least 5 characters" })
      .max(255, { message: "Password is too long" }),
    newPassword: z
      .string()
      .min(1, { message: "*Required" })
      .min(5, { message: "Must be at least 5 characters" })
      .max(255, { message: "Too Long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "*Required" })
      .min(5, { message: "Must be at least 5 characters" })
      .max(255, { message: "Too Long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default passwordSchema;
