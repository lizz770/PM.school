import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Требуется электронная почта" })
    .max(255, { message: "Электронная почта слишком длинная" }),
  password: z
    .string()
    .min(1, "Требуется пароль")
    .max(255, "Пароль слишком длинный"),
});

export default loginSchema;